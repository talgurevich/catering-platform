# Bread Station Akko - Catering Platform Specification

## 1. Project Overview

E-commerce platform for Bread Station Akko to sell catering platters to Israeli customers with:
- **Public site**: Browse catalog, order with delivery date selection, checkout
- **Admin dashboard**: Manage products, orders, discounts, settings
- **Key feature**: Dynamic delivery dates based on prep time requirements

**Business Model**: Made-to-order catering with advance notice (no inventory tracking).

---

## 2. Technology Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Hosting**: Heroku
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS + RTL Plugin
- **Forms**: React Hook Form + Zod
- **Payment**: PayPlus (Israeli gateway with auto-invoicing)
- **ORM**: Prisma
- **Key Libraries**: date-fns, xlsx (SheetJS), papaparse, lucide-react

---

## 3. Customer Pages

### 3.1 Homepage (`/`)

**Hero Section:**
- Banner image/carousel (1920x800px)
- Headline + tagline (Hebrew)
- CTAs: "הזמינו עכשיו" (scroll to catalog), "אודותינו" (to /about)
- 4 key features with icons (fresh ingredients, same-day prep, nationwide delivery, tax invoice)

**Catalog Section:**
- Grid of product cards (image, name, price, prep time, "Add to Cart")
- Category filters, search, sort
- Sticky header: Logo, menu (Home, About), cart icon

### 3.2 Product Detail (`/platter/[id]`)
- Image gallery, price, detailed description
- Ingredients, allergens, serving size
- Prep time notice
- Quantity selector, "Add to Cart"

### 3.3 Cart (`/cart`)
- Line items with quantity adjusters
- Notice: "Longest prep time: X days"
- Subtotal, "Proceed to Delivery Date Selection"

### 3.4 Delivery Area Validation (`/checkout/location`)
- **Critical**: Validate delivery area before date selection
- Address input with autocomplete (Google Places API)
- Real-time validation: Check if postal code/coordinates are within delivery zones
- Clear error message if outside delivery area with alternative contact info
- Option to proceed if within delivery area

### 3.5 Delivery Date Selection (`/checkout/delivery`)
- **Critical**: Calendar with disabled dates before earliest available date
- Calculation: `earliest_date = today + max(cart_items.prep_days)`
- Time slot selection (morning/afternoon/evening)
- Display validated delivery address (from previous step)

### 3.6 Customer Details (`/checkout/details`)
- Form: Name, phone, email, special instructions (address pre-filled from step 3.4)
- **Discount code input**: Validate and apply discount
- Order summary with discount
- Required checkbox: "I agree to [Terms](/terms) and [Privacy](/privacy)"

### 3.7 Payment (`/checkout/payment`)
- Redirect to PayPlus hosted payment page
- PayPlus handles card processing and invoice generation

### 3.8 Order Confirmation (`/order/[orderNumber]`)
- Success message, order number, details
- Email confirmation sent

### 3.9 Order Tracking (`/track/[orderNumber]`)
- Enter order number + phone/email to view status

### 3.10 About (`/about`)
- Our story, why choose us, values
- Location & service area, team (optional)
- Certifications, CTA to order

### 3.11 Footer (All Pages)
**4 Columns:**
1. About + social media
2. Quick links (Home, About, Terms, Privacy)
3. Contact info (phone, email, address, hours)
4. Trust signals (payment methods, security badges)

### 3.12 Legal Pages
- **Terms & Conditions** (`/terms`): To be generated before launch
- **Privacy Policy** (`/privacy`): Israeli law compliance, to be generated

---

## 4. Admin Dashboard

**Auth**: Supabase Auth (email/password), admin-only access

### 4.1 Orders (`/admin` or `/admin/orders`)
- Table: Order number, customer, delivery date, status, total
- Filters: Status, date range, customer search
- Calendar view toggle
- Click row → Order detail page

### 4.2 Order Detail (`/admin/orders/[id]`)
- Full order info, customer details, items
- Status update dropdown (pending → confirmed → preparing → delivered)
- Internal notes, send notifications
- Print for kitchen

### 4.3 Products (`/admin/products`)
**List View:**
- Grid/table with image, name, price, category, prep time, active toggle
- Sort, filter, search, bulk actions
- Buttons: "Add New", "Import Products", "Export to Excel", "Download Template"

