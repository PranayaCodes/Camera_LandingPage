"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { ArrowLeft, LockKeyhole, PackageCheck } from "lucide-react";
import { formatMoney, getUnitPrice, product } from "@/lib/product";

type FormState = {
  customerName: string;
  phone: string;
  email: string;
  location: string;
};

function CheckoutForm() {
  const router = useRouter();
  const params = useSearchParams();
  const quantity = Math.max(1, Number(params.get("quantity") || 1));
  const productName = params.get("productName") || product.name;
  const pricePerPiece = Number(params.get("pricePerPiece") || getUnitPrice());
  const totalPrice = Number(params.get("totalPrice") || pricePerPiece * quantity);
  const [form, setForm] = useState<FormState>({ customerName: "", phone: "", email: "", location: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const payload = useMemo(
    () => ({ ...form, productName, quantity, pricePerPiece, totalPrice }),
    [form, productName, quantity, pricePerPiece, totalPrice]
  );

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Order submission failed. Please try again.");
      }

      const thankYouParams = new URLSearchParams({
        orderId: result.orderId,
        productName,
        quantity: String(quantity),
        totalPrice: String(totalPrice)
      });
      router.push(`/thank-you?${thankYouParams.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order submission failed. Please try again.");
      setIsSubmitting(false);
    }
  }

  function updateField(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <main className="min-h-screen bg-[#f6faf9] py-8 sm:py-12">
      <div className="container-page">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-aqua">
          <ArrowLeft size={18} /> Back to product
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
          <form onSubmit={submitOrder} className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <p className="text-sm font-extrabold uppercase tracking-wide text-aqua">Cash on Delivery Checkout</p>
            <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">Confirm your order details</h1>
            <p className="mt-3 text-slate-600">Fill in your delivery details. We will call you soon to confirm the order.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" value={form.customerName} onChange={(value) => updateField("customerName", value)} required />
              <Field label="Phone Number" value={form.phone} onChange={(value) => updateField("phone", value)} required />
              <Field label="Email Address" value={form.email} onChange={(value) => updateField("email", value)} required />
              <Field label="Exact Location" value={form.location} placeholder="Kindly share your exact location" onChange={(value) => updateField("location", value)} required />
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <ReadOnly label="Product Name" value={productName} />
              <ReadOnly label="Quantity" value={String(quantity)} />
              <ReadOnly label="Price Per Piece" value={formatMoney(pricePerPiece)} />
              <ReadOnly label="Total Price" value={formatMoney(totalPrice)} />
            </div>

            {error ? <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-signal px-6 py-3 text-sm font-extrabold text-white shadow-soft transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-65"
            >
              {isSubmitting ? "Submitting Order..." : "Order Now"}
            </button>
          </form>

          <aside className="h-fit rounded-lg border border-slate-200 bg-ink p-6 text-white shadow-soft sm:p-8">
            <PackageCheck className="text-saffron" size={34} />
            <h2 className="mt-4 text-2xl font-black">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm">
              <Summary label="Product" value={productName} />
              <Summary label="Quantity" value={String(quantity)} />
              <Summary label="Price per piece" value={formatMoney(pricePerPiece)} />
              <Summary label="Delivery fee" value="Free" />
              <Summary label="Payment method" value="Cash On Delivery" />
            </div>
            <div className="mt-6 border-t border-white/15 pt-5">
              <div className="flex items-end justify-between gap-4">
                <span className="font-bold text-slate-300">Total</span>
                <span className="text-3xl font-black">{formatMoney(totalPrice)}</span>
              </div>
            </div>
            <p className="mt-6 flex gap-2 text-sm leading-6 text-slate-300">
              <LockKeyhole className="mt-0.5 shrink-0 text-aqua" size={17} />
              Your order details are sent securely to our server. No payment is collected online.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, required }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-extrabold text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-ink outline-none ring-aqua/20 transition focus:border-aqua focus:ring-4"
      />
    </label>
  );
}

function ReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-extrabold text-slate-700">{label}</span>
      <input readOnly value={value} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 font-bold text-slate-700 outline-none" />
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-300">{label}</span>
      <span className="text-right font-extrabold">{value}</span>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f6faf9] p-8">Loading checkout...</main>}>
      <CheckoutForm />
    </Suspense>
  );
}
