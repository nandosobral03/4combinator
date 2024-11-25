import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Verify the cron secret to ensure only authorized calls can trigger the cleanup
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete all cached data
    await db.catalogCacheThread.deleteMany();
    await db.catalogCache.deleteMany();

    await db.threadCacheResponse.deleteMany();
    await db.threadCache.deleteMany();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cleanup cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
