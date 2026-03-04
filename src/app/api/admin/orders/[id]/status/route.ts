import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { orderStatusSchema } from "@/lib/validators";

const validTransitions: Record<string, string[]> = {
  RECEIVED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY", "CANCELLED"],
  READY: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = orderStatusSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id: params.id },
  });

  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const allowed = validTransitions[order.status] || [];
  if (!allowed.includes(parsed.data.status)) {
    return NextResponse.json(
      { error: `Cannot transition from ${order.status} to ${parsed.data.status}` },
      { status: 400 }
    );
  }

  const updated = await prisma.order.update({
    where: { id: params.id },
    data: { status: parsed.data.status as never },
  });

  return NextResponse.json(updated);
}
