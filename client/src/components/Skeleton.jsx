export function SkeletonCard() {
  return <div className="h-32 animate-pulse rounded-3xl border bg-white" />
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="rounded-3xl border bg-white p-4 shadow-soft">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="mb-3 h-12 animate-pulse rounded-2xl bg-slate-100 last:mb-0" />
      ))}
    </div>
  )
}
