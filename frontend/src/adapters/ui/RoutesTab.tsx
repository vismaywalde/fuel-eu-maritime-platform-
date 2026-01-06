import { useState } from "react"
import { useRoutes } from "./useRoutes"

export default function RoutesTab() {
  const { routes, loading, makeBaseline } = useRoutes()

  const [vessel, setVessel] = useState("")
  const [fuel, setFuel] = useState("")
  const [year, setYear] = useState("")

  const filtered = routes.filter(r =>
    (!vessel || r.vesselType === vessel) &&
    (!fuel || r.fuelType === fuel) &&
    (!year || r.year === Number(year))
  )

  const vesselTypes = [...new Set(routes.map(r => r.vesselType))]
  const fuelTypes = [...new Set(routes.map(r => r.fuelType))]
  const years = [...new Set(routes.map(r => r.year))]

  if (loading) return <div>Loading routes…</div>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Routes</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select className="border p-2" onChange={e => setVessel(e.target.value)}>
          <option value="">All Vessels</option>
          {vesselTypes.map(v => <option key={v}>{v}</option>)}
        </select>

        <select className="border p-2" onChange={e => setFuel(e.target.value)}>
          <option value="">All Fuels</option>
          {fuelTypes.map(f => <option key={f}>{f}</option>)}
        </select>

        <select className="border p-2" onChange={e => setYear(e.target.value)}>
          <option value="">All Years</option>
          {years.map(y => <option key={y}>{y}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Route</th>
              <th className="p-2 border">Vessel</th>
              <th className="p-2 border">Fuel</th>
              <th className="p-2 border">Year</th>
              <th className="p-2 border">GHG Intensity</th>
              <th className="p-2 border">Fuel (t)</th>
              <th className="p-2 border">Distance (km)</th>
              <th className="p-2 border">Emissions (t)</th>
              <th className="p-2 border">Baseline</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(r => (
              <tr
                key={r.id}
                className={r.isBaseline ? "bg-green-100" : ""}
              >
                <td className="p-2 border">{r.routeId}</td>
                <td className="p-2 border">{r.vesselType}</td>
                <td className="p-2 border">{r.fuelType}</td>
                <td className="p-2 border">{r.year}</td>
                <td className="p-2 border">{r.ghgIntensity}</td>
                <td className="p-2 border">{r.fuelConsumption}</td>
                <td className="p-2 border">{r.distance}</td>
                <td className="p-2 border">{r.totalEmissions}</td>
                <td className="p-2 border text-center">
                  {r.isBaseline ? (
                    <span className="text-green-700 font-semibold">✓</span>
                  ) : (
                    <button
                      onClick={() => makeBaseline(r.id)}
                      className="px-2 py-1 bg-blue-600 text-white rounded"
                    >
                      Set
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
