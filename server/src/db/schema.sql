PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_number TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  amount REAL NOT NULL CHECK(amount >= 0),
  due_date TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  notes TEXT DEFAULT '',
  status TEXT NOT NULL CHECK(status IN ('pending','paid','overdue')) DEFAULT 'pending',
  reminder_count INTEGER NOT NULL DEFAULT 0,
  last_reminder_sent TEXT,
  paid_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_client_name ON invoices(client_name);

CREATE TABLE IF NOT EXISTS activity_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id INTEGER,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  meta_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(invoice_id) REFERENCES invoices(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_invoice_id ON activity_logs(invoice_id);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON activity_logs(created_at);
