import { api } from "./apiClient"
import type { Route } from "../../shared/types"












export const fetchRoutes = async (): Promise<Route[]> => {
  const res = await api.get<Route[]>("/routes")
  return res.data
}

export const setBaseline = async (routeId: string): Promise<void> => {
  await api.post(`/routes/${routeId}/baseline`)
}
