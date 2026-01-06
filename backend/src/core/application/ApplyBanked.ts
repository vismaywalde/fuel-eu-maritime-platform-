export class ApplyBanked {
  execute(available: number, deficit: number): number {
    if (deficit >= 0) {
      throw new Error("No deficit to apply")
    }
    if (available + deficit < 0) {
      throw new Error("Insufficient banked balance")
    }
    return Math.min(available, Math.abs(deficit))
  }
}
