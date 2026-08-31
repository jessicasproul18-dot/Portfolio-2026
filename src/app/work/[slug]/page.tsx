import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/componentsAMP/Sections/Hero/PageHeader';
import { ProjectCaseStudySection } from '@/componentsAMP/Sections/Content/ProjectCaseStudySection';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import { getSiteConfig } from '@/lib/siteConfig';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () =>
  getProjectSlugs().map((slug) => ({ slug }));

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const siteConfig = await getSiteConfig();

  if (!project) {
    return {
      title: `Project | ${siteConfig.site}`,
    };
  }

  return {
    title: `${project.title} | ${siteConfig.site}`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <PageHeader
        title={project.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/#work' },
          { label: project.title },
        ]}
      />

      <ProjectCaseStudySection project={project} />
    </main>
  );
}