**CSV/Excel Import**: 6-step wizard (upload → map columns → validate → import → results)
**CSV/Excel Export**: Download full catalog for bulk editing

### 4.4 Add/Edit Product (`/admin/products/new` or `/[id]/edit`)
**Two-column layout:**
- **Left**: Multi-image upload (drag-drop, reorder, set primary)
- **Right**: Form fields (name, description, price, category, prep time, ingredients, allergens, serving size, notes, active status)

### 4.5 Categories (`/admin/categories`)
- CRUD categories, inline editing

### 4.6 Discount Codes (`/admin/discount-codes`)
- Table: Code, type, value, validity, usage
- Create: Code, percentage/fixed, min order, dates, usage limit

### 4.7 Blocked Dates (`/admin/blocked-dates`)
- Calendar view, add date + reason
- Used for holidays, closures

### 4.8 Delivery Zones (`/admin/delivery-zones`)
- **Critical**: Define areas where delivery is available
- **Option A - Postal Code Ranges**: Add postal code ranges (e.g., 2410000-2419999 for Akko area)
- **Option B - Radius-based**: Set delivery radius from business location (e.g., 50km)
- **Option C - Manual Postal Code List**: Add individual postal codes or city names
- Map visualization showing covered areas (optional)
- Enable/disable zones, set per-zone delivery fees (future enhancement)

### 4.9 Settings (`/admin/settings`)
- Delivery: Time slots, max orders/day, default delivery fee, delivery validation method (postal code/radius)
- Business info: Name, phone, email, address, coordinates (for radius calculation)
- Working days

---

## 5. Database Schema

### Products
```sql
id, name_he, description_he, short_description, price, category_id, 
prep_time_days, ingredients, allergens[], serving_size, images[], 
is_active, is_featured, notes, slug, created_at, updated_at
```

### Orders
```sql
id, order_number, customer_name, customer_phone, customer_email, 
delivery_address (JSONB), delivery_date, delivery_time_slot, 
special_instructions, subtotal, discount_code_id, discount_amount, 
delivery_fee, total, payment_status, payment_transaction_id, 
payplus_invoice_number, order_status, notes, created_at, updated_at
```

### Order_Items
```sql
id, order_id, product_id, product_name_he, quantity, price_per_unit, 
prep_time_days, subtotal, created_at
```

### Categories
```sql
id, name_he, slug, display_order, created_at
```

### Discount_Codes
```sql
id, code, description, discount_type (percentage/fixed), discount_value, 
min_order_amount, valid_from, valid_until, usage_limit, times_used, 
is_active, created_at, updated_at
```

### Blocked_Dates
```sql
id, date, reason, created_at
```

### Delivery_Zones
```sql
id, zone_type (postal_code_range|postal_code_list|radius),
postal_code_start, postal_code_end, postal_codes (ARRAY),
city_names (ARRAY), radius_km, delivery_fee_override,
is_active, created_at, updated_at
```

### Settings
```sql
key, value (JSONB), updated_at
```
**Key settings:**
- `business_coordinates`: { lat, lng } for radius calculations
- `delivery_validation_method`: postal_code | radius | manual
- `default_delivery_radius_km`: number

**RLS Policies:**
- Products: Public SELECT (active), Admin full CRUD
- Orders: Public INSERT only, Admin full access
- Delivery_Zones: Public SELECT (active zones), Admin full CRUD
- All other tables: Admin only

**Supabase Storage:**
- Bucket: `products` (public read, admin write via RLS)
- Images: `https://[project].supabase.co/storage/v1/object/public/products/[filename]`

---

## 6. Critical Business Logic

### Date Calculation (`/lib/utils/date-calculator.ts`)
```typescript
function calculateEarliestDeliveryDate(cartItems, blockedDates) {
  const maxPrepDays = Math.max(...cartItems.map(i => i.prepTimeDays));
  let earliestDate = addDays(new Date(), maxPrepDays);
  
  // Skip blocked dates and non-working days
  while (isDateBlocked(earliestDate, blockedDates) || !isWorkingDay(earliestDate)) {
    earliestDate = addDays(earliestDate, 1);
  }
  
  return earliestDate;
}
```

