"use client";

import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { formatMoney, getUnitPrice, product } from "@/lib/product";
import { OrderButton } from "./OrderButton";

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const unitPrice = getUnitPrice();
  const total = useMemo(() => unitPrice * quantity + product.deliveryFee, [quantity, unitPrice]);
  const image = product.images[active];

  function next(delta: number) {
    setActive((current) => (current + delta + product.images.length) % product.images.length);
  }

  return (
    <section id="order" className="bg-white py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-soft">
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={720}
              className="aspect-[4/3] w-full object-contain p-4"
              priority
            />
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => next(-1)}
              className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => next(1)}
              className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActive(index)}
                className={`rounded-lg border bg-slate-50 p-2 transition ${active === index ? "border-aqua ring-2 ring-aqua/30" : "border-slate-200"}`}
              >
                <Image src={item.src} alt={item.alt} width={180} height={140} className="aspect-[4/3] w-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-[#fbfdfd] p-6 shadow-soft sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-wide text-aqua">Limited COD Offer</p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">{product.name}</h2>
          <ul className="mt-6 space-y-3">
            {product.benefits.slice(0, 5).map((benefit) => (
              <li key={benefit} className="flex gap-3 text-sm text-slate-700">
                <Check className="mt-0.5 shrink-0 text-aqua" size={18} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-lg bg-white p-5 ring-1 ring-slate-200">
            <div className="flex flex-wrap items-end gap-3">
              <span className="text-4xl font-black text-ink">{formatMoney(unitPrice)}</span>
              <span className="pb-1 text-lg font-bold text-slate-400 line-through">{formatMoney(product.price)}</span>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <span className="flex items-center gap-2"><Truck size={17} className="text-signal" /> Delivery included</span>
              <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-aqua" /> Pay on delivery</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <label className="text-sm font-bold text-slate-700">Quantity</label>
              <div className="mt-2 flex h-12 w-36 items-center justify-between rounded-lg border border-slate-200 bg-white px-2">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="grid h-9 w-9 place-items-center rounded-md hover:bg-slate-100">
                  <Minus size={16} />
                </button>
                <span className="font-black">{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)} className="grid h-9 w-9 place-items-center rounded-md hover:bg-slate-100">
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-500">Live total</p>
              <p className="text-3xl font-black text-ink">{formatMoney(total)}</p>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <OrderButton quantity={quantity} label="Purchase Now" className="w-full" />
            <OrderButton quantity={quantity} label="Order Now" className="w-full bg-ink hover:bg-graphite" />
            <OrderButton quantity={quantity} label="Buy Now" className="w-full bg-aqua hover:bg-teal-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
