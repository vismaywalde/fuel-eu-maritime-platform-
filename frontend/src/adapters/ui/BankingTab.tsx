import { useEffect, useState } from "react"
import { fetchCB, bankSurplus, applyBanked } from "../infrastructure/bankingApi"

export default function BankingTab() {
  const [shipId, setShipId] = useState("R001")
  const [year, setYear] = useState(2024)
  const [cb, setCb] = useState<number | null>(null)
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setError(null)
    const res = await fetchCB(shipId, year)
    setCb(res.cb)
  }

  useEffect(() => {
    load()
  }, [shipId, year])

  const handleBank = async () => {
    if (cb === null || cb <= 0) return
    try {
      setLoading(true)
      await bankSurplus(shipId, year, cb)
      await load()
    } catch (e: any) {
      setError(e.response?.data?.error || "Failed to bank surplus")
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    try {
      setLoading(true)
      await applyBanked(shipId, year, amount)
      await load()
    } catch (e: any) {
      setError(e.response?.data?.error || "Failed to apply banked amount")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Banking</h2>

      {/* Controls */}
      <div className="flex gap-4 mb-4">
        <input
          className="border p-2"
          value={shipId}
          onChange={e => setShipId(e.target.value)}
          placeholder="Ship ID"
        />

        <select
          className="border p-2"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
      </div>

      {/* KPI */}
      {cb !== null && (
        <div className="mb-4 bg-white p-4 shadow rounded">
          <p><strong>CB before:</strong> {cb.toLocaleString()}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 mb-4">
        <button
          disabled={cb === null || cb <= 0 || loading}
          onClick={handleBank}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
        >
          Bank Surplus
        </button>

        <input
          type="number"
          className="border p-2"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          placeholder="Apply amount"
        />

        <button
          disabled={loading || amount <= 0}
          onClick={handleApply}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Apply Banked
        </button>
      </div>

      {/* Error */}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
