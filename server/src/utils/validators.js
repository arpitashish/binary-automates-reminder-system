const { z } = require('zod');

const invoiceSchema = z.object({
  invoice_number: z.string().min(1).max(50),
  client_name: z.string().min(1).max(120),
  client_email: z.email(),
  amount: z.coerce.number().nonnegative(),
  due_date: z.string().min(10),
  issue_date: z.string().min(10),
  notes: z.string().max(2000).optional().default(''),
  status: z.enum(['pending', 'paid', 'overdue']).optional()
});

module.exports = { invoiceSchema };
