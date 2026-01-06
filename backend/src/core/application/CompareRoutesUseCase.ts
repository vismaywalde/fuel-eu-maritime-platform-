import { Route } from "../domain/Route"
import { CompareRoutes } from "./CompareRoutes"

export interface RouteComparisonResult {
  routeId: string
  ghgIntensity: number
  percentDiff: number
  compliant: boolean
}

export class CompareRoutesUseCase {
  private comparer = new CompareRoutes()

  execute(baseline: Route, routes: Route[]): RouteComparisonResult[] {
    return routes
      .filter(r => r.id !== baseline.id)
      .map(route => {
        const result = this.comparer.execute(
          baseline.ghgIntensity,
          route.ghgIntensity
        )

        return {
          routeId: route.routeId,
          ghgIntensity: route.ghgIntensity,
          percentDiff: result.percentDiff,
          compliant: result.compliant
        }
      })
  }
}
