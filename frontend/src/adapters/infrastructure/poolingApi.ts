import { api } from "./apiClient"

export interface AdjustedCB {
  shipId: string
  cb: number
}

export interface PoolMemberResult {
  shipId: string
  cbBefore: number
  cbAfter: number
}

export const fetchAdjustedCB = async (year: number): Promise<AdjustedCB[]> => {
  const res = await api.get(`/compliance/adjusted-cb?year=${year}`)
  return res.data
}

export const createPool = async (year: number, shipIds: string[]): Promise<PoolMemberResult[]> => {
  const res = await api.post("/pools", { year, shipIds })
  return res.data.members
}
