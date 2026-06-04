import "dotenv/config";

const order = {
  customerName: "Test Customer",
  phone: "9800000000",
  email: process.env.TEST_CUSTOMER_EMAIL || process.env.BUSINESS_EMAIL || "customer@example.com",
  location: "Kathmandu, Nepal",
  productName: "ProCapture 4K Action Camera",
  quantity: 1,
  pricePerPiece: 18999,
  totalPrice: 18999
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const response = await fetch(`${baseUrl}/api/order`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Origin: process.env.FRONTEND_URL || baseUrl
  },
  body: JSON.stringify(order)
});

const result = await response.json();
console.log(JSON.stringify(result, null, 2));

if (!response.ok || !result.success) {
  process.exitCode = 1;
}
