import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import routesController from "../adapters/inbound/http/routes.controller"
import comparisonController from "../adapters/inbound/http/routes.comparison.controller"
import complianceController from "../adapters/inbound/http/compliance.controller"
import bankingController from "../adapters/inbound/http/banking.controller"


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/routes", routesController)
app.use("/routes", comparisonController)

app.use("/compliance", complianceController)
app.use("/banking", bankingController)

app.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`)
})