### Discount Validation (`/lib/utils/discount-calculator.ts`)
```typescript
async function validateDiscountCode(code, orderSubtotal) {
  const discount = await fetchCode(code.toUpperCase());

  // Check: exists, active, date valid, usage limit, min order
  if (!discount || !discount.is_active) return { valid: false };
  if (now < discount.valid_from || now > discount.valid_until) return { valid: false };
  if (discount.usage_limit > 0 && discount.times_used >= discount.usage_limit) return { valid: false };
  if (orderSubtotal < discount.min_order_amount) return { valid: false };

  // Calculate discount
  const amount = discount.type === 'percentage'
    ? (orderSubtotal * discount.value) / 100
    : discount.value;

  return { valid: true, discountAmount: Math.min(amount, orderSubtotal) };
}
```

### Delivery Area Validation (`/lib/utils/delivery-validator.ts`)
```typescript
async function validateDeliveryAddress(address, postalCode, coordinates) {
  const settings = await getSettings();
  const deliveryZones = await getActiveDeliveryZones();

  const validationMethod = settings.delivery_validation_method;

  if (validationMethod === 'postal_code') {
    // Check if postal code is in any active zone
    for (const zone of deliveryZones) {
      if (zone.zone_type === 'postal_code_range') {
        if (postalCode >= zone.postal_code_start && postalCode <= zone.postal_code_end) {
          return { valid: true, zone, deliveryFee: zone.delivery_fee_override || settings.default_delivery_fee };
        }
      } else if (zone.zone_type === 'postal_code_list') {
        if (zone.postal_codes.includes(postalCode)) {
          return { valid: true, zone, deliveryFee: zone.delivery_fee_override || settings.default_delivery_fee };
        }
      }
    }
    return { valid: false, message: 'המיקוד שהוזן אינו באזור החלוקה שלנו' };
  }

  if (validationMethod === 'radius') {
    // Calculate distance from business location
    const distance = calculateDistance(
      settings.business_coordinates,
      coordinates
    );
    const maxRadius = settings.default_delivery_radius_km;

    if (distance <= maxRadius) {
      return { valid: true, distance, deliveryFee: settings.default_delivery_fee };
    }
    return { valid: false, message: `הכתובת נמצאת מחוץ לטווח החלוקה (${distance.toFixed(1)} ק"מ, מקסימום ${maxRadius} ק"מ)` };
  }

  return { valid: false, message: 'לא ניתן לאמת את הכתובת' };
}

// Haversine formula for distance calculation
function calculateDistance(coords1, coords2) {
  const R = 6371; // Earth radius in km
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
```

---

## 7. API Routes

### POST `/api/orders`
Create order → Calculate totals → Generate order number → Create PayPlus payment → Return payment URL

### POST `/api/payment/ipn`
PayPlus callback → Verify signature → Update order status → Send confirmation email

### POST `/api/discount/validate`
Validate discount code → Return discount amount or error

### POST `/api/delivery/validate`
Validate delivery address → Check postal code or calculate distance → Return validation result + delivery fee

### POST `/api/products/import`
Parse CSV/Excel → Validate → Batch insert/update products

### GET `/api/products/export`
Query products → Generate Excel/CSV → Return file download

---

## 8. PayPlus Integration

**Create Payment:**
```
POST https://restapi.payplus.co.il/api/v1.0/Payments/Authorization
Body: { amount, customer_name, email, items[], refURL_success, refURL_failure }
Response: { payment_page_link }
```

**IPN Callback:**
- PayPlus sends POST to `/api/payment/ipn`
- Verify signature, update order, send confirmation
- PayPlus auto-generates and sends invoice (חשבונית מס)

**Sandbox**: Use `restapidev.payplus.co.il` for testing

---

## 9. File Structure

