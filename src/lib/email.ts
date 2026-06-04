import nodemailer from "nodemailer";
import type { OrderRecord } from "./order";


function money(amount: number) {
  return `Rs. ${Number(amount).toLocaleString("en-IN")}`;
}

function shell(content: string, brandName: string) {
  return `
  <div style="margin:0;padding:0;background:#f4f7f8;font-family:Arial,Helvetica,sans-serif;color:#18202a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7f8;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e6eaee;">
            <tr>
              <td style="background:#111318;color:#ffffff;padding:26px 28px;">
                <div style="font-size:22px;font-weight:800;letter-spacing:0;">${brandName}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                ${content}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}

function row(label: string, value: string | number) {
  return `<tr><td style="padding:10px 0;color:#647084;font-size:14px;">${label}</td><td align="right" style="padding:10px 0;color:#18202a;font-size:14px;font-weight:700;">${value}</td></tr>`;
}

export function businessEmail(order: OrderRecord, brandName: string) {
  const content = `
    <h1 style="margin:0 0 8px;font-size:26px;line-height:1.2;color:#111318;">New order received</h1>
    <p style="margin:0 0 20px;color:#647084;font-size:15px;">A customer placed a Cash on Delivery order. Please call soon to confirm.</p>
    <div style="display:inline-block;background:#eafaf8;color:#007c78;border-radius:999px;padding:8px 12px;font-size:13px;font-weight:700;margin-bottom:22px;">New Order</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid #edf0f2;border-bottom:1px solid #edf0f2;margin-bottom:20px;">
      ${row("Order ID", order.orderId)}
      ${row("Date & Time", order.dateTime)}
    </table>
    <h2 style="font-size:17px;margin:22px 0 8px;color:#111318;">Customer details</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">${row("Customer Name", order.customerName)}${row("Phone Number", order.phone)}${row("Email Address", order.email)}${row("Exact Location", order.location)}</table>
    <h2 style="font-size:17px;margin:22px 0 8px;color:#111318;">Product details</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">${row("Product Name", order.productName)}${row("Quantity", order.quantity)}${row("Price Per Piece", money(order.pricePerPiece))}${row("Total Price", money(order.totalPrice))}</table>
    <h2 style="font-size:17px;margin:22px 0 8px;color:#111318;">Payment details</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">${row("Payment Method", order.paymentMethod)}${row("Order Status", order.orderStatus)}</table>
    <div style="margin-top:22px;background:#fff6e5;border:1px solid #ffd98a;color:#5f4200;border-radius:14px;padding:16px;font-weight:700;">Please call the customer soon to confirm this order.</div>
  `;
  return shell(content, brandName);
}

export function customerEmail(order: OrderRecord, brandName: string, replyTo: string) {
  const content = `
    <h1 style="margin:0 0 8px;font-size:26px;line-height:1.2;color:#111318;">Thank you for your order.</h1>
    <p style="margin:0 0 20px;color:#647084;font-size:15px;">Hi ${order.customerName}, we have received your order successfully.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid #edf0f2;border-bottom:1px solid #edf0f2;margin-bottom:20px;">
      ${row("Order ID", order.orderId)}
      ${row("Product", order.productName)}
      ${row("Quantity", order.quantity)}
      ${row("Total Price", money(order.totalPrice))}
      ${row("Payment Method", order.paymentMethod)}
    </table>
    <div style="background:#eafaf8;border:1px solid #bfece7;color:#064d4a;border-radius:14px;padding:16px;margin-bottom:18px;">Our sales representative will call you soon to confirm your order.</div>
    <p style="margin:0;color:#647084;font-size:14px;">Need help? Reply to this email or contact us at <a href="mailto:${replyTo}" style="color:#007c78;font-weight:700;">${replyTo}</a>.</p>
    <p style="margin:22px 0 0;color:#18202a;font-size:15px;">Thank you,<br><strong>${brandName}</strong></p>
  `;
  return shell(content, brandName);
}

export async function sendOrderEmails(order: OrderRecord) {
  const brandName = process.env.BRAND_NAME || "ProCapture Nepal";
  const from = process.env.EMAIL_FROM;
  const businessEmailAddress = process.env.BUSINESS_EMAIL;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!from || !businessEmailAddress || !smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.warn("Email integration is not fully configured (missing required SMTP env variables). Skipping order emails.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  await transporter.sendMail({
    from,
    to: businessEmailAddress,
    replyTo: order.email,
    subject: `New Product Order Received - ${order.orderId}`,
    html: businessEmail(order, brandName)
  });

  await transporter.sendMail({
    from,
    to: order.email,
    replyTo: from,
    subject: `Your Order Has Been Received - ${brandName}`,
    html: customerEmail(order, brandName, from)
  });
}
