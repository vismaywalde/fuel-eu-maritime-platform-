import { prisma } from "../../../infrastructure/db/prisma"
import { BankingRepository } from "../../../core/ports/BankingRepository"

export class BankingRepoPg implements BankingRepository {

  async save(shipId: string, year: number, amount: number): Promise<void> {
    await prisma.bankEntry.create({
      data: { shipId, year, amountGco2eq: amount }
    })
  }

  async totalBanked(shipId: string, year: number): Promise<number> {
    const res = await prisma.bankEntry.aggregate({
      where: { shipId, year },
      _sum: { amountGco2eq: true }
    })
    return res._sum.amountGco2eq ?? 0
  }

  async apply(shipId: string, year: number, amount: number): Promise<void> {
    await prisma.bankEntry.create({
      data: { shipId, year, amountGco2eq: -amount }
    })
  }
}
