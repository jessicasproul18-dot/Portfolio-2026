import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/componentsAMP/Sections/Hero/PageHeader';
import { AboutStorySection } from '@/componentsAMP/Sections/Content/AboutStorySection';
import { Button } from '@/components/UI/Button';
import { getSiteConfig } from '@/lib/siteConfig';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: `About | ${siteConfig.site}`,
    description:
      'Product designer Jessica Sproul on UX, graphic design, web development, and the path from Seattle markets to Portland.',
  };
}

export default async function AboutPage() {
  return (
    <main>
      <PageHeader
        title="About"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <AboutStorySection />

      <section className="bg-white px-4 pb-[6rem] md:px-8 lg:px-12">
        <div className="container mx-auto">
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
