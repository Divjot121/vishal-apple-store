import { Metadata } from 'next';
import { initialProducts } from '@/lib/data/seed';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return initialProducts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = initialProducts.find((p) => p.slug.toLowerCase() === slug.toLowerCase());

  if (!product) {
    return {
      title: 'Device Not Found | Vishal Apple Store',
    };
  }

  return {
    title: `${product.name} (${product.condition}) | Vishal Apple Store`,
    description: `${product.name} in ${product.condition} condition. ${product.tagline} Tested with 40-point diagnostic check and store warranty.`,
    openGraph: {
      title: `${product.name} | Vishal Apple Store Delhi`,
      description: product.description,
      images: [
        {
          url: product.images[0] || '/brand/horizontal.jpeg',
          alt: product.name,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
