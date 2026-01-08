# FuelEU Maritime Compliance Platform

A full-stack FuelEU Maritime compliance platform implementing **Routes**, **Comparison**, **Banking (Article 20)**, and **Pooling (Article 21)** workflows, following **hexagonal (ports & adapters) architecture** and using AI agents transparently as development accelerators.

---

## Overview

This project demonstrates how FuelEU Maritime compliance can be modeled, calculated, and visualized using modern full-stack engineering practices.

### Key Capabilities
- Route management and baseline selection
- GHG intensity comparison and compliance evaluation
- Compliance Balance (CB) calculation
- Banking of surplus CB (Article 20)
- Pooling of ships with surplus/deficit CB (Article 21)
- Clean separation of domain logic and infrastructure
- Fully connected frontend and backend (no mocks)

---

## Tech Stack

### Frontend
- React + TypeScript
- TailwindCSS
- Axios
- Recharts
- Vite

### Backend
- Node.js + TypeScript
- Express
- PostgreSQL
- Prisma ORM


### Architecture
- Hexagonal / Clean Architecture
- Ports & Adapters
- Domain-driven design principles

---

## Project Structure


### Repository Layout
fuel-eu-maritime-platform/ <br>
├── frontend/  <br>
├── backend/ <br>
├── AGENT_WORKFLOW.md <br>
├── README.md <br>
└── REFLECTION.md <br>



---

## Backend Architecture

backend/src/ <br>
├── core/ <br>
│ ├── domain/ <br>
│ ├── application/ <br>
│ └── ports/ <br>
├── adapters/ <br>
│ ├── inbound/http/ <br>
│ └── outbound/postgres/ <br>
├── infrastructure/ <br>
│ ├── db/ <br>
│ └── server.ts <br>
└── shared/ <br>

<img width="1920" height="1080" alt="Screenshot 2026-01-06 155948" src="https://github.com/user-attachments/assets/84d56b19-b37f-4cdd-bef3-2cf5b06668c6" />



- **Core**: Pure business logic (no frameworks)
- **Ports**: Interfaces for repositories and services
- **Adapters**: Express controllers, Prisma repositories
- **Infrastructure**: Server bootstrap and DB wiring

---

## Frontend Architecture

frontend/src/ <br>
├── core/ <br>
├── adapters/ <br>
│ ├── ui/ <br>
│ └── infrastructure/ <br>
├── shared/ <br>
├── App.tsx <br>
└── main.tsx <br>


- **UI Adapters**: React components (Routes, Compare, Banking, Pooling)
- **Infrastructure Adapters**: API clients (Axios)
- **Shared**: TypeScript interfaces

Frontend depends only on API contracts, not backend internals.
<img width="1264" height="931" alt="Screenshot 2026-01-06 155457" src="https://github.com/user-attachments/assets/80393e60-2873-4bfd-9bd2-a2c54d9d2e03" />

---

## Backend Setup & Run

### Prerequisites
- Node.js ≥ 18
- PostgreSQL ≥ 14

### Setup
```bash
cd backend
npm install


## Environment Variables

Create a `.env` file in the backend root:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/fueleu
PORT=3000

Database Setup

Run the following commands from the backend directory:
npx prisma migrate dev
npx ts-node prisma/seed.ts

Run Backend
npm run dev

Backend runs on:
http://localhost:3000


Frontend Setup & Run <br>
cd frontend
npm install
npm run dev
Frontend runs on:
http://localhost:5173

 <br> <br>
API Endpoints (Sample)
Routes
GET /routes

POST /routes/:id/baseline

GET /routes/comparison?year=YYYY

Compliance
GET /compliance/cb?shipId=R001&year=2024

GET /compliance/adjusted-cb?year=2024

Banking
POST /banking/bank

POST /banking/apply

Pooling
POST /pools

Sample API Response
json
Copy code
{
  "baseline": { "routeId": "R001", "ghgIntensity": 91 },
  "comparisons": [
    {
      "routeId": "R002",
      "ghgIntensity": 88,
      "percentDiff": -3.3,
      "compliant": true
    }
  ]
}

Testing
Backend
Unit tests for CB calculation, banking, and pooling logic <br>

Integration tests via Supertest <br>

bash
Copy code
npm run test
Frontend
Manual verification via UI and browser Network tab <br>

Backend dependency confirmed (no mock data used) <br>

AI Agent Usage
AI agents were used transparently and responsibly throughout the project.
Detailed documentation is available in: <br>

📄 AGENT_WORKFLOW.md <br>

Key Design Decisions
Strict separation between domain logic and infrastructure <br>

No business logic inside controllers or React components <br>

No mock data used in the frontend <br>

TypeScript strict mode enabled across the project

Manual validation of all AI-generated outputs

Compliance Reference
All formulas, constants, and rules are based on: <br>

FuelEU Maritime Regulation (EU) 2023/1805 <br>
Articles 20–21, Annex IV





