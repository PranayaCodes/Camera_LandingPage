import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string().trim().min(1, "Name is required"),
  phone: z.string().trim().min(1, "Phone number is required"),
  email: z.string().trim().email("Email must be valid"),
  location: z.string().trim().min(1, "Location is required"),
  productName: z.string().trim().min(1, "Product name is required"),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  pricePerPiece: z.coerce.number().positive("Price per piece must be valid"),
  totalPrice: z.coerce.number().positive("Total price must be valid")
});

export type OrderInput = z.infer<typeof orderSchema>;

export type OrderRecord = OrderInput & {
  orderId: string;
  dateTime: string;
  paymentMethod: "Cash On Delivery";
  orderStatus: "New Order";
  notes: "";
};

export function createOrderRecord(input: OrderInput): OrderRecord {
  return {
    ...input,
    orderId: `COD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    dateTime: new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kathmandu"
    }).format(new Date()),
    paymentMethod: "Cash On Delivery",
    orderStatus: "New Order",
    notes: ""
  };
}
