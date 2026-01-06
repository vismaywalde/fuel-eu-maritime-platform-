import dotenv from "dotenv"
import path from "path"

// ✅ Load .env BEFORE importing PrismaClient
dotenv.config({
  path: path.resolve(__dirname, "../../../.env")
})

import { PrismaClient } from "@prisma/client"

// ✅ NO options here
export const prisma = new PrismaClient()
