export class BankSurplus {
  execute(cb: number): number {
    if (cb <= 0) {
      throw new Error("Only positive CB can be banked")
    }
    return cb
  }
}
