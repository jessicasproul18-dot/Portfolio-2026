'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Homepage stage composing about-as-hero, featured work, and contact
 * BEST FOR: Portfolio landing page
 * VISUAL STYLE: Modern, minimal, and clean
 * LAYOUT: Stacked sections with 6rem vertical padding each
 * CONTENT ELEMENTS: About with static headshot as hero, alternating featured work, LinkedIn contact
 * CONVERSION ROLE: Guide from first impression through work into contact
 * IDEAL POSITION: Root of the homepage
 * NOTES / MODIFIERS: About section opens the page in place of a separate hero; static square portrait; each block uses py-[6rem] (hero uses nav clearance + matched vertical padding)
 */

import { TwoColumnImageRightSection } from '@/componentsAMP/Sections/Content/TwoColumnImageRightSection';
import { FeaturedWorkAlternatingSection } from '@/componentsAMP/Sections/Gallery/FeaturedWorkAlternatingSection';
import { FullBleedParallaxTwoColumnContactForm } from '@/componentsAMP/Sections/Contact/FullBleedParallaxTwoColumnContactForm';
import type { SiteConfig } from '@/lib/siteConfig';

const HEADSHOT_SRC = '/images/headshot.png';
const HEADSHOT_ALT = 'Jessica Sproul headshot';

type HomeScrollStageProps = {
  siteConfig: SiteConfig;
};

export function HomeScrollStage({ siteConfig }: HomeScrollStageProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <TwoColumnImageRightSection
        headingLine1="Hi, I'm Jess."
        headingLine2="A product designer with 3 years of design experience, from graphic design and branding to UX and front-end development."
        imageSrc={HEADSHOT_SRC}
        imageAlt={HEADSHOT_ALT}
        interactive={false}
        revealCtaLabel="Contact"
        revealCtaHref="#contact"
        revealSecondaryCtaLabel="See portfolio"
        revealSecondaryCtaHref="#work"
        className="pt-[calc(80px+3rem)] pb-[3rem] md:pt-[11rem] md:pb-[6rem]"
      />

      <FeaturedWorkAlternatingSection />

      <FullBleedParallaxTwoColumnContactForm
        siteConfig={{
          email: siteConfig.email,
          phone: siteConfig.phone,
          address: siteConfig.address,
          linkedin: siteConfig.linkedin,
        }}
      />
    </div>
  );
}
