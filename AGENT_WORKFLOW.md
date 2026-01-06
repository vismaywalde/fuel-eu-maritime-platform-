# AI Agent Workflow Log

This document provides a complete and transparent record of how AI agents were used during the development of the FuelEU Maritime Compliance Platform. AI tools were used as engineering assistants to improve productivity and reasoning, while all architectural decisions, validations, and corrections were performed manually.

---

## Agents Used

The following AI agents/tools were used:

- **ChatGPT (GPT-4 class model)**  
  Used for:
  - Designing the hexagonal (ports & adapters) architecture
  - Backend domain modeling (Routes, Compliance Balance, Banking, Pooling)
  - Frontend React + TypeScript dashboard design
  - Debugging Prisma, TypeScript strict mode, Tailwind, and Vite issues
  - Writing technical documentation

- **GitHub Copilot (Inline Autocomplete)**  
  Used selectively for:
  - Boilerplate React components
  - Repetitive TypeScript interfaces
  - Simple CRUD and API adapter stubs

No autonomous agent execution was used. All AI-generated output was reviewed, tested, and modified manually.

---

## Prompts & Outputs

### Example 1 — Backend Architecture Design

**Prompt**

Design a backend using hexagonal architecture for a FuelEU Maritime
compliance system with routes, CB calculation, banking, and pooling.


**AI Output (excerpt)**
```ts
core/
  domain/
    Route.ts
    ComplianceBalance.ts
  application/
    ComputeComplianceBalance.ts
  ports/
    RouteRepository.ts
    ComplianceRepository.ts


## How it was used

The structure was adopted as the base layout.

Domain entities and use-cases were implemented manually.

Express and Prisma were confined to adapters and infrastructure layers.

### Example 2 — Frontend Routes Dashboard

Prompt

Create a React + TypeScript Routes table with filters and a
Set Baseline action using clean architecture principles.


AI Output (excerpt)

const filtered = routes.filter(r =>
  (!vessel || r.vesselType === vessel) &&
  (!fuel || r.fuelType === fuel)
)


## How it was refined

- Added year filtering and loading states
- Connected to real backend APIs (no mock data)
- Applied strict TypeScript rules (`import type`)
- Styled using TailwindCSS

---

## Validation / Corrections

AI-generated output was never accepted blindly. All logic and code were validated through real execution and testing.

### Backend Validation

- Prisma migrations and seeds executed locally
- APIs tested using `curl` and browser requests
- Compliance Balance calculations verified against FuelEU formulas
- Edge cases validated:
  - Negative CB values
  - Over-banking attempts
  - Invalid pool creation scenarios

### Frontend Validation

- Browser Network tab verified real HTTP calls to backend
- Backend shutdown tested to confirm frontend dependency
- TypeScript strict-mode issues resolved:
  - `verbatimModuleSyntax`
  - Correct separation of type-only and value imports
- Tailwind + Vite + Windows CLI issues resolved manually

Several AI suggestions (notably Prisma v7 configuration and Tailwind v4 CLI usage) required correction after encountering real environment constraints.

---

## Observations

### Where AI Saved Time

- Initial architectural scaffolding
- Boilerplate React and TypeScript code
- Repetitive interface and adapter generation
- Interpreting complex error messages
- Drafting technical documentation

### Where AI Struggled

- Prisma version differences (v5 vs v7)
- Windows file-locking issues (`EPERM`)
- Tailwind v4 CLI behavior on Windows
- Strict ES module semantics in TypeScript

These areas required hands-on debugging and engineering judgment.

### Effective Combination of Tools

- ChatGPT for reasoning, design, and debugging
- GitHub Copilot for inline productivity
- Manual testing and verification as the final authority

---

## Best Practices Followed

- AI treated as a **pair programmer**, not a decision maker
- All business logic validated independently
- No framework leakage into the domain core
- Incremental and meaningful Git commits
- Errors investigated thoroughly rather than patched
- Clear separation between:
  - Types and runtime values
  - Core domain logic and adapters
  - Frontend and backend responsibilities

---

## Summary

AI significantly accelerated development while preserving engineering rigor. The final system reflects deliberate architectural decisions, verified FuelEU compliance logic, and production-ready code quality.

This workflow demonstrates **responsible, transparent, and effective AI usage**, aligned with modern professional software engineering standards.
