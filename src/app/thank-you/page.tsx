"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";
import { formatMoney, product } from "@/lib/product";

function ThankYouContent() {
  const params = useSearchParams();
  const productName = params.get("productName") || product.name;
  const quantity = params.get("quantity") || "1";
  const totalPrice = Number(params.get("totalPrice") || product.offerPrice);
  const orderId = params.get("orderId");

  return (
    <main className="min-h-screen bg-[#f6faf9] py-10">
      <div className="container-page flex min-h-[calc(100vh-80px)] items-center justify-center">
        <section className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-7 text-center shadow-soft sm:p-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-aqua/10 text-aqua">
            <CheckCircle2 size={38} />
          </div>
          <h1 className="mt-6 text-4xl font-black text-ink">Thank you for your order!</h1>
          <p className="mt-3 text-slate-600">Our sales representative will call you soon to confirm your order.</p>

          <div className="mt-8 rounded-lg bg-[#f6faf9] p-5 text-left">
            {orderId ? <Row label="Order ID" value={orderId} /> : null}
            <Row label="Product ordered" value={productName} />
            <Row label="Quantity" value={quantity} />
            <Row label="Total price" value={formatMoney(totalPrice)} />
            <Row label="Payment method" value="Cash On Delivery" />
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-ink px-6 py-3 text-sm font-extrabold text-white shadow-soft transition hover:bg-graphite"
          >
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200 py-3 last:border-b-0">
      <span className="text-slate-600">{label}</span>
      <span className="text-right font-black text-ink">{value}</span>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f6faf9] p-8">Loading order...</main>}>
      <ThankYouContent />
    </Suspense>
  );
}
