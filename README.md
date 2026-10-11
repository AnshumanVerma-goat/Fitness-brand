# MuscleBlaze Fitness Supplement E-Commerce Platform

A production-structured, full-stack fitness supplement e-commerce platform faithful to the visual language, information architecture, and shopping journey of **[MuscleBlaze](https://www.muscleblaze.com/)** (India's leading sports nutrition brand).

---

## ⚡ Tech Stack

- **Framework**: Next.js 14+ (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with custom athletic dark theme tokens (`#0c0c0e`, `#ff5c00`, `#f59e0b`)
- **Database & ORM**: SQLite (`prisma/dev.db`) via Prisma ORM 6.19 (PostgreSQL-compatible relational schema)
- **Authentication**: Salted Bcrypt password hashing with HttpOnly session cookies
- **Icons**: Lucide React
- **Validation & Math**: Server-side coupon verification, variant price validation, and atomic orders persistence

---

## 🚀 Quick Start Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
A `.env` file is included by default:
```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="muscleblaze-secret-key-32characters-secure!"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Initialize Database & Seed Catalog
The seed script populates 28+ sports nutrition products across 8 categories, 80+ variants, demo reviews, coupons, and demo accounts:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
# Or run production build:
npm run build
npm run start
```
The application will be live at `http://localhost:3000`.

---

## 🔑 Demo Account Credentials

| Role | Email | Password | Access |
|---|---|---|---|
| **Demo Customer** | `demo@muscleblaze.test` | `Password123!` | Order History, Saved Addresses, Profile |
| **Demo Admin** | `admin@muscleblaze.test` | `Admin123!` | `/admin` Store Administration Console |

*Tip: Quick-fill buttons are provided directly on the `/login` page.*

---

## 🎟️ Active Demo Coupons

| Coupon Code | Discount | Minimum Order | Details |
|---|---|---|---|
| `WELCOME10` | 10% OFF | ₹999 | Up to ₹500 discount |
| `FIT150` | ₹150 FLAT | ₹1,299 | Instant ₹150 off |
| `FREESHIP` | Free Delivery | ₹499 | Waives standard shipping |

---

## 🗺️ Route Inventory

### Main Shopping Journey
- `/` — Homepage (Hero carousel, Bestsellers, Flash deals countdown, Super Saver Stacks, Fit Foods, Goal-based navigation, Science & Authenticity guarantees)
- `/categories` — Category Directory (Visual directory with product counts)
- `/categories/[category]` — Category Listing PLP (Faceted filters: Price, Brands, Rating, Sort options)
- `/products/[slug]` — Product Detail PDP (Image gallery, dynamic weight/flavor variant switchers, PIN-code delivery checker, scientific claims accordions, verified customer reviews)
- `/deals` — Flash Deals & Heavy Discounts
- `/bestsellers` — Hall of Fame athlete favorites
- `/new-arrivals` — Latest sports nutrition formulas
- `/brands/[brand]` — Brand portfolio collections (`muscleblaze`, `bgreen`, `mb-fuel-one`, `koshaveda`)
- `/goals/[goal]` — Supplements tailored by fitness outcome (`muscle-building`, `lean-muscle`, `weight-gain`, `endurance`)
- `/search?q=[query]` — Global live search results with suggestions

### Shopping Cart & Checkout
- `/cart` — Full interactive cart page with line items, quantity controls, and real-time coupon applicator
- `/checkout` — Simulated Indian checkout (Customer info, address, delivery, demo payment selection)
- `/order-confirmation/[id]` — Order confirmation card with invoice number and delivery timeline

### Trust, Verification & Customer Care
- `/authenticity` — Batch code scratch verification simulator with NABL lab certificate report
- `/wishlist` — Customer wishlist with quick move-to-cart
- `/about` — MuscleBlaze story & clinical research
- `/contact` — Customer service contact directory and inquiry form
- `/faq` — Supplement intake & shipping FAQ accordions
- `/blog` — The Athlete Journal (educational fitness articles)
- `/blog/[slug]` — In-depth article post
- `/shipping-policy` — Delivery timeframes & threshold policies
- `/returns-policy` — 14-day hassle-free exchange policy
- `/terms` — Terms & conditions
- `/privacy-policy` — Data protection standards

### Customer Account Suite
- `/login` — Sign in with password toggle and demo autofill
- `/register` — Create account with password validation
- `/forgot-password` — Password reset flow simulator
- `/account` — Account dashboard with overview
- `/account/profile` — Profile settings
- `/account/addresses` — Saved Indian address book
- `/account/orders` — Historical order ledger with item snapshots
- `/admin` — Prototype administration console with revenue KPIs and inventory status

---

## 🧪 Switching from Demo to Real Payments in Future Phases

To connect real payment gateways (such as Razorpay, Cashfree, or PhonePe):
1. In `src/app/checkout/page.tsx`, integrate the gateway client SDK (e.g. `Razorpay.open()`).
2. In `src/app/api/orders/route.ts`, create a gateway order ID via the payment provider API.
3. Add a webhook handler `/api/webhooks/payment` verifying signature and updating `order.status` from `DEMO_PLACED` to `PAID`.
