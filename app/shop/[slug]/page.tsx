import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, getRelatedProducts } from '@/lib/products';
import { siteConfig } from '@/site.config';
import ProductDetailView from '@/components/product/ProductDetailView';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Garment Not Found',
    };
  }

  const effectivePrice = product.discountPrice || product.price;

  return {
    title: `${product.name} | ${siteConfig.name}`,
    description: product.description.slice(0, 160),
    keywords: [product.name, product.category, product.fabric, ...product.tags],
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.description.slice(0, 160),
      url: `${siteConfig.url}/shop/${product.slug}`,
      images: [
        {
          url: product.images[0],
          width: 1000,
          height: 1333,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description.slice(0, 160),
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, product.category, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.url}/shop/${product.slug}`,
      priceCurrency: 'INR',
      price: product.discountPrice || product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
    aggregateRating: product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 1,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailView product={product} relatedProducts={related} />
    </>
  );
}
