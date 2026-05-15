require('dotenv').config();
const { initDb, getDb } = require('./db/db');
const { createInvoice } = require('./services/invoiceService');
const { logActivity } = require('./services/activityService');

initDb();
const db = getDb();

db.prepare('DELETE FROM activity_logs').run();
db.prepare('DELETE FROM invoices').run();

const samples = [
  { invoice_number: 'INV-1001', client_name: 'Acme Studio', client_email: 'billing@acme.com', amount: 2400, due_date: '2026-05-12', issue_date: '2026-05-01', notes: 'Quarterly design retainer', status: 'pending' },
  { invoice_number: 'INV-1002', client_name: 'Northstar Labs', client_email: 'finance@northstar.io', amount: 890, due_date: '2026-05-08', issue_date: '2026-04-27', notes: 'Frontend sprint support', status: 'overdue' },
  { invoice_number: 'INV-1003', client_name: 'Blue Peak Health', client_email: 'accounts@bluepeak.health', amount: 5100, due_date: '2026-05-20', issue_date: '2026-05-03', notes: 'Integration + maintenance', status: 'paid' },
  { invoice_number: 'INV-1004', client_name: 'Orbit Retail', client_email: 'payables@orbitretail.co', amount: 1450, due_date: '2026-05-18', issue_date: '2026-05-04', notes: 'Analytics dashboard', status: 'pending' }
];

samples.forEach(sample => createInvoice(sample));

logActivity({ type: 'seed_complete', message: 'Sample invoices seeded', meta: { count: samples.length } });

console.log('Seed complete');
