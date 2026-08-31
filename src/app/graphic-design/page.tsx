import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/componentsAMP/Sections/Hero/PageHeader';
import { GraphicDesignGallerySection } from '@/componentsAMP/Sections/Gallery/GraphicDesignGallerySection';
import { Button } from '@/components/UI/Button';
import { getSiteConfig } from '@/lib/siteConfig';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: `Graphic design | ${siteConfig.site}`,
    description: 'Graphic design work by Jessica Sproul.',
  };
}

export default async function GraphicDesignPage() {
  return (
    <main>
      <PageHeader
        title="Graphic design"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Graphic design' }]}
      />
      <section className="bg-white px-4 pt-[3rem] md:px-8 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <p className="max-w-2xl text-base font-light leading-relaxed text-zinc-800 md:text-lg">
            Logo work, brand design, and other graphic design projects I’ve done.
          </p>
        </div>
      </section>
      <GraphicDesignGallerySection />
      <section className="bg-white px-4 pb-[6rem] md:px-8 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-start gap-3 border-t border-zinc-200 pt-[3rem] md:gap-4">
            <Button variant="primaryOutline" size="sm" asChild>
              <Link href="/">Back to homepage</Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link href="/#contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
