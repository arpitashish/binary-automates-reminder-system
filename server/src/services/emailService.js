async function sendReminderEmail({ to, invoice, reminderCount }) {
  const apiKey = process.env.RESEND_API_KEY;
 const from = 'onboarding@resend.dev';

  const html = `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:640px;margin:0 auto;background:white;border-radius:16px;padding:32px;border:1px solid #e2e8f0">
        <h1 style="margin:0 0 16px;color:#0f172a">Payment reminder</h1>
        <p style="color:#334155;font-size:16px;line-height:1.6">Hi ${invoice.client_name},</p>
        <p style="color:#334155;font-size:16px;line-height:1.6">
          This is a friendly reminder that invoice <strong>${invoice.invoice_number}</strong> for
          <strong>$${Number(invoice.amount).toFixed(2)}</strong> is due on <strong>${invoice.due_date}</strong>.
        </p>
        <div style="margin:24px 0;padding:16px;border-radius:12px;background:#f1f5f9;color:#0f172a">
          Reminder count: <strong>${reminderCount}</strong>
        </div>
        <p style="color:#334155;line-height:1.6">Please reach out if you need any clarification.</p>
        <p style="color:#64748b">Thank you</p>
      </div>
    </div>
  `;

  if (!apiKey) {
    return { mocked: true, message: 'RESEND_API_KEY not configured; reminder not sent' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Reminder: Invoice ${invoice.invoice_number} is pending`,
      html
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend API error: ${body}`);
  }

  return response.json();
}

module.exports = { sendReminderEmail };
