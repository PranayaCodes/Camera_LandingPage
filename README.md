# Camera Cash On Delivery Funnel

This is a complete Next.js App Router sales funnel for a Cash on Delivery camera offer.

## Tech Stack

- Next.js App Router for pages and API routes
- Tailwind CSS for responsive UI
- Zod for checkout/API validation
- Google Sheets API for order storage
- Nodemailer with SMTP/Gmail for business and customer emails
- Sharp for converting the provided product JPGs into optimized PNG assets

## Order Flow

1. Customer lands on `/` and chooses quantity in the product showcase.
2. CTA buttons send the selected product name, quantity, price per piece, and total price to `/checkout`.
3. Checkout auto-fills product details and asks for name, phone, email, and exact location.
4. Checkout sends a POST request to `/api/order`.
5. The API validates the order, generates an Order ID, appends the order to Google Sheets, sends the business notification email, sends the customer confirmation email, then returns success.
6. The customer is redirected to `/thank-you`.

## Routes

- `/` - product landing page
- `/checkout` - Cash on Delivery checkout form
- `/thank-you` - order confirmation page
- `/api/order` - secure server-side order submission

## Environment Variables

Copy `.env.example` to `.env.local` for local development and add values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BUSINESS_EMAIL=khadkapranaya108@gmail.com
EMAIL_FROM="ProCapture Nepal <khadkapranaya108@gmail.com>"
BRAND_NAME=ProCapture Nepal

GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=Orders
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=khadkapranaya108@gmail.com
SMTP_PASS=your-gmail-app-password

EMAIL_SERVICE_API_KEY=

FRONTEND_URL=http://localhost:3000
```

You can also copy `.env.local.example` because it already includes the provided Google Sheet ID and service account email. Paste the private key and Gmail app password locally only. Do not commit `.env.local`.

For Vercel, add the same values in Project Settings > Environment Variables. Set `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL` to your production domain, for example `https://your-domain.com`.

## Google Spreadsheet Setup

1. Create a new Google Spreadsheet.
2. Create a sheet/tab named `Orders`, or use your own name and set `GOOGLE_SHEET_TAB_NAME`.
3. Add these columns in row 1:

```text
Order ID
Date & Time
Customer Name
Phone Number
Email Address
Exact Location
Product Name
Quantity
Price Per Piece
Total Price
Payment Method
Order Status
Notes
```

4. Select row 1 and apply bold styling, a background color, and filters from Data > Create a filter.
5. For the `Order Status` column, add a dropdown from Data > Data validation with:

```text
New Order
Order Confirmed
Order Ongoing
Delivered
Cancelled
```

6. Get the Google Sheet ID from the URL:

```text
https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
```

7. In Google Cloud, create a project, enable Google Sheets API, create a Service Account, and generate a JSON key.
8. Add the service account email to `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
9. Add the private key to `GOOGLE_PRIVATE_KEY`. Keep the escaped `\n` line breaks if you paste it into Vercel.
10. Share the Google Sheet with the service account email as Editor.

The API also writes the expected header row automatically to `A1:M1`, so the structure stays consistent.

## Gmail / SMTP Setup

1. Use a Gmail account for order notifications.
2. Turn on 2-Step Verification.
3. Create a Gmail App Password.
4. Set:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
BUSINESS_EMAIL=your-gmail@gmail.com
EMAIL_FROM="Brand Name <your-gmail@gmail.com>"
```

The business email receives the full order details. The customer receives a polished "Order Received" email.

## Test the Full Order Pipeline

After `.env.local` has the Google private key and Gmail app password, start the app:

```bash
npm run dev
```

In another terminal, run:

```bash
npm run test:order
```

If everything is configured correctly, the script returns a success response with an Order ID, adds a row to Google Sheets, sends the business notification email, and sends the customer confirmation email.

## Testing Order Submission

1. Install dependencies:

```bash
npm install
```

2. Convert the product images:

```bash
npm run prepare:images
```

3. Add `.env.local` with valid Google and SMTP credentials.
4. Start the dev server:

```bash
npm run dev
```

5. Open `http://localhost:3000`, click an order button, complete checkout, and submit.
6. Confirm:

- A new row appears in Google Sheets.
- The business Gmail receives `New Product Order Received - [Order ID]`.
- The customer receives `Your Order Has Been Received - [Brand Name]`.
- The browser redirects to `/thank-you`.

If submission fails, the checkout page shows the error and does not redirect.

## Deploying on Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Add all environment variables from `.env.example`.
4. Make sure `GOOGLE_PRIVATE_KEY` is pasted with escaped newlines or as Vercel stores multiline secrets.
5. Set `FRONTEND_URL` and `NEXT_PUBLIC_SITE_URL` to your Vercel domain.
6. Deploy.

## Editing Product Content

Edit the offer details in:

```text
src/lib/product.ts
```

This includes product name, brand name, description, benefits, pricing, testimonials, FAQs, images, and delivery fee.
