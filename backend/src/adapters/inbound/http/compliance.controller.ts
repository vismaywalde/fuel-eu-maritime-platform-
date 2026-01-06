import { Router } from "express"
import { RouteRepoPg } from "../../outbound/postgres/RouteRepoPg"
import { ComplianceRepoPg } from "../../outbound/postgres/ComplianceRepoPg"
import { ComputeCB } from "../../../core/application/ComputeCB"

const router = Router()
const routeRepo = new RouteRepoPg()
const complianceRepo = new ComplianceRepoPg()
const computeCB = new ComputeCB()

router.get("/cb", async (req, res) => {
  const shipId = String(req.query.shipId)
  const year = Number(req.query.year)

  const routes = await routeRepo.findAll()
  const shipRoute = routes.find(r => r.routeId === shipId && r.year === year)

  if (!shipRoute) {
    return res.status(404).json({ error: "Route not found" })
  }

  const cb = computeCB.execute(
    shipRoute.ghgIntensity,
    shipRoute.fuelConsumption
  )

  await complianceRepo.save({ shipId, year, cb })
  res.json({ shipId, year, cb })
})

export default router
