import { useEffect, useState } from 'react'

const empty = {
  invoice_number: '',
  client_name: '',
  client_email: '',
  amount: '',
  due_date: '',
  issue_date: '',
  notes: '',
  status: 'pending'
}

export default function InvoiceFormModal({ open, initialValue, onClose, onSubmit }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(initialValue || empty)
    setErrors({})
  }, [initialValue, open])

  if (!open) return null

  const submit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!form.invoice_number) nextErrors.invoice_number = 'Invoice number is required'
    if (!form.client_name) nextErrors.client_name = 'Client name is required'
    if (!form.client_email) nextErrors.client_email = 'Client email is required'
    if (!form.amount || Number(form.amount) < 0) nextErrors.amount = 'Amount must be valid'
    if (!form.due_date) nextErrors.due_date = 'Due date is required'
    if (!form.issue_date) nextErrors.issue_date = 'Issue date is required'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    onSubmit({ ...form, amount: Number(form.amount) })
  }

  const handle = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <form onSubmit={submit} className="w-full max-w-3xl rounded-[28px] bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{initialValue ? 'Edit invoice' : 'Create invoice'}</h3>
            <p className="text-sm text-slate-500">Keep this fast and clean for business operators.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-2xl border px-3 py-2 text-sm">Close</button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {['invoice_number','client_name','client_email','amount','due_date','issue_date'].map((field) => (
            <label key={field} className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">{field.replaceAll('_', ' ')}</span>
              <input
                value={form[field]}
                onChange={handle(field)}
                type={field.includes('date') ? 'date' : field === 'amount' ? 'number' : 'text'}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-900"
              />
              {errors[field] && <span className="text-xs text-rose-600">{errors[field]}</span>}
            </label>
          ))}
        </div>

        <label className="mt-4 grid gap-2">
          <span className="text-sm font-medium text-slate-700">notes</span>
          <textarea value={form.notes} onChange={handle('notes')} rows={4} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-900" />
        </label>

        <div className="mt-4 grid gap-2 md:max-w-xs">
          <span className="text-sm font-medium text-slate-700">status</span>
          <select value={form.status} onChange={handle('status')} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-900">
            <option value="pending">pending</option>
            <option value="paid">paid</option>
            <option value="overdue">overdue</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-2xl border px-4 py-3 text-sm font-medium">Cancel</button>
          <button type="submit" className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">Save invoice</button>
        </div>
      </form>
    </div>
  )
}
