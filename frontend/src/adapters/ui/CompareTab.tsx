import { useEffect, useState } from "react"
import { fetchComparison } from "../infrastructure/compareApi"
import type { RouteComparison } from "../../shared/types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

export default function CompareTab() {
  const [year, setYear] = useState(2024)
  const [baseline, setBaseline] = useState<{ routeId: string; ghgIntensity: number } | null>(null)
  const [rows, setRows] = useState<RouteComparison[]>([])
  const [loading, setLoading] = useState(true)

  const load = async (y: number) => {
    setLoading(true)
    const data = await fetchComparison(y)
    setBaseline(data.baseline)
    setRows(data.comparisons)
    setLoading(false)
  }

  useEffect(() => {
    load(year)
  }, [year])

  if (loading) return <div>Loading comparison…</div>
  if (!baseline) return <div>No baseline found.</div>

  const chartData = [
    { name: baseline.routeId, ghg: baseline.ghgIntensity },
    ...rows.map(r => ({ name: r.routeId, ghg: r.ghgIntensity }))
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Compare Routes</h2>

      {/* Year selector */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Year:</label>
        <select
          className="border p-2"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Route</th>
              <th className="p-2 border">GHG Intensity</th>
              <th className="p-2 border">% Difference</th>
              <th className="p-2 border">Compliant</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.routeId}>
                <td className="p-2 border">{r.routeId}</td>
                <td className="p-2 border">{r.ghgIntensity}</td>
                <td className="p-2 border">
                  {r.percentDiff.toFixed(2)}%
                </td>
                <td className="p-2 border text-center">
                  {r.compliant ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-semibold mb-2">GHG Intensity Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ghg" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
