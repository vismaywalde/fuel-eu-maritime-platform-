import { TARGET_GHG_INTENSITY, MJ_PER_TON_FUEL } from "../../shared/constants"

export class ComputeCB {
  execute(actualIntensity: number, fuelTons: number): number {
    const energy = fuelTons * MJ_PER_TON_FUEL
    return Number(((TARGET_GHG_INTENSITY - actualIntensity) * energy).toFixed(2))
  }
}
