import { api } from "./apiClient"

export interface ComplianceCB {
  shipId: string
  year: number
  cb: number
}

export interface BankRecord {
  amountGco2eq: number
}

export const fetchCB = async (shipId: string, year: number): Promise<ComplianceCB> => {
  const res = await api.get<ComplianceCB>(`/compliance/cb?shipId=${shipId}&year=${year}`)
  return res.data
}

export const bankSurplus = async (shipId: string, year: number, amount: number) => {
  await api.post("/banking/bank", { shipId, year, amount })
}

export const applyBanked = async (shipId: string, year: number, amount: number) => {
  await api.post("/banking/apply", { shipId, year, amount })
}
