const { sendReminderEmail } = require('./emailService');
const { getInvoiceById, sendReminderStatsUpdate } = require('./invoiceService');
const { logActivity, listActivity } = require('./activityService');

async function sendReminder(id) {
  const invoice = getInvoiceById(id);
  if (!invoice) {
    const err = new Error('Invoice not found');
    err.status = 404;
    throw err;
  }
  if (invoice.status === 'paid') {
    const err = new Error('Paid invoices do not need reminders');
    err.status = 400;
    throw err;
  }

  const updated = sendReminderStatsUpdate(id);
  const result = await sendReminderEmail({
    to: updated.client_email,
    invoice: updated,
    reminderCount: updated.reminder_count
  });

  logActivity({
    invoiceId: id,
    type: 'reminder_sent',
    message: `Reminder sent to ${updated.client_name} (${updated.client_email})`,
    meta: { emailResult: result }
  });

  return { invoice: updated, emailResult: result };
}

module.exports = { sendReminder };