```
/app
  /(public)
    page.tsx              # Homepage (hero + catalog)
    about/page.tsx        # About page
    terms/page.tsx        # Terms (generate later)
    privacy/page.tsx      # Privacy (generate later)
    platter/[id]/page.tsx # Product detail
    cart/page.tsx
    checkout/
      location/page.tsx   # Delivery area validation
      delivery/page.tsx   # Date selection
      details/page.tsx    # Customer form + discount
      payment/page.tsx    # PayPlus redirect
    order/[orderNumber]/page.tsx
    track/[orderNumber]/page.tsx
  /admin
    page.tsx              # Orders list
    orders/[id]/page.tsx  # Order detail
    products/
      page.tsx            # Products list
      new/page.tsx        # Add product
      [id]/edit/page.tsx  # Edit product
    categories/page.tsx
    discount-codes/page.tsx
    blocked-dates/page.tsx
    delivery-zones/page.tsx # Delivery area configuration
    settings/page.tsx
  /api
    orders/route.ts
    payment/ipn/route.ts
    discount/validate/route.ts
    delivery/validate/route.ts
    products/
      import/route.ts
      export/route.ts

/components
  /public
    HeroSection.tsx, Header.tsx, Footer.tsx, ProductCard.tsx,
    DeliveryCalendar.tsx, DiscountCodeInput.tsx, AddressInput.tsx,
    DeliveryAreaValidator.tsx
  /admin
    OrdersTable.tsx, ProductForm.tsx, ProductImport.tsx,
    ImageUploader.tsx, ImageGallery.tsx, DeliveryZoneForm.tsx

/lib
  /supabase: client.ts, server.ts, storage.ts, middleware.ts
  /utils: date-calculator.ts, discount-calculator.ts, delivery-validator.ts,
          csv-parser.ts, csv-generator.ts, product-validator.ts

/prisma
  schema.prisma
  
Procfile               # web: npm run start
next.config.js         # output: 'standalone', Supabase image domains
```

---

## 10. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# PayPlus
PAYPLUS_API_KEY=...
PAYPLUS_SECRET_KEY=...
PAYPLUS_TERMINAL_UID=...
PAYPLUS_ENV=sandbox|production
PAYPLUS_IPN_URL=https://breadstationakko.com/api/payment/ipn

# Site
NEXT_PUBLIC_SITE_URL=https://breadstationakko.com
NEXT_PUBLIC_SITE_NAME=Bread Station Akko

