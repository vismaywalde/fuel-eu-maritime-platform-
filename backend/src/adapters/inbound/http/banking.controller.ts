import { Router } from "express"
import { BankingRepoPg } from "../../outbound/postgres/BankingRepoPg"
import { BankSurplus } from "../../../core/application/BankSurplus"
import { ApplyBanked } from "../../../core/application/ApplyBanked"

const router = Router()
const repo = new BankingRepoPg()
const bankSurplus = new BankSurplus()
const applyBanked = new ApplyBanked()

router.post("/bank", async (req, res) => {
  const { shipId, year, cb } = req.body
  const amount = bankSurplus.execute(cb)

  await repo.save(shipId, year, amount)
  res.json({ banked: amount })
})

router.post("/apply", async (req, res) => {
  const { shipId, year, deficit } = req.body
  const available = await repo.totalBanked(shipId, year)
  const applied = applyBanked.execute(available, deficit)

  await repo.apply(shipId, year, applied)
  res.json({ applied })
})

export default router
