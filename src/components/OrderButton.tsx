"use client";

import { useRouter } from "next/navigation";
import { product, getUnitPrice } from "@/lib/product";

type OrderButtonProps = {
  quantity?: number;
  label?: string;
  className?: string;
};

export function OrderButton({ quantity = 1, label = "Order Now", className = "" }: OrderButtonProps) {
  const router = useRouter();

  function goToCheckout() {
    const unitPrice = getUnitPrice();
    const params = new URLSearchParams({
      productName: product.name,
      quantity: String(quantity),
      pricePerPiece: String(unitPrice),
      totalPrice: String(unitPrice * quantity)
    });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <button
      type="button"
      onClick={goToCheckout}
      className={`inline-flex min-h-12 items-center justify-center rounded-lg bg-signal px-6 py-3 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200 ${className}`}
    >
      {label}
    </button>
  );
}
