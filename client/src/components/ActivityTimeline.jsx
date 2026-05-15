import Badge from './Badge'

export default function ActivityTimeline({ items = [] }) {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        <span className="text-sm text-slate-500">{items.length} items</span>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-2xl border p-4">
            <div className="mt-1 h-3 w-3 rounded-full bg-slate-900" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="blue">{item.type.replaceAll('_', ' ')}</Badge>
                {item.invoice_number && <span className="text-sm font-medium">{item.invoice_number}</span>}
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.message}</p>
              <p className="mt-1 text-xs text-slate-400">{item.created_at}</p>
            </div>
          </div>
        ))}
        {!items.length && <p className="text-sm text-slate-500">No activity yet.</p>}
      </div>
    </div>
  )
}
