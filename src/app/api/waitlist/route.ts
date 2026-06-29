import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { getPostHogClient } from "@/lib/posthog-server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    await addDoc(collection(db, "waitlist"), {
      name: body.name ?? "",
      company: body.company ?? "",
      email: body.email ?? "",
      building: body.building ?? "",
      tasks: body.tasks ?? "",
      volume: body.volume ?? "",
      budget: body.budget ?? "",
      country: body.country ?? "",
      submittedAt: serverTimestamp(),
    });

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: String(body.email ?? "anonymous"),
      event: "server_waitlist_signup",
      properties: {
        volume: body.volume ?? null,
        budget: body.budget ?? null,
        country: body.country ?? null,
        has_company: Boolean(body.company),
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Firestore waitlist write failed:", err);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }
}
