export interface BankingRepository {
  save(shipId: string, year: number, amount: number): Promise<void>
  totalBanked(shipId: string, year: number): Promise<number>
  apply(shipId: string, year: number, amount: number): Promise<void>
}
