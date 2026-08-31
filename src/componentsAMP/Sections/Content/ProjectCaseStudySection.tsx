/**
 * **CURSOR INFO**
 * SECTION TYPE: Project case study detail
 * BEST FOR: Individual UX / product project pages
 * VISUAL STYLE: Modern, minimal, and clean
 * LAYOUT: Overview, problem, process, solution visuals, motion, outcomes
 * CONTENT ELEMENTS: Short narrative, role/tools, image grids with captions, videos, outcomes, CTA
 * CONVERSION ROLE: Explain selected work clearly for recruiters and invite conversation
 * IDEAL POSITION: Main content on project detail pages after PageHeader
 * NOTES / MODIFIERS: Recruiter-friendly structure; Problem and Process precede final visuals; optional section jump-nav under cover; preserveImageAspect shows full images without cropping
 */

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import { CaseStudyVideo } from '@/componentsAMP/Sections/Content/CaseStudyVideo';
import { CaseStudyZoomImage } from '@/componentsAMP/Sections/Content/CaseStudyZoomImage';
import type { Project, ProjectMedia, ProjectVideo } from '@/lib/projects';

type ProjectCaseStudySectionProps = {
  project: Project;
};

type CaseStudyImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  preserveAspect: boolean;
  sizes: string;
  frameClassName?: string;
  clipLeft?: boolean;
  frameBackgroundClassName?: string;
  fillFrame?: boolean;
  objectFitClassName?: string;
  aspectRatio?: string;
  allowZoom?: boolean;
};

const CaseStudyImage = (props: CaseStudyImageProps) => <CaseStudyZoomImage {...props} />;

