export default function StatsCard({ label, value, hint, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-900 text-white',
    green: 'bg-emerald-600 text-white',
    amber: 'bg-amber-500 text-white',
    red: 'bg-rose-600 text-white'
  }
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-soft">
      <div className={`mb-4 inline-flex rounded-2xl px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{label}</div>
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-2 text-sm text-slate-500">{hint}</div>
    </div>
  )
}
