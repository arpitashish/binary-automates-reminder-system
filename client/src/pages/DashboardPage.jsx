
import { useEffect, useState } from 'react'
import http from '../api/http'
import toast from 'react-hot-toast'
import StatsCard from '../components/StatsCard'
import RevenueChart from '../components/RevenueChart'
import ActivityTimeline from '../components/ActivityTimeline'
import { SkeletonCard } from '../components/Skeleton'

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await http.get('/dashboard')
      setData(res.data.data)
    } catch {
      toast.error('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const id = setInterval(load, 30000)
    return () => clearInterval(id)
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-2">
      
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
          Mini payment reminder system
        </p>

        <div className="mt-2 flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Invoice operations dashboard
          </h1>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total invoices
              </p>

              <h2 className="mt-3 text-5xl font-bold text-slate-900">
                {data.totalInvoices}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                All invoices tracked
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
              <span className="text-2xl">📄</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Paid
              </p>

              <h2 className="mt-3 text-5xl font-bold text-emerald-600">
                {data.paidInvoices}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Collected revenue
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Pending
              </p>

              <h2 className="mt-3 text-5xl font-bold text-amber-500">
                {data.pendingInvoices}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Awaiting payment
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Overdue
              </p>

              <h2 className="mt-3 text-5xl font-bold text-rose-500">
                {data.overdueInvoices}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Needs attention
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">

        {/* Collection Health */}
        <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">

          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Collection health
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Unpaid amount and payment ratio
              </p>
            </div>

            <div className="text-right">
              <div className="text-4xl font-bold text-slate-900">
                ${Number(data.totalUnpaidAmount).toFixed(2)}
              </div>

              <div className="mt-1 text-sm font-medium text-emerald-600">
                {data.paymentRatio}% paid
              </div>
            </div>
          </div>

          <div className="mt-8 h-4 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 transition-all duration-700"
              style={{ width: `${data.paymentRatio}%` }}
            />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
                Paid amount
              </div>

              <div className="mt-3 text-3xl font-bold text-slate-900">
                ${Number(data.paidAmount).toFixed(2)}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
                Unpaid amount
              </div>

              <div className="mt-3 text-3xl font-bold text-slate-900">
                ${Number(data.unpaidAmount).toFixed(2)}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
                Reminder-ready
              </div>

              <div className="mt-3 text-3xl font-bold text-slate-900">
                {data.pendingInvoices + data.overdueInvoices}
              </div>
            </div>

          </div>
        </div>

        {/* Chart */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <RevenueChart
            paidAmount={data.paidAmount}
            unpaidAmount={data.unpaidAmount}
          />
        </div>
      </div>

      {/* Activity */}
      <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <ActivityTimeline items={data.recentActivity || []} />
      </div>
    </div>
  )
}

