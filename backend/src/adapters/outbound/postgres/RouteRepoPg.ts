import { RouteRepository } from "../../../core/ports/RouteRepository"
import { Route } from "../../../core/domain/Route"
import { prisma } from "../../../infrastructure/db/prisma"

export class RouteRepoPg implements RouteRepository {

  async findAll(): Promise<Route[]> {
    return prisma.route.findMany()
  }

  async findBaseline(year: number): Promise<Route | null> {
    return prisma.route.findFirst({
      where: {
        year,
        isBaseline: true
      }
    })
  }

  async setBaseline(routeId: string): Promise<void> {
    // reset all baselines
    await prisma.route.updateMany({
      data: { isBaseline: false }
    })

    // set selected route as baseline
    await prisma.route.update({
      where: { id: routeId },
      data: { isBaseline: true }
    })
  }
}