const MediaGrid = ({
  items,
  preserveAspect,
  columnsClassName = 'md:grid-cols-2',
}: {
  items: ProjectMedia[];
  preserveAspect: boolean;
  columnsClassName?: string;
}) => {
  const isTwoCol = columnsClassName.includes('grid-cols-2');
  const oddLastSpansFull = isTwoCol && items.length % 2 === 1;

  return (
    <div className={['grid items-start gap-8', columnsClassName, 'md:gap-12 lg:gap-16'].join(' ')}>
      {items.map((item, index) => {
        const isLastOdd = oddLastSpansFull && index === items.length - 1;

        return (
          <figure
            key={`${item.src}-${item.alt}`}
            className={['space-y-3', isLastOdd ? 'md:col-span-2' : ''].filter(Boolean).join(' ')}
          >
            <CaseStudyImage
              src={item.src}
              alt={item.alt}
              preserveAspect={preserveAspect}
              sizes={
                isLastOdd
                  ? '(min-width: 768px) 100vw, 100vw'
                  : '(min-width: 768px) 50vw, 100vw'
              }
            />
            {item.caption ? (
              <figcaption className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
};

const VideoGrid = ({ videos }: { videos: ProjectVideo[] }) => (
  <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
    {videos.map((video) => (
      <CaseStudyVideo key={video.src} video={video} />
    ))}
  </div>
);

const SectionHeading = ({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) => (
  <h2
    id={id}
    className={[
      'text-2xl font-normal tracking-tight text-zinc-900 md:text-3xl lg:text-4xl',
      id ? 'scroll-mt-28' : '',
    ].join(' ')}
  >
    {children}
  </h2>
);

type SectionNavItem = {
  id: string;
  label: string;
};

const sectionJumpLinkClassName =
  'inline-flex items-center rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700 transition hover:border-primary-400 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';

const CaseStudySectionNav = ({ items }: { items: SectionNavItem[] }) => {
  if (items.length < 2) return null;

  return (
    <nav aria-label="Case study sections" className="-mx-1">
      <ul className="flex flex-wrap gap-2 md:gap-3">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={sectionJumpLinkClassName}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const SectionHeadingWithNextNav = ({
  id,
  items,
  children,
}: {
  id: string;
  items: SectionNavItem[];
  children: ReactNode;
}) => {
  const currentIndex = items.findIndex((item) => item.id === id);
  const nextItems = currentIndex >= 0 ? items.slice(currentIndex + 1) : [];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
      <SectionHeading id={id}>{children}</SectionHeading>
      {nextItems.length > 0 ? (
        <nav aria-label={`Jump to sections after ${typeof children === 'string' ? children : 'this section'}`}>
          <ul className="flex flex-wrap justify-end gap-2 md:gap-3">
            {nextItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={sectionJumpLinkClassName}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
};

export function ProjectCaseStudySection({ project }: ProjectCaseStudySectionProps) {
  const preserveAspect = Boolean(project.preserveImageAspect);
  const hasFinalSite = Boolean(
    (project.finalSiteDesktopImages && project.finalSiteDesktopImages.length > 0) ||
      project.finalSiteMobileImage ||
      (project.solutionImages && project.solutionImages.length > 0),
  );
  const hasProcess = Boolean(
    project.process ||
      (project.processImages && project.processImages.length > 0) ||
      (project.processSideImages && project.processSideImages.length > 0),
  );
  const isStructuredCaseStudy = Boolean(
    project.problem ||
      project.process ||
      project.approach ||
      (project.beforeImages && project.beforeImages.length > 0) ||
      hasFinalSite ||
      (project.videos && project.videos.length > 0),
  );

  const sectionNavItems: SectionNavItem[] = [
    { id: 'project-impact-heading', label: 'Impact' },
    { id: 'project-overview-heading', label: 'Overview' },
  ];

  if (project.problem) {
    sectionNavItems.push({ id: 'project-problem-heading', label: 'Problem' });
  }
  if (hasProcess) {
    sectionNavItems.push({ id: 'project-process-heading', label: 'Process' });
  }
  if (hasFinalSite) {
    sectionNavItems.push({
      id: 'project-final-heading',
      label: project.finalWorkHeading ?? 'Final site',
    });
  }
  if (project.videos && project.videos.length > 0) {
    sectionNavItems.push({
      id: 'project-videos-heading',
      label: project.videosHeading ?? 'Motion',
    });
  }
  if (!isStructuredCaseStudy && project.sections) {
    for (const section of project.sections) {
      sectionNavItems.push({
        id: `project-section-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
        label: section.title,
      });
    }
  }
  if (project.metrics && project.metrics.length > 0) {
    sectionNavItems.push({ id: 'project-results-heading', label: 'Results' });
  }
  if (project.gallery.length > 0) {
    sectionNavItems.push({ id: 'project-gallery-heading', label: 'More visuals' });
  }

  const showSectionNav = !project.hideSectionNav && sectionNavItems.length >= 2;

  return (
    <section
      className="bg-white py-[6rem] px-4 md:px-8 lg:px-12"
      aria-labelledby="project-impact-heading"
    >
      <div className="container mx-auto max-w-[1280px] space-y-24">
        <div className="space-y-12">
          {project.coverAspect ? (
            <CaseStudyImage
              src={project.imageSrc}
              alt={project.imageAlt}
              priority
              preserveAspect={false}
              fillFrame
              allowZoom={false}
              sizes="(min-width: 1280px) 1280px, 100vw"
              frameClassName=""
              frameBackgroundClassName={project.coverBackgroundClass ?? 'bg-zinc-950'}
              objectFitClassName="object-contain object-center"
              aspectRatio={project.coverAspect.replace('/', ' / ')}
            />
          ) : (
            <CaseStudyImage
              src={project.imageSrc}
              alt={project.imageAlt}
              priority
              preserveAspect={preserveAspect}
              allowZoom={false}
              sizes="(min-width: 1280px) 1280px, 100vw"
              frameClassName={preserveAspect ? '' : 'aspect-[16/9]'}
            />
          )}

          {showSectionNav ? <CaseStudySectionNav items={sectionNavItems} /> : null}

          <div className="space-y-12">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start">
              <aside className="space-y-8 rounded-2xl border border-zinc-200 p-6 md:p-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
                    Role
                  </h3>
                    <p className="mt-5 text-base font-light text-zinc-800 md:text-lg">{project.role}</p>
                </div>

                {project.year ? (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
                      Year
                    </h3>
                    <p className="mt-5 text-base font-light text-zinc-800 md:text-lg">{project.year}</p>
                  </div>
                ) : null}

                {project.tools && project.tools.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
                      Tools
                    </h3>
                    <p className="mt-5 text-base font-light text-zinc-800 md:text-lg">
                      {project.tools.join(', ')}
                    </p>
                  </div>
                ) : null}

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
                    Focus
                  </h3>
                  <ul className="mt-5 space-y-2 text-base font-light text-zinc-800 md:text-lg">
                    {project.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className="space-y-5">
                <SectionHeading id="project-impact-heading">Impact</SectionHeading>
                <ul className="space-y-4">
                  {project.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="border-t border-zinc-200 pt-4 text-base font-light leading-relaxed text-zinc-800 md:text-lg"
                    >
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeading id="project-overview-heading">Overview</SectionHeading>
              <p className="text-base font-light leading-relaxed text-zinc-800 md:text-lg">
                {project.description}
              </p>
              {!project.hideOverviewSummary ? (
                <p className="text-base font-light leading-relaxed text-zinc-800 md:text-lg">
                  {project.summary}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {project.problem ? (
          <div className="space-y-8">
            <div className="space-y-4">
              <SectionHeadingWithNextNav id="project-problem-heading" items={sectionNavItems}>
                Problem
              </SectionHeadingWithNextNav>
              <p className="text-base font-light leading-relaxed text-zinc-800 md:text-lg">
                {project.problem}
              </p>
            </div>
            {project.beforeImages && project.beforeImages.length > 0 ? (
              <MediaGrid
                items={project.beforeImages}
                preserveAspect={preserveAspect}
                columnsClassName="md:grid-cols-3"
              />
            ) : null}
          </div>
        ) : null}

        {project.process ||
        (project.processImages && project.processImages.length > 0) ||
        (project.processSideImages && project.processSideImages.length > 0) ? (
          <div className="space-y-8">
            <div className="space-y-4">
              <SectionHeadingWithNextNav id="project-process-heading" items={sectionNavItems}>
                Process
              </SectionHeadingWithNextNav>
              {project.process ? (
                <p className="text-base font-light leading-relaxed text-zinc-800 md:text-lg">
                  {project.process}
                </p>
              ) : null}
            </div>

            {project.processSideImages && project.processSideImages.length > 0 ? (
              <div className="space-y-8">
                {project.processSideMatchHeight ? (
                  <div className="grid gap-8 md:grid-cols-2 md:items-stretch md:gap-12 lg:gap-16">
                    <div className="flex flex-col gap-8">
                      {(project.processImages ?? []).map((item) => (
                        <figure key={`${item.src}-${item.alt}`} className="space-y-3">
                          <CaseStudyImage
                            src={item.src}
                            alt={item.alt}
                            preserveAspect={preserveAspect}
                            sizes="(min-width: 768px) 50vw, 100vw"
                          />
                          {item.caption ? (
                            <figcaption className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
                              {item.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>

                    <div className="relative min-h-[24rem] md:h-full md:min-h-0">
                      <div className="flex h-full flex-col gap-4 md:absolute md:inset-0 md:gap-5 lg:gap-6">
                        {project.processSideImages.map((item) => (
                          <figure
                            key={`${item.src}-${item.alt}`}
                            className="flex min-h-0 flex-1 flex-col space-y-2"
                          >
                            <div className="min-h-0 w-full flex-1">
                              <CaseStudyImage
                                src={item.src}
                                alt={item.alt}
                                preserveAspect={false}
                                fillFrame
                                sizes="(min-width: 768px) 50vw, 100vw"
                                frameClassName="h-full min-h-[10rem]"
                                frameBackgroundClassName="bg-white"
                                objectFitClassName="object-contain object-top"
                              />
                            </div>
                            {item.caption ? (
                              <figcaption className="shrink-0 text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
                                {item.caption}
                              </figcaption>
                            ) : null}
                          </figure>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                    <div className="flex flex-col gap-8">
                      {(project.processImages ?? []).map((item) => (
                        <figure key={`${item.src}-${item.alt}`} className="space-y-3">
                          <CaseStudyImage
                            src={item.src}
                            alt={item.alt}
                            preserveAspect={preserveAspect}
                            sizes="(min-width: 768px) 50vw, 100vw"
                          />
                          {item.caption ? (
                            <figcaption className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
                              {item.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>

                    <div className="flex flex-col gap-8 md:sticky md:top-28">
                      {project.processSideImages.map((item) => (
                        <figure key={`${item.src}-${item.alt}`} className="space-y-3">
                          <CaseStudyImage
                            src={item.src}
                            alt={item.alt}
                            preserveAspect={preserveAspect}
                            sizes="(min-width: 768px) 50vw, 100vw"
                          />
                          {item.caption ? (
                            <figcaption className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
                              {item.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  </div>
                )}
                {project.solutionImages && project.solutionImages.length > 0 ? (
                  <MediaGrid
                    items={project.solutionImages}
                    preserveAspect={preserveAspect}
                    columnsClassName="md:grid-cols-1"
                  />
                ) : null}
              </div>
            ) : project.processImages && project.processImages.length > 0 ? (
              <MediaGrid
                items={project.processImages}
                preserveAspect={preserveAspect}
                columnsClassName="md:grid-cols-2"
              />
            ) : null}
          </div>
        ) : null}

        {hasFinalSite ? (
          <div className="space-y-8">
            <div className="space-y-4">
              <SectionHeadingWithNextNav id="project-final-heading" items={sectionNavItems}>
                {project.finalWorkHeading ?? 'Final site'}
              </SectionHeadingWithNextNav>
              {project.approach ? (
                <p className="text-base font-light leading-relaxed text-zinc-800 md:text-lg">
                  {project.approach}
                </p>
              ) : null}
            </div>

            {project.finalSiteDesktopImages && project.finalSiteDesktopImages.length > 0 ? (
              project.finalSiteColumns === 2 && !project.finalSiteMobileImage ? (
                <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                  {project.finalSiteDesktopImages.map((item) => {
                    if ('type' in item && item.type === 'pair') {
                      return (
                        <div
                          key={`${item.items[0].src}-${item.items[1].src}`}
                          className="grid gap-8 sm:grid-cols-2 md:col-span-2 md:gap-12 lg:gap-16"
                        >
                          {item.items.map((pairItem) => (
                            <figure key={`${pairItem.src}-${pairItem.alt}`} className="space-y-3">
                              <CaseStudyImage
                                src={pairItem.src}
                                alt={pairItem.alt}
                                preserveAspect={preserveAspect}
                                sizes="(min-width: 768px) 45vw, 100vw"
                                clipLeft={pairItem.clipLeft}
                              />
                              {pairItem.caption ? (
                                <figcaption className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
                                  {pairItem.caption}
                                </figcaption>
                              ) : null}
                            </figure>
                          ))}
                        </div>
                      );
                    }

                    const single = item as ProjectMedia;
                    return (
                      <figure key={`${single.src}-${single.alt}`} className="space-y-3">
                        <CaseStudyImage
                          src={single.src}
                          alt={single.alt}
                          preserveAspect={preserveAspect}
                          sizes="(min-width: 768px) 45vw, 100vw"
                          clipLeft={single.clipLeft}
                        />
                        {single.caption ? (
                          <figcaption className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
                            {single.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    );
                  })}
                </div>
              ) : (
              <div
                className={[
                  'grid items-start gap-8 md:gap-12 lg:gap-16',
                  project.finalSiteMobileImage ? 'md:grid-cols-[1.35fr_0.65fr]' : '',
                ].join(' ')}
              >
                <div className="space-y-8">
                  {project.finalSiteDesktopImages.map((item) => {
                    if ('type' in item && item.type === 'pair') {
                      return (
                        <div
                          key={`${item.items[0].src}-${item.items[1].src}`}
                          className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
                        >
                          {item.items.map((pairItem) => (
                            <figure key={`${pairItem.src}-${pairItem.alt}`} className="space-y-3">
                              <CaseStudyImage
                                src={pairItem.src}
                                alt={pairItem.alt}
                                preserveAspect={preserveAspect}
                                sizes="(min-width: 768px) 45vw, 100vw"
                                clipLeft={pairItem.clipLeft}
                              />
                              {pairItem.caption ? (
                                <figcaption className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
                                  {pairItem.caption}
                                </figcaption>
                              ) : null}
                            </figure>
                          ))}
                        </div>
                      );
                    }

                    const single = item as ProjectMedia;
                    return (
                      <figure key={`${single.src}-${single.alt}`} className="space-y-3">
                        <CaseStudyImage
                          src={single.src}
                          alt={single.alt}
                          preserveAspect={preserveAspect}
                          sizes={
                            project.finalSiteMobileImage
                              ? '(min-width: 768px) 60vw, 100vw'
                              : '(min-width: 1280px) 1280px, 100vw'
                          }
                          clipLeft={single.clipLeft}
                        />
                        {single.caption ? (
                          <figcaption className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
                            {single.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    );
                  })}
                </div>

                {project.finalSiteMobileImage ? (
                  <figure className="space-y-3 md:sticky md:top-28">
                    <CaseStudyImage
                      src={project.finalSiteMobileImage.src}
                      alt={project.finalSiteMobileImage.alt}
                      preserveAspect={preserveAspect}
                      sizes="(min-width: 768px) 35vw, 100vw"
                    />
                    {project.finalSiteMobileImage.caption ? (
                      <figcaption className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
                        {project.finalSiteMobileImage.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}
              </div>
              )
            ) : project.solutionImages && project.solutionImages.length > 0 ? (
              <MediaGrid
                items={project.solutionImages}
                preserveAspect={preserveAspect}
                columnsClassName="md:grid-cols-2"
              />
            ) : null}
          </div>
        ) : null}

        {project.videos && project.videos.length > 0 ? (
          <div className="space-y-8">
            <div className="space-y-4">
              <SectionHeadingWithNextNav id="project-videos-heading" items={sectionNavItems}>
                {project.videosHeading ?? 'Motion'}
              </SectionHeadingWithNextNav>
              {project.videosIntro ? (
                <p className="text-base font-light leading-relaxed text-zinc-800 md:text-lg">
                  {project.videosIntro}
                </p>
              ) : null}
            </div>
            <VideoGrid videos={project.videos} />
          </div>
        ) : null}

        {!isStructuredCaseStudy && project.sections && project.sections.length > 0 ? (
          <div className="space-y-24">
                {project.sections.map((section, index) => {
                  const imageOnRight = index % 2 === 1;
                  const sectionId = `project-section-${section.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '')}`;

                  return (
                    <article
                      key={section.title}
                      className={[
                        'grid items-center gap-8 md:gap-12 lg:gap-16',
                        section.imageSrc ? 'md:grid-cols-2' : '',
                      ].join(' ')}
                    >
                      {section.imageSrc ? (
                        <div className={imageOnRight ? 'md:order-2' : 'md:order-1'}>
                          <CaseStudyImage
                            src={section.imageSrc}
                            alt={section.imageAlt ?? section.title}
                            preserveAspect={preserveAspect}
                            sizes="(min-width: 768px) 50vw, 100vw"
                          />
                        </div>
                      ) : null}

                      <div
                        className={[
                          'space-y-5 md:space-y-6',
                          section.imageSrc
                            ? imageOnRight
                              ? 'md:order-1'
                              : 'md:order-2'
                            : 'md:col-span-2',
                        ].join(' ')}
                      >
                        <SectionHeading id={sectionId}>{section.title}</SectionHeading>
                    {section.body ? (
                      <p className="text-base font-light leading-relaxed text-zinc-800 md:text-lg">
                        {section.body}
                      </p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}

        {project.metrics && project.metrics.length > 0 ? (
          <div className="space-y-8">
            <SectionHeadingWithNextNav id="project-results-heading" items={sectionNavItems}>
              Results
            </SectionHeadingWithNextNav>
            <dl className="grid grid-cols-2 gap-6 border-y border-zinc-200 py-8 md:grid-cols-4 md:gap-8 lg:gap-12">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
                    {metric.label}
                  </dt>
                  <dd className="mt-5 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {project.gallery.length > 0 ? (
          <div className="space-y-8">
            <SectionHeadingWithNextNav id="project-gallery-heading" items={sectionNavItems}>
              More visuals
            </SectionHeadingWithNextNav>
            <MediaGrid items={project.gallery} preserveAspect={preserveAspect} />
          </div>
        ) : null}

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
  );
}