# Optional
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...  # For address autocomplete and geocoding
EMAIL_API_KEY=...
EMAIL_FROM=orders@breadstationakko.com
SMS_API_KEY=...
```

Set in Heroku: `heroku config:set KEY=value` or via Dashboard → Settings → Config Vars

---

## 11. Deployment Guide

### Supabase Setup
1. Create project → Get URL and keys
2. Run migrations (create tables)
3. Set up RLS policies
4. Create storage bucket `products` (public read, admin write)
5. Create admin user
6. Seed categories and test data

### Heroku Setup
1. Install CLI: `npm install -g heroku`
2. Create app: `heroku create bread-station-akko`
3. Set Config Vars (all environment variables)
4. Push code: `git push heroku main`
5. Run migrations: `heroku run npx prisma migrate deploy`
6. Open app: `heroku open`

**Procfile:**
```
web: npm run start
```

**package.json:**
```json
{
  "scripts": {
    "start": "next start -p $PORT",
    "build": "next build",
    "postinstall": "prisma generate"
  },
  "engines": {
    "node": "18.x"
  }
}
```

**next.config.js:**
```javascript
module.exports = {
  output: 'standalone',
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '*.supabase.co',
      pathname: '/storage/v1/object/public/products/**',
    }],
  },
}
```

### PayPlus Setup
1. Register account → Get credentials
2. Configure IPN URL in dashboard
3. Test in sandbox
4. Switch to production credentials

### Pre-Launch Checklist
- [ ] Generate Terms & Conditions content
- [ ] Generate Privacy Policy content
- [ ] Test full order flow (end-to-end)
- [ ] Verify PayPlus invoices generate correctly
- [ ] Test discount codes
- [ ] Test CSV import/export
- [ ] Mobile testing
- [ ] Load hero images
- [ ] Set up email notifications

---

## 12. Content Guidelines

### Hero Section
- **Images**: 1920x800px, under 500KB, 3-5 carousel images
- **Headline**: Under 60 chars, e.g., "מגשי קייטרינג מעכו שיעשו את האירוע שלכם מושלם"
- **Subheadline**: 2-3 lines expanding on value

### About Page
- Start with emotion (why you started)
- Show passion and build credibility
- Make it personal (anecdotes)
- End with commitment to customers

### Product Photography
- **Specs**: 1200x1200px min, JPG/PNG/WebP, max 5MB
- **Lighting**: Natural daylight, diffused
- **Composition**: 45° angle or flat lay, fill frame
- **Styling**: Fresh ingredients, neat arrangement
- **Consistency**: Same background/lighting across catalog

### Product Descriptions
- **Name**: Clear, descriptive, under 60 chars
- **Short**: 1-2 sentences for catalog cards
- **Full**: 2-4 paragraphs (overview → details → serving → CTA)
- **Ingredients**: Comma-separated, specific

### CSV Template Format
```
Name (Hebrew)*,Short Description,Full Description,Price (₪)*,Category*,Prep Time (Days)*,Serving Size,Ingredients,Allergens,Notes,Active (Yes/No),Featured (Yes/No)
```

---

## 13. Development Phases

### Phase 1: MVP (Weeks 1-3)
- Next.js setup with Tailwind RTL
- Supabase schema, RLS, storage
- Public: Homepage (hero + catalog), product pages, cart, checkout flow (location validation → date selection → details → payment), order confirmation
- Delivery area validation system (postal code or radius-based)
- Discount code system
- Admin: Login, orders management, product CRUD, CSV import/export, discount codes, delivery zones
- PayPlus sandbox integration
- Email confirmations

### Phase 2: Enhancement (Weeks 4-5)
- About page, Terms, Privacy (generate content)
- Blocked dates, categories, settings pages
- Order tracking page
- PayPlus production
- Mobile optimization
- Image optimization
- Search/filters
- Google Maps API integration for address autocomplete (optional)
- SMS notifications (optional)

### Phase 3: Post-Launch (Week 6+)
- Analytics dashboard
- SEO optimization
- Performance tuning (Heroku dyno sizing)
- A/B testing
- Customer feedback
- Related products

---

## 14. Key Considerations

### RTL Support
- `dir="rtl"` in HTML
- Tailwind RTL plugin
- Test all UI components
- Right-align forms and text

### Mobile-First
- Touch-friendly buttons (44x44px min)
- Simplified navigation
- Sticky cart button
- Easy date picker

### Performance
- Next.js Image optimization (WebP)
- Lazy loading
- Server Components where possible
- CDN for static assets (optional)

### Security
- Input validation (client + server)
- Prisma prevents SQL injection
- CSRF protection
- Rate limiting on API routes
- PayPlus handles PCI compliance

### SEO
- Hebrew meta tags
- LocalBusiness schema (About page)
- Sitemap.xml
- Open Graph tags
- Google Business Profile

### Heroku Considerations
- Start with Hobby dyno ($7/month)
- Scale to Standard for production
- Monitor memory usage (avoid R14 errors)
- Add Redis for caching if needed (1000+ orders/month)
- Use `heroku logs --tail` for debugging

### Legal Compliance
- Generate Terms & Privacy before launch
- Israeli Contract Law
- Privacy Protection Law, 1981
- Consumer Protection Law
- GDPR (if EU customers)

---

## 15. Testing Strategy

**Manual Testing:**
- Full order flow (multiple devices)
- Product management (add, edit, delete, images)
- CSV import (10, 100, 500 rows)
- Discount codes (valid, expired, limits)
- Payment success/failure
- Date calculation edge cases
- Email/invoice delivery

**User Acceptance:**
- Non-technical users test ordering
- Hebrew UX feedback
- Actual products and prices

---

## 16. Support & Maintenance

**Daily/Weekly:**
- Monitor orders
- Update products (seasonal)
- Manage discount codes
- Check Heroku logs
- Respond to customer inquiries

**Monthly:**
- Export catalog backup (Excel)
- Update dependencies
- Review analytics
- Database backup
- Security patches

**Troubleshooting:**
- App crashes: Check `heroku logs --tail`, verify Procfile
- Slow performance: Upgrade dyno, add caching, optimize queries
- Memory issues: Check image processing, reduce bundle size
- DB connection: Verify Supabase credentials, check Prisma config

---

## 17. Future Enhancements

**Customer:**
- User accounts (order history)
- Repeat last order
- Reviews and ratings
- Loyalty program
- Gift certificates

**Admin:**
- Staff roles and permissions
- WhatsApp notifications
- Accounting integration
- Customer segmentation
- Advanced discount rules (buy X get Y, category-specific)

**Technical:**
- Mobile app (React Native)
- Multi-language support
- AI product recommendations
- Advanced analytics

---

**End of Specification**

This document is the complete blueprint for Bread Station Akko's catering platform. Update as requirements evolve.