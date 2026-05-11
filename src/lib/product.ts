export const product = {
  brandName: "ProCapture Nepal",
  whatsappNumber: "9762410108",
  businessEmail: "khadkapranaya108@gmail.com",
  name: "ProCapture 4K Action Camera",
  headline: "Capture every ride, trip, vlog, and family moment in crisp 4K.",
  subheadline:
    "A compact camera bundle built for creators who want sharp video, stable shots, and easy cash-on-delivery ordering.",
  description:
    "The ProCapture 4K Action Camera is made for everyday creators, travelers, riders, vloggers, and families who want clear, reliable footage without carrying heavy gear. It is lightweight, easy to use, and ready for outdoor adventures, product shoots, events, and social media content.",
  price: 24999,
  offerPrice: 18999,
  currency: "Rs.",
  deliveryFee: 0,
  sheetTabName: "Orders",
  images: [
    { src: "/products/camera-hero.png", alt: "Compact 4K action camera close-up" },
    { src: "/products/camera-360.png", alt: "360 action camera product view" },
    { src: "/products/camera-video.png", alt: "Professional 4K video camera" },
    { src: "/products/camera-dslr.png", alt: "Premium DSLR camera view" }
  ],
  benefits: [
    "Sharp 4K video quality for travel, events, and vlogs",
    "Compact body that is easy to carry anywhere",
    "Stabilized shooting for smoother handheld footage",
    "Simple controls for beginners and daily creators",
    "Great for reels, YouTube videos, product shoots, and family memories",
    "Cash on Delivery with phone confirmation before dispatch"
  ],
  trust: ["Cash on Delivery", "Fast delivery", "Phone confirmation", "Friendly support"],
  testimonials: [
    {
      name: "Aarav S.",
      quote:
        "The video quality is much better than I expected for the price. I ordered through COD and got a confirmation call the same day."
    },
    {
      name: "Nisha K.",
      quote:
        "Perfect for my travel reels. It is light, easy to use, and the footage looks clean even when I am walking."
    },
    {
      name: "Rohit M.",
      quote:
        "I bought it for bike rides and product videos. The ordering process was simple and the support team was helpful."
    }
  ],
  faqs: [
    {
      question: "Is Cash on Delivery available?",
      answer: "Yes. You can place your order now and pay in cash when the product is delivered."
    },
    {
      question: "Will someone call me after I place the order?",
      answer: "Yes. Our sales representative will call you soon to confirm your order and delivery details."
    },
    {
      question: "Can I use this camera for reels and YouTube videos?",
      answer: "Yes. It is suitable for reels, vlogs, travel videos, bike rides, events, and social media content."
    },
    {
      question: "Is the product beginner friendly?",
      answer: "Yes. The controls are simple, so beginners can start recording quickly without a complicated setup."
    },
    {
      question: "Is there a delivery charge?",
      answer: "No. Delivery is included in the current offer."
    },
    {
      question: "Can I order more than one camera?",
      answer: "Yes. You can choose the quantity before going to checkout and the total will update automatically."
    }
  ]
};

export function formatMoney(amount: number) {
  return `${product.currency} ${amount.toLocaleString("en-IN")}`;
}

export function getUnitPrice() {
  return product.offerPrice || product.price;
}
