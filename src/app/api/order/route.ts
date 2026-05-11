import { NextResponse } from "next/server";
import { appendOrderToSheet } from "@/lib/google-sheets";
import { createOrderRecord, orderSchema } from "@/lib/order";
import { sendOrderEmails } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const frontendUrl = process.env.FRONTEND_URL;
    const origin = request.headers.get("origin");
    if (frontendUrl && origin && origin !== frontendUrl) {
      return NextResponse.json({ success: false, error: "This origin is not allowed." }, { status: 403 });
    }

    const body = await request.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || "Invalid order details" },
        { status: 400 }
      );
    }

    const expectedTotal = parsed.data.quantity * parsed.data.pricePerPiece;
    if (parsed.data.totalPrice !== expectedTotal) {
      return NextResponse.json(
        { success: false, error: "Total price does not match the selected quantity and price." },
        { status: 400 }
      );
    }

    const order = createOrderRecord(parsed.data);

    await appendOrderToSheet(order);
    await sendOrderEmails(order);

    return NextResponse.json({ success: true, orderId: order.orderId });
  } catch (error) {
    console.error("Order submission failed", error);
    const message = error instanceof Error ? error.message : "Order submission failed";
    return NextResponse.json(
      { success: false, error: `Order could not be completed: ${message}` },
      { status: 500 }
    );
  }
}
