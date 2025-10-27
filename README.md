# Bread Station Akko - Catering Platform

E-commerce platform for catering platters with dynamic delivery dates and product options.

## Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Styling**: Tailwind CSS with RTL support
- **Payment**: PayPlus (Israeli gateway)
- **Hosting**: Heroku

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Get your Supabase credentials from: https://supabase.com/dashboard/project/kdjmufkwmuzyfmxegbcn/settings/api

### 3. Set up Database

Push the Prisma schema to your Supabase database:

```bash
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
/app              - Next.js App Router pages
  /(public)       - Public-facing pages
  /admin          - Admin dashboard
  /api            - API routes
/components       - React components
  /public         - Customer-facing components
  /admin          - Admin components
/lib              - Utilities and helpers
  /supabase       - Supabase client utilities
  /utils          - Business logic utilities
/prisma           - Database schema
```

## Key Features

- **Product Options/Variants**: Products can have multiple options (e.g., sandwich fillings)
- **Dynamic Delivery Dates**: Based on product prep time requirements
- **Delivery Area Validation**: Postal code or radius-based validation
- **Discount Codes**: Percentage or fixed amount discounts
- **CSV Import/Export**: Bulk product management
- **Hebrew/RTL Support**: Fully localized for Israeli market

## Deployment

The app is deployed on Heroku: https://catering-platform-3bf991930547.herokuapp.com

To deploy updates:

```bash
git push heroku main
```

## Database Migrations

After making schema changes:

```bash
npx prisma db push
npx prisma generate
```

## Product Catalog

The initial product catalog is in `bread_station_catalog.csv` with the following structure:
- category
- name
- unit_label
- base_price
- notes
- options (pipe-separated product variants)

## License

Private - Bread Station Akko
