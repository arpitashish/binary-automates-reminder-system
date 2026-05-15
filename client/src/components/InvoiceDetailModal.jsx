import Badge from './Badge'

export default function InvoiceDetailModal({ invoice, open, onClose, onEdit, onMarkPaid, onRemind, onDelete }) {
  if (!open || !invoice) return null
  const tone = invoice.status === 'paid' ? 'green' : invoice.status === 'overdue' ? 'red' : 'yellow'
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <div className="w-full max-w-3xl rounded-[28px] bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-semibold">{invoice.client_name}</h3>
            <p className="mt-1 text-sm text-slate-500">{invoice.invoice_number}</p>
          </div>
          <Badge tone={tone}>{invoice.status}</Badge>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ['Amount', `$${Number(invoice.amount).toFixed(2)}`],
            ['Due date', invoice.due_date],
            ['Issue date', invoice.issue_date],
            ['Reminder count', invoice.reminder_count],
            ['Last reminder', invoice.last_reminder_sent || '—'],
            ['Email', invoice.client_email]
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{k}</div>
              <div className="mt-1 font-medium text-slate-900">{v}</div>
            </div>
          ))}
        </div>

        {invoice.notes && (
          <div className="mt-4 rounded-2xl border bg-white p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Notes</div>
            <p className="mt-2 text-sm text-slate-700">{invoice.notes}</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button onClick={onDelete} className="rounded-2xl border px-4 py-3 text-sm font-medium text-rose-600">Delete</button>
          <button onClick={onRemind} className="rounded-2xl border px-4 py-3 text-sm font-medium">Send reminder</button>
          <button onClick={onMarkPaid} className="rounded-2xl border px-4 py-3 text-sm font-medium">Mark paid</button>
          <button onClick={onEdit} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">Edit</button>
          <button onClick={onClose} className="rounded-2xl border px-4 py-3 text-sm font-medium">Close</button>
        </div>
      </div>
    </div>
  )
}
