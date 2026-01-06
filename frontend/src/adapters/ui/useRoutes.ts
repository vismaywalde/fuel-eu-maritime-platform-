import { useEffect, useState } from "react"
import type { Route } from "../../shared/types"
import { fetchRoutes, setBaseline } from "../infrastructure/routesApi"

export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await fetchRoutes()
    setRoutes(data)
    setLoading(false)
  }

  const makeBaseline = async (id: string) => {
    await setBaseline(id)
    await load()
  }

  useEffect(() => {
    load()
  }, [])

  return { routes, loading, makeBaseline }
}
