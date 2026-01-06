import { prisma } from "../../../infrastructure/db/prisma"
import { ComplianceRepository } from "../../../core/ports/ComplianceRepository"
import { ShipCompliance } from "../../../core/domain/ShipCompliance"

export class ComplianceRepoPg implements ComplianceRepository {

  async save(record: ShipCompliance): Promise<void> {
    await prisma.shipCompliance.create({
      data: {
        shipId: record.shipId,
        year: record.year,
        cbGco2eq: record.cb
      }
    })
  }



  

  async find(shipId: string, year: number): Promise<ShipCompliance | null> {
    const rec = await prisma.shipCompliance.findFirst({
      where: { shipId, year }
    })
    return rec ? { shipId, year, cb: rec.cbGco2eq } : null
  }
}
