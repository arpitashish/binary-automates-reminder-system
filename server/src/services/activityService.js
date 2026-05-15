const { getDb } = require('../db/db');

function logActivity({ invoiceId = null, type, message, meta = null }) {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO activity_logs (invoice_id, type, message, meta_json, created_at)
     VALUES (?, ?, ?, ?, datetime('now'))`
  );
  stmt.run(invoiceId, type, message, meta ? JSON.stringify(meta) : null);
}

function listActivity(limit = 20) {
  const db = getDb();
  return db.prepare(
    `SELECT a.*, i.invoice_number, i.client_name
     FROM activity_logs a
     LEFT JOIN invoices i ON i.id = a.invoice_id
     ORDER BY a.created_at DESC, a.id DESC
     LIMIT ?`
  ).all(limit);
}

module.exports = { logActivity, listActivity };
