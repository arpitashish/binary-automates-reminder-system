const { getDb } = require('../db/db');
const { isOverdue, nowIso } = require('../utils/date');
const { logActivity } = require('./activityService');

function mapInvoice(row) {
  if (!row) return null;
  const status = row.status === 'paid' ? 'paid' : (isOverdue(row.due_date, row.status) ? 'overdue' : row.status);
  return { ...row, status };
}

function getAllInvoices({ q, status, sortBy = 'due_date', sortOrder = 'asc' }) {
  const db = getDb();
  const allowedSort = ['due_date', 'amount', 'created_at'];
  const sortCol = allowedSort.includes(sortBy) ? sortBy : 'due_date';
  const dir = sortOrder?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  const rows = db.prepare(`SELECT * FROM invoices ORDER BY ${sortCol} ${dir}, id DESC`).all();

  return rows
    .map(mapInvoice)
    .filter((invoice) => {
      const query = (q || '').trim().toLowerCase();
      const matchesQuery = !query || invoice.client_name.toLowerCase().includes(query) || invoice.invoice_number.toLowerCase().includes(query);
      const matchesStatus = !status || invoice.status === status;
      return matchesQuery && matchesStatus;
    });
}

function getInvoiceById(id) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
  return mapInvoice(row);
}

function createInvoice(payload) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO invoices
    (invoice_number, client_name, client_email, amount, due_date, issue_date, notes, status, reminder_count, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, datetime('now'), datetime('now'))
  `);

  const info = stmt.run(
    payload.invoice_number,
    payload.client_name,
    payload.client_email,
    payload.amount,
    payload.due_date,
    payload.issue_date,
    payload.notes || '',
    payload.status || 'pending'
  );

  const invoice = getInvoiceById(info.lastInsertRowid);
  logActivity({
    invoiceId: invoice.id,
    type: 'invoice_created',
    message: `Invoice ${invoice.invoice_number} created for ${invoice.client_name}`,
    meta: invoice
  });
  return invoice;
}

function updateInvoice(id, payload) {
  const db = getDb();
  const existing = getInvoiceById(id);
  if (!existing) return null;

  const next = {
    invoice_number: payload.invoice_number ?? existing.invoice_number,
    client_name: payload.client_name ?? existing.client_name,
    client_email: payload.client_email ?? existing.client_email,
    amount: payload.amount ?? existing.amount,
    due_date: payload.due_date ?? existing.due_date,
    issue_date: payload.issue_date ?? existing.issue_date,
    notes: payload.notes ?? existing.notes,
    status: payload.status ?? existing.status
  };

  db.prepare(`
    UPDATE invoices
    SET invoice_number = ?, client_name = ?, client_email = ?, amount = ?, due_date = ?, issue_date = ?, notes = ?, status = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(
    next.invoice_number,
    next.client_name,
    next.client_email,
    next.amount,
    next.due_date,
    next.issue_date,
    next.notes,
    next.status,
    id
  );

  const updated = getInvoiceById(id);
  logActivity({
    invoiceId: updated.id,
    type: 'invoice_updated',
    message: `Invoice ${updated.invoice_number} updated`,
    meta: updated
  });
  return updated;
}

function deleteInvoice(id) {
  const invoice = getInvoiceById(id);
  if (!invoice) return false;
  const db = getDb();
  db.prepare('DELETE FROM invoices WHERE id = ?').run(id);
  logActivity({
    invoiceId: id,
    type: 'invoice_deleted',
    message: `Invoice ${invoice.invoice_number} deleted`,
    meta: invoice
  });
  return true;
}

function markInvoicePaid(id) {
  const db = getDb();
  const invoice = getInvoiceById(id);
  if (!invoice) return null;

  db.prepare(`
    UPDATE invoices
    SET status = 'paid', paid_at = datetime('now'), updated_at = datetime('now')
    WHERE id = ?
  `).run(id);

  const updated = getInvoiceById(id);
  logActivity({
    invoiceId: id,
    type: 'payment_completed',
    message: `Payment received for invoice ${invoice.invoice_number}`,
    meta: updated
  });
  return updated;
}

function sendReminderStatsUpdate(id) {
  const db = getDb();
  db.prepare(`
    UPDATE invoices
    SET reminder_count = reminder_count + 1,
        last_reminder_sent = datetime('now'),
        updated_at = datetime('now')
    WHERE id = ?
  `).run(id);
  return getInvoiceById(id);
}

function getDashboardStats() {
  const db = getDb();
  const invoices = db.prepare('SELECT * FROM invoices').all().map(mapInvoice);
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.status === 'paid').length;
  const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
  const pendingInvoices = invoices.filter(i => i.status === 'pending').length;
  const totalUnpaidAmount = invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const paidAmount = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const unpaidAmount = invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + Number(i.amount || 0), 0);

  const byMonth = invoices.reduce((acc, i) => {
    const month = i.issue_date?.slice(0, 7) || 'unknown';
    acc[month] = (acc[month] || 0) + Number(i.amount || 0);
    return acc;
  }, {});

  return {
    totalInvoices,
    paidInvoices,
    pendingInvoices,
    overdueInvoices,
    totalUnpaidAmount,
    paidAmount,
    unpaidAmount,
    paymentRatio: totalInvoices ? Math.round((paidInvoices / totalInvoices) * 100) : 0,
    monthlyRevenue: Object.entries(byMonth).map(([month, value]) => ({ month, value }))
  };
}

function overdueRefresh() {
  const db = getDb();
  const rows = db.prepare(`SELECT id, status, due_date FROM invoices WHERE status != 'paid'`).all();
  const ids = [];
  for (const row of rows) {
    if (isOverdue(row.due_date, row.status) && row.status !== 'overdue') ids.push(row.id);
  }
  if (ids.length) {
    const stmt = db.prepare(`UPDATE invoices SET status='overdue', updated_at=datetime('now') WHERE id = ?`);
    ids.forEach(id => stmt.run(id));
  }
  return ids.length;
}

module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  markInvoicePaid,
  sendReminderStatsUpdate,
  getDashboardStats,
  overdueRefresh
};
