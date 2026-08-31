import { HomeScrollStage } from '@/componentsAMP/Sections/Home/HomeScrollStage';
import { getSiteConfig } from '@/lib/siteConfig';

export default async function Home() {
  const siteConfig = await getSiteConfig();

  return <HomeScrollStage siteConfig={siteConfig} />;
}
