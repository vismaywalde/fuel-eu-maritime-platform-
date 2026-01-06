import { TARGET_GHG_INTENSITY } from "../../shared/constants"

export class CompareRoutes {
  execute(baselineIntensity: number, comparisonIntensity: number) {
    const percentDiff =
      ((comparisonIntensity / baselineIntensity) - 1) * 100

    return {
      percentDiff: Number(percentDiff.toFixed(2)),
      compliant: comparisonIntensity <= TARGET_GHG_INTENSITY
    }
  }
}
