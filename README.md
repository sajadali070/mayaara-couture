# Mayaara Couture — Luxury Handloom & Bridal Boutique Website

A production-ready, mobile-first e-commerce catalog website for a high-end South Indian dress boutique featuring **WhatsApp-Driven Direct Ordering**, **English / Tamil Bilingual Support**, and luxury fashion aesthetics.

Designed and built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Zustand. Deployable to Vercel with zero extra configuration.

---

## 🌟 Key Features

1. **Boutique Fashion Design & Aesthetic**:
   - Palette: Deep Maroon (`#6B1E2E`), Royal Wine (`#4A121E`), Warm Gold (`#C9A24B`), and Ivory (`#FAF7F2`).
   - Typography: `Playfair Display` serif for editorial headings + `Inter` for clean high-contrast legibility.
   - Glassmorphic sticky header, elegant announcement banner, subtle hover animations, and zero-layout-shift image handling.

2. **WhatsApp Order & Concierge Integration**:
   - **Single Item Ordering (PDP)**: 1-click button generates a pre-filled WhatsApp message with product name, SKU, selected size, selected color, price, and canonical product link.
   - **Cart Bundle Checkout**: Customers add multiple pieces to their bag and click *"Checkout via WhatsApp"*, generating an itemized order summary with total price, items count, and delivery prompts.
   - **Concierge Consultation**: Form on `/contact` generates pre-filled bridal trousseau and tailoring inquiries.

3. **Bilingual Localization (English & தமிழ்)**:
   - Instant header and mobile drawer toggle between **English** and **Tamil (`தமிழ்`)**.
   - Translates navigation menus, announcement promotions, filters, product details, and cart labels without external heavy dependencies or hydration lag.

4. **Product Catalog & Dynamic Detail Pages**:
   - **Multi-Facet Filtering**: Filter in real time by category (Sarees, Kurtis, Indo-Western, Lehengas), size (XS to XXL, Free Size), color swatches, price range, and stock availability.
   - **Live Search**: Instant keyword search across titles, fabrics, tags, and SKUs with modal preview.
   - **Product Detail (PDP)**: Interactive multi-image gallery with zoom lens, thumbnail selector, size chart modal with inches/cm measurements, fabric/care accordion, and related products.

5. **Client-Side State with Persistence**:
   - Shopping bag and wishlist powered by **Zustand** with SSR-safe `localStorage` synchronization.
   - Real-time cart drawer with quantity steppers, item removal, and a **Free Shipping Milestone Progress Bar**.

6. **SEO & Structured Data (JSON-LD)**:
   - Dynamic OpenGraph and Twitter meta cards per product page.
   - Schema.org `ClothingStore` / `Organization` and `Product` JSON-LD schemas.
   - Dynamic `sitemap.xml` (`app/sitemap.ts`) and `robots.txt` (`app/robots.ts`).

---

## 📁 Project Architecture & Folder Structure

```text
fashion-site/
├── app/
│   ├── globals.css                # Tailwind base styles, custom luxury scrollbar & fonts
│   ├── layout.tsx                 # Root layout with SEO metadata & Organization JSON-LD
│   ├── page.tsx                   # High-fashion Home page
│   ├── not-found.tsx              # Custom boutique 404 page
│   ├── sitemap.ts                 # Dynamic XML sitemap generator
│   ├── robots.ts                  # Robots.txt configuration
│   ├── shop/
│   │   ├── page.tsx               # Catalog page with Suspense wrapper
│   │   └── [slug]/
│   │       └── page.tsx           # Dynamic PDP with SSG generateStaticParams & Product JSON-LD
│   ├── cart/page.tsx              # Full cart review page with WhatsApp checkout
│   ├── wishlist/page.tsx          # Saved items page with move-to-bag & direct WhatsApp order
│   ├── lookbook/page.tsx          # Editorial fashion anthology chapters
│   ├── about/page.tsx             # Brand heritage, weaver guild, and studio atelier
│   ├── contact/page.tsx           # Address, hours, embedded Google Map, & WhatsApp inquiry form
│   ├── size-guide/page.tsx        # Measurement charts in inches & cm
│   ├── shipping-returns/page.tsx  # Express shipping timelines & 7-day exchange policy
│   └── privacy-policy/page.tsx    # Customer privacy & data terms
├── components/
│   ├── common/
│   │   ├── ProductCard.tsx        # Reusable product card with badges, hover swap, & quick CTAs
│   │   ├── SectionHeading.tsx     # Editorial section title with gold ornaments
│   │   ├── SearchModal.tsx        # Live search modal overlay
│   │   ├── SizeChartModal.tsx     # Measurement guide modal with units toggle
│   │   └── FloatingWhatsApp.tsx   # Floating concierge button with pulse animation
│   ├── layout/
│   │   ├── AnnouncementBar.tsx    # Top promotional bar with language switcher
│   │   ├── Header.tsx             # Sticky glassmorphic header with search, cart & wishlist counters
│   │   ├── MobileNavDrawer.tsx    # Slide-in mobile drawer with category drill-down
│   │   ├── Footer.tsx             # Multi-column luxury footer
│   │   └── ClientLayoutShell.tsx  # Interactive shell wrapper
│   ├── home/
│   │   ├── HeroSection.tsx        # Full-width editorial hero banner
│   │   ├── BrandPillars.tsx       # 4 boutique trust pillars
│   │   ├── FeaturedCategories.tsx # Curated category grid with hover zoom
│   │   ├── NewArrivalsCarousel.tsx# Fresh loom additions
│   │   ├── FestivalSpotlight.tsx  # Bridal privilege feature banner
│   │   ├── BestSellersSection.tsx # Category-filtered best sellers showcase
│   │   ├── LookbookBanner.tsx     # Editorial lookbook teaser
│   │   ├── TestimonialsSection.tsx# Verified patron reviews & star ratings
│   │   └── InstagramGallery.tsx   # Visual Instagram styling feed
│   ├── shop/
│   │   └── ShopCatalog.tsx        # Catalog filters, search, sorting, and grid
│   └── product/
│       └── ProductDetailView.tsx  # PDP gallery zoom, size/color selectors, accordions
├── data/
│   └── products.json              # 16+ realistic sample garments across 4 categories
├── lib/
│   ├── products.ts                # Filtering, querying, sorting, and slug lookup helpers
│   ├── whatsapp.ts                # WhatsApp URL formatting and encoded message templates
│   ├── i18n/
│   │   ├── translations.ts        # English and Tamil UI dictionary
│   │   └── context.tsx            # Hydration-safe React Context & useTranslation hook
│   └── store/
│       ├── useCartStore.ts        # Zustand cart store with safe storage persistence
│       └── useWishlistStore.ts    # Zustand wishlist store
├── types/
│   └── index.ts                   # Full TypeScript interfaces for Product, Cart, FilterState
├── site.config.ts                 # Central boutique identity, address, phone, and social links
├── .env.example                   # Environment variable blueprint
└── package.json                   # Dependencies and npm scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17+ or v20+ recommended (verified on Node.js v26.13.1 LTS)
- **npm** or **pnpm**

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/mayaara-couture.git
cd mayaara-couture
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your parameters:
```env
# Boutique WhatsApp phone number (country code + digits, no '+' or spaces)
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210

