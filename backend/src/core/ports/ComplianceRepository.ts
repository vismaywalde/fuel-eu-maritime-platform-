import { ShipCompliance } from "../domain/ShipCompliance"

export interface ComplianceRepository {
  save(record: ShipCompliance): Promise<void>
  find(shipId: string, year: number): Promise<ShipCompliance | null>
}
