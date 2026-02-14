
# 🎬 CineNYC | Premium Movie Booking Application

Experience cinema like never before. CineNYC is a next-generation movie booking platform providing a premium, seamless interface for reserving seats at top New York City theaters.

![CineNYC Banner](public/banner.png)

## ✨ Features

- **Premium UI/UX**: Immersive, dark-themed design with smooth animations and transitions.
- **Real-time Seat Selection**: Interactive seat map with dynamic pricing.
- **Multiple Payment Gateways**:
  - 💳 **Stripe**: Secure credit card processing.
  - 🛡️ **Paystack**: Popular Payment gateway for localized payments.
  - 🅿️ **PayPal**: Trusted global payment processor.
- **AI Assistant**: Integration with **Google Gemini** for personalized movie recommendations.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Payments**: 
  - `@stripe/react-stripe-js`
  - `react-paystack`
  - PayPal JS SDK
- **AI**: `@google/genai`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Stripe Account (for API keys)
- Paystack Account (for public keys)
- Google AI Studio Account (for Gemini API key)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/noahdevelopsio/CINENYC.git
   cd CINENYC
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   # Gemini AI
   GEMINI_API_KEY=your_gemini_api_key

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...

   # Paystack
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
   PAYSTACK_SECRET_KEY=sk_test_...

   # PayPal
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/
│   ├── actions/       # Server Actions (Gemini AI)
│   ├── api/           # API Routes (Stripe/Paystack verification)
│   ├── layout.tsx     # Root Layout
│   └── page.tsx       # Main Application Logic
├── components/        # Reusable UI Component
│   ├── SeatMap.tsx
│   ├── StripePayment.tsx
│   ├── PaystackPayment.tsx
│   ├── PayPalCheckout.tsx
│   └── ...
├── lib/               # Utilities & Constants
└── public/            # Static Assets
```

## 🔐 Security & Best Practices

- **Server-Side Processing**: Payment intents and verifications are handled strictly on the server to prevent manipulation.
- **Environment Variables**: Sensitive keys are never exposed to the client bundle.
- **Strict Typing**: Comprehensive TypeScript interfaces for all data models.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
