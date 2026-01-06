import { ComputeComplianceBalance } from "../ComputeComplianceBalance"

describe("ComputeComplianceBalance", () => {
  it("returns positive CB for compliant ship", () => {
    const useCase = new ComputeComplianceBalance()
    const cb = useCase.execute(88, 5000)

    expect(cb).toBeGreaterThan(0)
  })

  it("returns negative CB for non-compliant ship", () => {
    const useCase = new ComputeComplianceBalance()
    const cb = useCase.execute(93.5, 5100)

    expect(cb).toBeLessThan(0)
  })
})
