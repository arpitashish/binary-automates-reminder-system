import { useEffect, useMemo, useState } from 'react'
import http from '../api/http'
import toast from 'react-hot-toast'
import Badge from '../components/Badge'
import ConfirmDialog from '../components/ConfirmDialog'
import InvoiceFormModal from '../components/InvoiceFormModal'
import InvoiceDetailModal from '../components/InvoiceDetailModal'
import { SkeletonTable } from '../components/Skeleton'
import { Plus, Search } from 'lucide-react'

function toneFor(status) {
  return status === 'paid' ? 'green' : status === 'overdue' ? 'red' : 'yellow'
}

export default function InvoicesPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [sortBy, setSortBy] = useState('due_date')
  const [sortOrder, setSortOrder] = useState('asc')
  const [formOpen, setFormOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await http.get('/invoices', { params: { q, status, sortBy, sortOrder } })
      setItems(res.data.data)
    } catch {
      toast.error('Failed to load invoices')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [q, status, sortBy, sortOrder])

  const openCreate = () => { setSelected(null); setFormOpen(true) }
  const openEdit = () => { setFormOpen(true); setDetailOpen(false) }

  const save = async (payload) => {
    try {
      if (selected?.id) {
        await http.put(`/invoices/${selected.id}`, payload)
        toast.success('Invoice updated')
      } else {
        await http.post('/invoices', payload)
        toast.success('Invoice created')
      }
      setFormOpen(false)
      setSelected(null)
      await load()
    } catch (e) {
      toast.error(e.response?.data?.message || 'Save failed')
    }
  }

  const onDelete = async () => {
    try {
      await http.delete(`/invoices/${deleteId}`)
      toast.success('Invoice deleted')
      setDeleteId(null)
      setDetailOpen(false)
      await load()
    } catch {
      toast.error('Delete failed')
    }
  }

  const markPaid = async () => {
    try {
      await http.post(`/invoices/${selected.id}/mark-paid`)
      toast.success('Marked as paid')
      await load()
      setDetailOpen(false)
    } catch {
      toast.error('Failed to mark paid')
    }
  }

  const remind = async () => {
    try {
      await http.post(`/invoices/${selected.id}/remind`)
      toast.success('Reminder sent')
      await load()
    } catch (e) {
      toast.error(e.response?.data?.message || 'Reminder failed')
    }
  }

  const rows = useMemo(() => items, [items])

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 rounded-3xl border bg-white p-5 shadow-soft lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by client name or invoice number" className="w-full rounded-2xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-slate-900" />
        </div>
        <div className="flex flex-wrap gap-3">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3">
            <option value="">All statuses</option>
            <option value="pending">pending</option>
            <option value="paid">paid</option>
            <option value="overdue">overdue</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3">
            <option value="due_date">due date</option>
            <option value="amount">amount</option>
            <option value="created_at">created</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3">
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
          </select>
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">
            <Plus size={18} /> New invoice
          </button>
        </div>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <div className="overflow-hidden rounded-3xl border bg-white shadow-soft">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Invoice</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Due date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Reminders</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-medium">{invoice.invoice_number}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{invoice.client_name}</div>
                    <div className="text-sm text-slate-500">{invoice.client_email}</div>
                  </td>
                  <td className="px-6 py-4">${Number(invoice.amount).toFixed(2)}</td>
                  <td className="px-6 py-4">{invoice.due_date}</td>
                  <td className="px-6 py-4"><Badge tone={toneFor(invoice.status)}>{invoice.status}</Badge></td>
                  <td className="px-6 py-4">{invoice.reminder_count}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setSelected(invoice); setDetailOpen(true) }} className="rounded-2xl border px-3 py-2 text-sm font-medium">Open</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!rows.length && <div className="p-8 text-center text-sm text-slate-500">No invoices match the current filters.</div>}
        </div>
      )}

      <InvoiceFormModal
        open={formOpen}
        initialValue={selected}
        onClose={() => { setFormOpen(false); setSelected(null) }}
        onSubmit={save}
      />

      <InvoiceDetailModal
        invoice={selected}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onEdit={openEdit}
        onMarkPaid={markPaid}
        onRemind={remind}
        onDelete={() => setDeleteId(selected?.id)}
      />

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete invoice"
        message="This will permanently remove the invoice and activity will remain as an audit trail."
        confirmText="Delete"
        onConfirm={onDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
