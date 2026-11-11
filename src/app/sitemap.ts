import { MetadataRoute } from 'next';
import { initialProducts } from '@/lib/data/seed';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vishalapplestore.com';

  const productUrls = initialProducts.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...productUrls,
  ];
}
