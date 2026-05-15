const asyncHandler = require('../utils/asyncHandler');
const { invoiceSchema } = require('../utils/validators');
const { getAllInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice, markInvoicePaid, overdueRefresh } = require('../services/invoiceService');
const { sendReminder } = require('../services/reminderService');

const listInvoices = asyncHandler((req, res) => {
  overdueRefresh();
  const invoices = getAllInvoices({
    q: req.query.q,
    status: req.query.status,
    sortBy: req.query.sortBy,
    sortOrder: req.query.sortOrder
  });
  res.json({ data: invoices });
});

const getInvoice = asyncHandler((req, res) => {
  overdueRefresh();
  const invoice = getInvoiceById(req.params.id);
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
  res.json({ data: invoice });
});

const create = asyncHandler((req, res) => {
  const parsed = invoiceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Validation failed', errors: parsed.error.flatten() });
  const invoice = createInvoice(parsed.data);
  res.status(201).json({ data: invoice });
});

const update = asyncHandler((req, res) => {
  const partial = invoiceSchema.partial().safeParse(req.body);
  if (!partial.success) return res.status(400).json({ message: 'Validation failed', errors: partial.error.flatten() });
  const invoice = updateInvoice(req.params.id, partial.data);
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
  res.json({ data: invoice });
});

const remove = asyncHandler((req, res) => {
  const ok = deleteInvoice(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Invoice not found' });
  res.status(204).send();
});

const markPaid = asyncHandler((req, res) => {
  const invoice = markInvoicePaid(req.params.id);
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
  res.json({ data: invoice });
});

const remind = asyncHandler(async (req, res) => {
  const result = await sendReminder(req.params.id);
  res.json({ data: result });
});

module.exports = { listInvoices, getInvoice, create, update, remove, markPaid, remind };
