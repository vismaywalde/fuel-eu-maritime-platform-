import { useEffect, useState } from "react"
import type {
  fetchAdjustedCB,
  createPool,
  AdjustedCB,
  PoolMemberResult
} from "../infrastructure/poolingApi"

export default function PoolingTab() {
  const [year, setYear] = useState(2024)
  const [ships, setShips] = useState<AdjustedCB[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [result, setResult] = useState<PoolMemberResult[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setError(null)
    setResult(null)
    const data = await fetchAdjustedCB(year)
    setShips(data)
  }

  useEffect(() => {
    load()
  }, [year])

  const toggle = (shipId: string) => {
    setSelected(prev =>
      prev.includes(shipId)
        ? prev.filter(s => s !== shipId)
        : [...prev, shipId]
    )
  }

  const poolSum = ships
    .filter(s => selected.includes(s.shipId))
    .reduce((sum, s) => sum + s.cb, 0)

  const validPool = selected.length > 1 && poolSum >= 0

  const handleCreate = async () => {
    try {
      const res = await createPool(year, selected)
      setResult(res)
    } catch (e: any) {
      setError(e.response?.data?.error || "Failed to create pool")
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pooling</h2>

      {/* Year */}
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

      {/* Ship List */}
      <div className="bg-white shadow rounded mb-4">
        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Select</th>
              <th className="p-2 border">Ship</th>
              <th className="p-2 border">Adjusted CB</th>
            </tr>
          </thead>
          <tbody>
            {ships.map(s => (
              <tr key={s.shipId}>
                <td className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(s.shipId)}
                    onChange={() => toggle(s.shipId)}
                  />
                </td>
                <td className="p-2 border">{s.shipId}</td>
                <td className="p-2 border">{s.cb.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pool Sum */}
      <div className="mb-4">
        <strong>Pool Sum:</strong>{" "}
        <span className={poolSum >= 0 ? "text-green-600" : "text-red-600"}>
          {poolSum.toLocaleString()}
        </span>
      </div>

      {/* Create Pool */}
      <button
        disabled={!validPool}
        onClick={handleCreate}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 mb-4"
      >
        Create Pool
      </button>

      {/* Error */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Result */}
      {result && (
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold mb-2">Pool Result</h3>
          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Ship</th>
                <th className="p-2 border">CB Before</th>
                <th className="p-2 border">CB After</th>
              </tr>
            </thead>
            <tbody>
              {result.map(r => (
                <tr key={r.shipId}>
                  <td className="p-2 border">{r.shipId}</td>
                  <td className="p-2 border">{r.cbBefore.toLocaleString()}</td>
                  <td className="p-2 border">{r.cbAfter.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
