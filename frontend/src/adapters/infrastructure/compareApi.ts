import { api } from "./apiClient"
import type { RouteComparison } from "../../shared/types"

export interface ComparisonResponse {
  baseline: {
    routeId: string
    ghgIntensity: number
  }
  comparisons: RouteComparison[]
}

export const fetchComparison = async (year: number): Promise<ComparisonResponse> => {
  const res = await api.get<ComparisonResponse>(`/routes/comparison?year=${year}`)
  return res.data
}
