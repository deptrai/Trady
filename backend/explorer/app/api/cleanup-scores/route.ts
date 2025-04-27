import { cleanupOldScores } from "@/lib/trust-score-storage"
import { NextResponse } from "next/server"

export async function GET() {
  cleanupOldScores()
  return NextResponse.json({ success: true, message: "Old trust scores cleaned up" })
}
