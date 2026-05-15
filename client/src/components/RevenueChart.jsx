import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

export default function RevenueChart({ paidAmount = 0, unpaidAmount = 0 }) {
  const data = [
    { name: 'Paid', value: paidAmount },
    { name: 'Unpaid', value: unpaidAmount }
  ]
  const colors = ['#0f172a', '#cbd5e1']

  return (
    <div className="rounded-3xl border bg-white p-5 shadow-soft">
      <h2 className="text-lg font-semibold">Paid vs unpaid</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={70} outerRadius={100} paddingAngle={4}>
              {data.map((_, i) => <Cell key={i} fill={colors[i]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
