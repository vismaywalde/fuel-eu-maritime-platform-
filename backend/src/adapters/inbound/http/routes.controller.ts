import { Router } from "express"
import { RouteRepoPg } from "../../outbound/postgres/RouteRepoPg"

const router = Router()
const repo = new RouteRepoPg()

// GET /routes → fetch all routes
router.get("/", async (_req, res) => {
  const routes = await repo.findAll()
  res.json(routes)
})

// POST /routes/:id/baseline → set baseline route
router.post("/:id/baseline", async (req, res) => {
  const { id } = req.params

  await repo.setBaseline(id)
  res.sendStatus(204)
})

export default router
