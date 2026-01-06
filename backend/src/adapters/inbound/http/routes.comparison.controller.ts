import { Router } from "express"
import { RouteRepoPg } from "../../outbound/postgres/RouteRepoPg"
import { CompareRoutesUseCase } from "../../../core/application/CompareRoutesUseCase"

const router = Router()
const repo = new RouteRepoPg()
const useCase = new CompareRoutesUseCase()

router.get("/comparison", async (req, res) => {
  const year = Number(req.query.year)

  if (!year) {
    return res.status(400).json({ error: "year is required" })
  }

  const baseline = await repo.findBaseline(year)

  if (!baseline) {
    return res.status(404).json({ error: "Baseline not found" })
  }

  const routes = await repo.findAll()

  const result = useCase.execute(
    baseline,
    routes.filter(r => r.year === year)
  )

  res.json({
    baseline: {
      routeId: baseline.routeId,
      ghgIntensity: baseline.ghgIntensity
    },
    comparisons: result
  })
})

export default router
