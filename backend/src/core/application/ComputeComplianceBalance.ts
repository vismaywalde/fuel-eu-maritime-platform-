import { TARGET_GHG_INTENSITY, MJ_PER_TON_FUEL } from "../../shared/constants"

export class ComputeComplianceBalance {
  execute(
    actualIntensity: number,
    fuelConsumptionTons: number
  ): number {
    const energyInScope = fuelConsumptionTons * MJ_PER_TON_FUEL

    // CB = (Target − Actual) × Energy
    const cb = (TARGET_GHG_INTENSITY - actualIntensity) * energyInScope

    return Number(cb.toFixed(2))
  }
}
