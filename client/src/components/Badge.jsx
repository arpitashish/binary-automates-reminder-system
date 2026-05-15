export default function Badge({ children, tone = 'gray' }) {
  const map = {
    gray: 'bg-slate-100 text-slate-700',
    green: 'bg-emerald-50 text-emerald-700',
    yellow: 'bg-amber-50 text-amber-700',
    red: 'bg-rose-50 text-rose-700',
    blue: 'bg-sky-50 text-sky-700'
  }
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${map[tone]}`}>{children}</span>
}
