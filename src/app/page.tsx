import Image from "next/image";
import { BadgeCheck, Camera, CheckCircle2, Headphones, MessageCircle, PackageCheck, Truck } from "lucide-react";
import { OrderButton } from "@/components/OrderButton";
import { ProductShowcase } from "@/components/ProductShowcase";
import { formatMoney, getUnitPrice, product } from "@/lib/product";

const icons = [Camera, BadgeCheck, Truck, Headphones, PackageCheck, CheckCircle2];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-white" />
        <div className="container-page relative grid min-h-[720px] gap-10 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-xl pt-8">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-saffron ring-1 ring-white/15">
              Cash on Delivery Available
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">{product.name}</h1>
            <p className="mt-5 text-2xl font-extrabold text-white/90">{product.headline}</p>
            <p className="mt-4 text-base leading-8 text-slate-300">{product.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <OrderButton label="Purchase Now" />
              <OrderButton label="Order Now" className="bg-white !text-ink hover:bg-slate-100" />
              <a
                href={`https://wa.me/977${product.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-aqua px-6 py-3 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {product.trust.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm font-bold text-white/85">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 top-8 h-40 w-40 rounded-full bg-aqua/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-lg bg-white p-4 shadow-soft">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                width={900}
                height={760}
                className="aspect-[4/3] w-full object-contain"
                priority
              />
            </div>
            <div className="relative mx-auto -mt-8 grid max-w-xl grid-cols-3 gap-3 rounded-lg bg-white p-4 text-ink shadow-soft">
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Offer Price</p>
                <p className="text-xl font-black">{formatMoney(getUnitPrice())}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Payment</p>
                <p className="text-xl font-black">COD</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Delivery</p>
                <p className="text-xl font-black">Free</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductShowcase />

      <section className="bg-[#f6faf9] py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-wide text-aqua">Why buy this camera</p>
            <h2 className="mt-3 text-3xl font-black text-ink sm:text-5xl">Built for cleaner content, simpler ordering, and better everyday shots.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {product.benefits.map((benefit, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div key={benefit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-aqua/10 text-aqua">
                    <Icon size={22} />
                  </div>
                  <p className="mt-4 text-base font-extrabold leading-7 text-ink">{benefit}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <OrderButton label="Buy Now" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wide text-signal">Customer stories</p>
              <h2 className="mt-3 text-3xl font-black text-ink sm:text-5xl">Trusted by everyday creators.</h2>
            </div>
            <OrderButton label="Purchase Now" className="md:mb-1" />
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {product.testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="rounded-lg border border-slate-200 bg-[#fbfdfd] p-6 shadow-sm">
                <div className="mb-4 flex gap-1 text-saffron">★★★★★</div>
                <blockquote className="leading-7 text-slate-700">"{testimonial.quote}"</blockquote>
                <figcaption className="mt-5 font-black text-ink">{testimonial.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6faf9] py-16 sm:py-20">
        <div className="container-page max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-wide text-aqua">FAQ</p>
            <h2 className="mt-3 text-3xl font-black text-ink sm:text-5xl">Questions before you order.</h2>
          </div>
          <div className="mt-10 space-y-3">
            {product.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer list-none text-base font-extrabold text-ink">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-aqua group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="container-page grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-saffron">Final offer</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Order today and pay only when it arrives.</h2>
            <p className="mt-4 max-w-2xl text-slate-300">No online payment required. Submit your details, receive a confirmation call, and complete payment by Cash on Delivery.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <OrderButton label="Order Now" />
            <OrderButton label="Buy Now" className="bg-white !text-ink hover:bg-slate-100" />
            <a
              href={`https://wa.me/977${product.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-aqua px-6 py-3 text-sm font-extrabold text-white shadow-soft transition hover:bg-teal-700"
            >
              <MessageCircle size={18} />
              WhatsApp Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
