# Reflection

This project was my first end-to-end experience building a **regulation-driven, full-stack system** while consciously using AI agents as part of the development workflow. The process helped me understand both the **strengths and limitations of AI-assisted engineering**, especially in a real-world, non-trivial domain like FuelEU Maritime compliance.

---

## What I Learned Using AI Agents

The biggest learning was that AI agents are most effective when used as a **thinking partner rather than a code generator**. AI helped me reason about architecture choices (such as hexagonal architecture), interpret complex error messages, and scaffold boilerplate code quickly. However, translating regulatory requirements (FuelEU Articles 20–21) into correct business logic still required careful human interpretation and validation.

I also learned how important it is to **ask precise prompts**. Vague prompts often resulted in incomplete or environment-incompatible outputs, while specific prompts (e.g., “strict TypeScript with `verbatimModuleSyntax`”) produced much more usable results.

---

## Efficiency Gains vs Manual Coding

AI provided clear efficiency gains in:
- Initial project scaffolding
- Repetitive TypeScript interfaces and adapters
- React component boilerplate
- Debugging complex Prisma, Tailwind, and TypeScript errors faster

That said, AI did not replace manual coding. Core areas still required hands-on work:
- Debugging environment-specific issues (Windows file locking, Prisma versions)
- Enforcing strict architectural boundaries
- Validating compliance formulas and edge cases
- Integrating frontend and backend correctly without mocks

Overall, AI significantly reduced development time, but **manual validation remained the dominant effort** for correctness and quality.

---

## Improvements I’d Make Next Time

If I were to repeat this project:
- I would define stricter prompt templates early (architecture, types, adapters) to reduce rework.
- I would lock tool versions (Prisma, Tailwind) earlier to avoid version-related friction.
- I would add automated frontend tests to complement manual verification.
- I would experiment with AI-assisted test generation for edge cases.

---

## Conclusion

This project reinforced that **AI is most valuable when paired with strong engineering judgment**. Used responsibly, it accelerates development without compromising code quality. The final outcome reflects a balance between AI-assisted productivity and deliberate, manual decision-making — a workflow I plan to continue refining in future projects.