# Website URL for canonical links and Open Graph previews
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Boutique Name
NEXT_PUBLIC_SHOP_NAME="Mayaara Couture"
```

### 3. Development Server
Start the Next.js dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Linting
Test building and type-checking locally:
```bash
# Run ESLint
npm run lint

# Compile optimized static and server pages
npm run build

# Run production server
npm start
```

---

## 🛍️ How to Add or Edit Products

All product data is stored in [`data/products.json`](data/products.json). To add a new garment, simply append an object matching the schema below:

```json
{
  "id": "mc-sar-005",
  "slug": "kanchipuram-magenta-korvai-silk-saree",
  "name": "Kanchipuram Magenta Korvai Pure Silk Saree",
  "nameTa": "காஞ்சிபுரம் மெஜந்தா கோர்வை தூய பட்டு புடவை",
  "category": "sarees",
  "price": 17500,
  "discountPrice": 13999,
  "sizes": ["Free Size"],
  "colors": [
    { "name": "Magenta & Mustard", "nameTa": "மெஜந்தா & மஞ்சள்", "hex": "#8B1E4A" }
  ],
  "images": [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
  ],
  "description": "Authentic Korvai handloom pure silk saree with pure zari temple borders.",
  "descriptionTa": "கோவில் ஜரி பார்டர்களுடன் தூய கைத்தறி பட்டு புடவை.",
  "fabric": "100% Pure Kanchipuram Silk with Silk Mark Certification",
  "careInstructions": [
    "Strictly dry clean only",
    "Store in pure muslin fabric"
  ],
  "tags": ["Pure Silk", "Kanchipuram", "Bridal", "New"],
  "isNewArrival": true,
  "isBestSeller": false,
  "inStock": true,
  "sku": "MC-SAR-005",
  "rating": 4.9,
  "reviewCount": 14
}
```

> **Categories Supported**: `"sarees"`, `"kurtis"`, `"indo-western"`, `"lehengas"`.
> **Sizes Supported**: `"XS"`, `"S"`, `"M"`, `"L"`, `"XL"`, `"XXL"`, `"Free Size"`.

---

## 🎨 Design Tokens & Customization

All brand identity settings are centralized in [`site.config.ts`](site.config.ts). You can update the store name, street address, operating hours, phone numbers, and social links in one file.

Color tokens defined in [`tailwind.config.ts`](tailwind.config.ts):
- `maroon-800: #6B1E2E` (Primary brand accent)
- `maroon-900: #4A121E` (Dark headers and hero banners)
- `gold-500: #C9A24B` (Warm luxury gold)
- `ivory-50: #FAF7F2` (Warm background cream)
- `charcoal-800: #222222` (High-contrast typography)

---

## ☁️ Deployment to Vercel

1. Push your code to GitHub / GitLab / Bitbucket.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and select this repository.
3. Add the environment variable:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Your boutique WhatsApp number (e.g. `919876543210`)
   - `NEXT_PUBLIC_SITE_URL`: Your production domain (e.g. `https://mayaaracouture.com`)
4. Click **Deploy**. Vercel will automatically build all static pages and edge-cache assets with zero extra configuration.

---

## 📄 License & Credits
- Built with pride for luxury artisanal boutiques.
- Open-source under the MIT License.
