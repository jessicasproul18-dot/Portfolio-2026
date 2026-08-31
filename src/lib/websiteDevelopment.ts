export type WebsiteDevelopmentImage = {
  src: string;
  alt: string;
};

export type WebsiteDevelopmentProject = {
  id: string;
  title: string;
  images: WebsiteDevelopmentImage[];
};

/**
 * Website development gallery projects.
 * Cover = first image. Extra images open in the lightbox slideshow.
 */
export const websiteDevelopmentProjects: WebsiteDevelopmentProject[] = [
  {
    id: 'dogtek',
    title: 'DOGTEK website',
    images: [
      {
        src: '/images/website-development/dogtek-1-home.png',
        alt: 'DOGTEK homepage',
      },
      {
        src: '/images/website-development/dogtek-2-about.png',
        alt: 'DOGTEK about page',
      },
      {
        src: '/images/website-development/dogtek-3-services.png',
        alt: 'DOGTEK services page',
      },
      {
        src: '/images/website-development/dogtek-4-press.png',
        alt: 'DOGTEK press page',
      },
      {
        src: '/images/website-development/dogtek-5-contact.png',
        alt: 'DOGTEK contact page',
      },
    ],
  },
  {
    id: 'habu-smoke-cart',
    title: 'Habu Smoke Cart website',
    images: [
      {
        src: '/images/website-development/habu-smoke-cart.png',
        alt: 'Habu Smoke Cart full website page',
      },
    ],
  },
  {
    id: 'true-cost-transport',
    title: 'True Cost Transport website',
    images: [
      {
        src: '/images/website-development/true-cost-transport.png',
        alt: 'True Cost Transport full website page',
      },
    ],
  },
  {
    id: 'selkirk-cabinet',
    title: 'Selkirk-Cabinet Land Surveying website',
    images: [
      {
        src: '/images/website-development/selkirk-cabinet.png',
        alt: 'Selkirk-Cabinet Land Surveying full website page',
      },
    ],
  },
  {
    id: 'vanguard-water',
    title: 'Vanguard Water Creations ecommerce site',
    images: [
      {
        src: '/images/website-development/vanguard-water.png',
        alt: 'Vanguard Water Creations full website page',
      },
    ],
  },
];
