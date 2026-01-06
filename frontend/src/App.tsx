
import { useState } from "react"
import RoutesTab from "./adapters/ui/RoutesTab"
import CompareTab from "./adapters/ui/CompareTab"
import BankingTab from "./adapters/ui/BankingTab"
import PoolingTab from "./adapters/ui/PoolingTab"

const tabs = ["Routes", "Compare", "Banking", "Pooling"] as const
type Tab = typeof tabs[number]

export default function App() {
  const [active, setActive] = useState<Tab>("Routes")

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-xl font-semibold">
        FuelEU Maritime Compliance Dashboard
      </header>

      <nav className="flex gap-4 p-4 bg-white shadow">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded ${
              active === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="p-6">
        {active === "Routes" && <RoutesTab />}
        {active === "Compare" && <CompareTab />}
        {active === "Banking" && <BankingTab />}
        {active === "Pooling" && <PoolingTab />}
      </main>
    </div>
  )
}
