export type GraphicDesignImage = {
  src: string;
  alt: string;
};

export type GraphicDesignProject = {
  id: string;
  title: string;
  images: GraphicDesignImage[];
};

/**
 * Graphic design gallery projects.
 * Cover = first image. Extra images open in the lightbox slideshow.
 */
export const graphicDesignProjects: GraphicDesignProject[] = [
  {
    id: 'alchemia',
    title: 'Alchemia label and logo design',
    images: [
      {
        src: '/images/graphic-design/alchemia-1.png',
        alt: 'Alchemia product set with magnesium foot cream and sprays',
      },
      {
        src: '/images/graphic-design/alchemia-2.png',
        alt: 'Alchemia packaging and bottle set',
      },
      {
        src: '/images/graphic-design/alchemia-3.png',
        alt: 'Alchemia product packaging detail',
      },
      {
        src: '/images/graphic-design/alchemia-4.png',
        alt: 'Alchemia branding application',
      },
      {
        src: '/images/graphic-design/alchemia-5.png',
        alt: 'Alchemia branding detail',
      },
    ],
  },
  {
    id: 'mock-proper',
    title: 'Mock Proper media carousel',
    images: [
      {
        src: '/images/graphic-design/mock-proper-1.png',
        alt: 'Mock Proper logo with botanical ingredients',
      },
      {
        src: '/images/graphic-design/mock-proper-2.png',
        alt: 'Mock Proper Impeccably Improper brand poster',
      },
      {
        src: '/images/graphic-design/mock-proper-3.png',
        alt: 'Mock Proper splash drink product shot',
      },
      {
        src: '/images/graphic-design/mock-proper-4.png',
        alt: 'Mock Proper made with real ingredients ad',
      },
      {
        src: '/images/graphic-design/mock-proper-5.png',
        alt: 'Mock Proper tired of the hangover campaign visual',
      },
    ],
  },
  {
    id: 'beatsfest',
    title: 'Beatsfest logo',
    images: [
      {
        src: '/images/graphic-design/beatsfest-1.png',
        alt: 'Beatsfest logo on dark background',
      },
      {
        src: '/images/graphic-design/beatsfest-2.png',
        alt: 'Beatsfest logo on light background',
      },
    ],
  },
  {
    id: 'focus-05',
    title: 'Focus subway posters',
    images: [
      {
        src: '/images/graphic-design/focus-05-1.png',
        alt: 'Focus 05 Downtown social media advertisement',
      },
      {
        src: '/images/graphic-design/focus-05-2.png',
        alt: 'Focus 05 Downtown banner with friends lifestyle photo',
      },
    ],
  },
  {
    id: 'foodz',
    title: 'FOODZ Catering magazine spreads',
    images: [
      {
        src: '/images/graphic-design/foodz-2.png',
        alt: 'FOODZ Catering Washington Wedding Day fall magazine spread',
      },
      {
        src: '/images/graphic-design/foodz-1.png',
        alt: 'FOODZ Catering Washington Wedding Day summer magazine spread',
      },
    ],
  },
  {
    id: 'piddle-paddle',
    title: 'Piddle Paddle Tours pamphlet',
    images: [
      {
        src: '/images/graphic-design/piddle-paddle-1.png',
        alt: 'Piddle Paddle Tours pamphlet front with stingray and turtle tours',
      },
      {
        src: '/images/graphic-design/piddle-paddle-2.png',
        alt: 'Piddle Paddle Tours pamphlet back with lighthouse and whale watching',
      },
    ],
  },
  {
    id: 'scoop-shoppe',
    title: 'Scoop Shoppe promotional graphic',
    images: [
      {
        src: '/images/graphic-design/scoop-shoppe.png',
        alt: 'Scoop Shoppe Artisan Creamery promotional graphic',
      },
    ],
  },
  {
    id: 'fresh-fare-farms',
    title: 'Fresh Fare Farms flyer',
    images: [
      {
        src: '/images/graphic-design/fresh-fare-farms.png',
        alt: 'Fresh Fare Farms local sustainable fresh promotional flyer',
      },
    ],
  },
  {
    id: 'college-pizza',
    title: 'College Pizza poster',
    images: [
      {
        src: '/images/graphic-design/college-pizza.png',
        alt: 'College Pizza the ultimate study buddy poster',
      },
    ],
  },
  {
    id: 'clean-water',
    title: 'Global Clean Water Initiative poster',
    images: [
      {
        src: '/images/graphic-design/clean-water-initiative.png',
        alt: 'The Global Clean Water Initiative volunteer poster',
      },
    ],
  },
  {
    id: 'coffee-poster',
    title: 'Coffee poster',
    images: [
      {
        src: '/images/graphic-design/coffee-poster.png',
        alt: 'Coffee poster graphic',
      },
    ],
  },
];
