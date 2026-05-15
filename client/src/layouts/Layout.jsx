import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, ReceiptText, Activity, Menu } from 'lucide-react'
import { useState } from 'react'

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/invoices', label: 'Invoices', icon: ReceiptText },
  { to: '/activity', label: 'Activity', icon: Activity }
]

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:flex">
        <aside className={`fixed inset-y-0 left-0 z-30 w-72 border-r bg-white p-5 shadow-soft transition-transform lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} lg:block`}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Ledger</div>
              <div className="text-xl font-semibold"></div>
            </div>
            <button className="lg:hidden" onClick={() => setOpen(false)}>✕</button>
          </div>
          <nav className="space-y-1">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b bg-white px-4 py-4 lg:px-8">
            <button className="rounded-xl border p-2 lg:hidden" onClick={() => setOpen(true)}>
              <Menu size={20} />
            </button>
            <div>
              <p className="text-sm text-slate-500">Mini payment reminder system</p>
              <h1 className="text-lg font-semibold">Invoice operations dashboard</h1>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Small business ready</div>
          </header>
          <main className="p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
