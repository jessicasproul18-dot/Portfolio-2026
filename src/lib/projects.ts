export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  caption?: string;
  /** Extra left clip in CSS to hide screenshot edge artifacts. */
  clipLeft?: boolean;
};

/** Single stacked image, or a side-by-side pair in the final work section. */
export type ProjectFinalDesktopItem =
  | ProjectMedia
  | {
      type: 'pair';
      items: [ProjectMedia, ProjectMedia];
    };

export type ProjectVideo = {
  src: string;
  caption?: string;
  poster?: string;
};

/** Optional long-form narrative blocks for simpler projects. */
export type ProjectSection = {
  title: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  year?: string;
  tools?: string[];
  focus: string[];
  outcomes: string[];
  metrics?: ProjectMetric[];
  /** Short problem statement for recruiter-friendly case studies. */
  problem?: string;
  /** Short process statement. */
  process?: string;
  /** Short solution / approach statement. */
  approach?: string;
  beforeImages?: ProjectMedia[];
  processImages?: ProjectMedia[];
  /** Optional right-column stack under Process (e.g. newsletter + animation reference). */
  processSideImages?: ProjectMedia[];
  /**
   * When true with processSideImages, scale the side column to match the primary
   * process image height (e.g. two card sorts stacked beside one journey map).
   */
  processSideMatchHeight?: boolean;
  solutionImages?: ProjectMedia[];
  /** Heading for the final visuals section. Defaults to "Final site". */
  finalWorkHeading?: string;
  /** Desktop final screens stacked in the left column of Final site. */
  finalSiteDesktopImages?: ProjectFinalDesktopItem[];
  /** When 2, final screens render in a two-column grid (best for tall mobile frames). */
  finalSiteColumns?: 1 | 2;
  /** Mobile final screen shown in the right column of Final site. */
  finalSiteMobileImage?: ProjectMedia;
  /** Heading for the videos / live preview section. Defaults to "Motion". */
  videosHeading?: string;
  /** Optional intro copy under the videos heading. */
  videosIntro?: string;
  videos?: ProjectVideo[];
  sections?: ProjectSection[];
  imageSrc: string;
  imageAlt: string;
  gallery: Array<{ src: string; alt: string; caption?: string }>;
  /** When true, case study images keep full aspect ratio and are not cropped. */
  preserveImageAspect?: boolean;
  /** When true, Overview shows description only (summary still used on featured work cards). */
  hideOverviewSummary?: boolean;
  /**
   * Optional fixed aspect ratio for the top cover image only (CSS aspect-* value),
   * e.g. "1024/599" to match a landscape hero frame.
   */
  coverAspect?: `${number}/${number}`;
  /** Tailwind background class for letterboxing around the cover image. Defaults to dark. */
  coverBackgroundClass?: string;
  /** When true, hides the jump-nav under the cover image. */
  hideSectionNav?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'uniq-real-estate',
    title: 'UNIQ Real Estate Group',
    summary:
      'Redesigned a costly IDX-heavy site into a consultation-focused landing page aligned with the client’s newsletter branding.',
    description:
      'UNIQ Real Estate Group needed a clearer web presence for buyers, sellers, and investors. I led UX/UI design and development for a streamlined WordPress site that prioritizes direct consultation over a complicated listing search.',
    role: 'Lead UX/UI Designer & Developer',
    tools: ['Figma', 'Photoshop', 'WordPress', 'Divi'],
    year: '2026',
    focus: [
      'Remove a costly, confusing IDX experience',
      'Condense three thin pages into one landing page',
      'Match the site to existing newsletter branding',
      'Make consultation the primary call to action',
    ],
    problem:
      'The old site leaned on an expensive, overcomplicated IDX search and did little to introduce the company or match its existing branding.',
    process:
      'I audited the three-page site, used the client’s newsletter as the visual foundation, wireframed one consultation-first landing page, then built it in WordPress.',
    approach:
      'The final site moves visitors from brand trust into clear next steps: buy, sell, understand the process, meet the founder, and request a consultation.',
    outcomes: [
      'Replaced a costly IDX browse path with one consultation-focused landing page.',
      'Brought the site in line with the client’s existing newsletter brand.',
      'Made requesting help the clear next step for buyers, sellers, and investors.',
    ],
    preserveImageAspect: true,
    beforeImages: [
      {
        src: '/images/projects/uniq/older-site-1.png',
        alt: 'Older UNIQ site screenshot one',
        caption: 'Before',
      },
      {
        src: '/images/projects/uniq/older-site-2.png',
        alt: 'Older UNIQ site screenshot two',
        caption: 'Before',
      },
      {
        src: '/images/projects/uniq/older-site-3.png',
        alt: 'Older UNIQ site screenshot three',
        caption: 'Before',
      },
    ],
    processImages: [
      {
        src: '/images/projects/uniq/figma-wireframe.png',
        alt: 'Figma wireframe for the UNIQ redesign',
        caption: 'Figma wireframe',
      },
    ],
    processSideImages: [
      {
        src: '/images/projects/uniq/newsletter.png',
        alt: 'UNIQ newsletter style used as brand foundation',
        caption: 'Newsletter foundation',
      },
      {
        src: '/images/projects/uniq/process-animation-reference.png',
        alt: 'Reference for the buying process animation',
        caption: 'Process animation reference',
      },
    ],
    finalSiteDesktopImages: [
      {
        src: '/images/projects/uniq/new-site-hero.png',
        alt: 'New UNIQ hero section',
        caption: 'Hero',
      },
      {
        src: '/images/projects/uniq/new-site-about.png',
        alt: 'New UNIQ about section',
        caption: 'About',
      },
      {
        src: '/images/projects/uniq/new-site-buying.png',
        alt: 'New UNIQ buying a home section',
        caption: 'Buying a home',
        clipLeft: true,
      },
      {
        src: '/images/projects/uniq/new-site-selling.png',
        alt: 'New UNIQ selling a home section',
        caption: 'Selling a home',
        clipLeft: true,
      },
      {
        src: '/images/projects/uniq/new-site-founder.png',
        alt: 'New UNIQ meet the founder section',
        caption: 'Meet the founder',
      },
      {
        src: '/images/projects/uniq/new-site-contact.png',
        alt: 'New UNIQ contact section',
        caption: 'Contact',
      },
    ],
    finalSiteMobileImage: {
      src: '/images/projects/uniq/new-site-hero-phone.png',
      alt: 'New UNIQ hero on mobile',
      caption: 'Mobile hero',
    },
    videos: [
      {
        src: '/images/projects/uniq/videos/selling-process.mp4',
        caption: 'Selling a home',
        poster: '/images/projects/uniq/process-animation-reference.png',
      },
      {
        src: '/images/projects/uniq/videos/buying-process.mp4',
        caption: 'Buying a home',
        poster: '/images/projects/uniq/process-animation-reference.png',
      },
    ],
    videosIntro:
      'An animated progress path walks first-time clients through the buying process and lowers the barrier to starting an intake form.',
    imageSrc: '/images/projects/uniq/new-site-hero.png',
    imageAlt: 'New UNIQ Real Estate Group hero section',
    gallery: [],
  },
  {
    slug: 'tunepact',
    title: 'TunePact',
    summary:
      'Eight months as the sole UX/UI designer, shaping early Biolink and Tunepage tools so artists can promote themselves without becoming full-time marketers.',
    description:
      'TunePact is a music startup building an AI-powered platform to help independent artists handle marketing in one place. User interviews pointed to a clear pain: early-career musicians struggle most with self-promotion. They rarely have budget for a marketing team, and discovery today depends heavily on social media, yet most would rather spend that time writing music. I interned there for eight months as the sole UX/UI designer, covering early product screens for the musician dashboard, fan management, analytics, Biolink, onboarding, login, and a low-fidelity landing page, plus brand color, typography, and component direction.',
    role: 'UX/UI designer',
    tools: ['Figma', 'Canva', 'Jira'],
    year: '2025',
    focus: [
      'Design early product flows that reduce the self-promotion burden for musicians',
      'Support product testing and user interviews with artists',
      'Build testable prototypes in Figma',
      'Establish brand colors, typography, and reusable UI patterns',
    ],
    problem:
      'Early-career musicians struggle most with self-promotion. They rarely have budget for a marketing team, and discovery depends heavily on social media, yet most would rather spend that time writing music. Most marketing tools are not specialized to support the kind of platform and fanbase early musicians need to grow.',
    process:
      'As the only UX/UI designer for eight months, I used musician interview insights to frame tools that support promotion without turning artists into full-time content creators. I designed early dashboard, fan management, analytics, Biolink, onboarding, login, and landing flows, supported interviews and Biolink testing, and set brand color, type, and component patterns.',
    approach:
      'A public Biolink pairs with Tunepage tools for marketing, fans, and performance so artists share work and track growth in one place. Dashboard, analytics, and fan screens push clear next actions instead of generic marketing busywork.',
    outcomes: [
      'Turned musician interview insights into early product screens artists could test.',
      'Gave promotion, fans, and performance a shared home in Biolink and Tunepage.',
      'Set reusable brand and UI patterns for the early product.',
    ],
    finalWorkHeading: 'Final prototype shots',
    hideOverviewSummary: true,
    coverAspect: '1024/599',
    preserveImageAspect: true,
    processImages: [
      {
        src: '/images/projects/tunepact/landing-wireframe.png',
        alt: 'Low-fidelity wireframe for the TunePact landing page',
        caption: 'Landing page wireframe',
      },
    ],
    processSideImages: [
      {
        src: '/images/projects/tunepact/brand-guide.png',
        alt: 'TunePact brand colors and typography guide',
        caption: 'Brand colors and type',
      },
      {
        src: '/images/projects/tunepact/components.png',
        alt: 'TunePact UI component examples',
        caption: 'Component patterns',
      },
    ],
    finalSiteDesktopImages: [
      {
        src: '/images/projects/tunepact/dashboard.png',
        alt: 'TunePact musician dashboard',
        caption: 'Musician dashboard',
      },
      {
        src: '/images/projects/tunepact/analytics.png',
        alt: 'TunePact analytics page',
        caption: 'Analytics page',
      },
      {
        type: 'pair',
        items: [
          {
            src: '/images/projects/tunepact/fan-messages.png',
            alt: 'TunePact fan management messages toggle',
            caption: 'Fan management messages toggle',
          },
          {
            src: '/images/projects/tunepact/fan-gifts.png',
            alt: 'TunePact fan management gift history toggle',
            caption: 'Fan management gift history toggle',
          },
        ],
      },
    ],
    videosHeading: 'Live previews',
    videosIntro:
      'Screen recordings of early Figma prototypes for login, Biolink onboarding, and the Biolink experience artists would use to share and grow their work.',
    videos: [
      {
        src: '/images/projects/tunepact/videos/login.mp4',
        caption: 'Login page',
      },
      {
        src: '/images/projects/tunepact/videos/onboarding.mp4',
        caption: 'Biolink onboarding',
      },
      {
        src: '/images/projects/tunepact/videos/biolink.mp4',
        caption: 'Biolink',
      },
    ],
    imageSrc: '/images/projects/tunepact/cover.png',
    imageAlt: 'TunePact logo',
    gallery: [],
  },
  {
    slug: 'white-zuckerman',
    title: 'White Zuckerman Warsavsky Luna & Hunt',
    summary:
      "Designed and developed a clear website for this CPA firm's expert witness practice, highlighting services and making contact straightforward.",
    description:
      'White Zuckerman Warsavsky Luna & Hunt is a certified public accountant LLP. Senior partners Barbara C. Luna and John S. Luna needed a dedicated site for their forensic accounting and expert witness work. The site had to reflect their connection to the firm while clearly explaining what they do, which services they offer, and how to hire them.',
    role: 'Lead UX/UI Designer and Developer',
    tools: ['Figma', 'React', 'Cursor', 'Laravel'],
    year: '2026',
    focus: [
      'Use SEEK and Jurispro profile information to present their expert witness practice',
      'Show their relationship to the LLP while keeping the focus on Barbara and John',
      'Create a clear path for case inquiries and consultation requests',
    ],
    problem:
      'Barbara and John had no joint expert witness site, and their existing firm and SEEK profiles did not give them a clear professional presence.',
    process:
      'I pulled content from the LLP site and their existing profiles, researched the litigation audience, then wireframed and built the site in Cursor.',
    approach:
      'Background and credentials come first so counsel can trust the practice before reaching out. Core services and an engagement path from case assessment to testimony make hiring clearer for law firms, insurers, agencies, and financial institutions.',
    outcomes: [
      'Gave Barbara and John a dedicated site for expert witness inquiries.',
      'Made their joint practice easier to find than the firm site or SEEK listings alone.',
      'Put services, credentials, and next steps in one clear professional presence.',
    ],
    preserveImageAspect: true,
    beforeImages: [
      {
        src: '/images/projects/wzw/research-1.png',
        alt: 'Existing expert witness directory or firm profile reference',
        caption: 'Source research',
      },
      {
        src: '/images/projects/wzw/research-2.png',
        alt: 'Existing SEEK or firm profile reference',
        caption: 'Source research',
      },
      {
        src: '/images/projects/wzw/research-3.png',
        alt: 'Existing LLP or profile reference',
        caption: 'Source research',
      },
    ],
    processImages: [
      {
        src: '/images/projects/wzw/wireframe.png',
        alt: 'Low-fidelity wireframe for the White Zuckerman expert witness site',
        caption: 'Site wireframe',
      },
    ],
    finalSiteDesktopImages: [
      {
        src: '/images/projects/wzw/hero.png',
        alt: 'White Zuckerman hero section',
        caption: 'Hero',
      },
      {
        src: '/images/projects/wzw/hero-nav.png',
        alt: 'White Zuckerman hero with navigation menu open',
        caption: 'Navigation',
      },
      {
        src: '/images/projects/wzw/about.png',
        alt: 'White Zuckerman about section with partner portraits',
        caption: 'About',
      },
      {
        src: '/images/projects/wzw/core-services.png',
        alt: 'White Zuckerman core services introduction',
        caption: 'Core services',
      },
      {
        src: '/images/projects/wzw/core-services-continued.png',
        alt: 'White Zuckerman forensic accounting and valuation services',
        caption: 'Services detail',
      },
      {
        src: '/images/projects/wzw/credentials.png',
        alt: 'White Zuckerman professional background and credentials accordion',
        caption: 'Credentials',
      },
      {
        src: '/images/projects/wzw/engagement.png',
        alt: 'White Zuckerman engagement steps and case discussion CTA',
        caption: 'Engagement',
      },
      {
        src: '/images/projects/wzw/contact.png',
        alt: 'White Zuckerman contact information and inquiry form',
        caption: 'Contact',
      },
      {
        src: '/images/projects/wzw/footer.png',
        alt: 'White Zuckerman site footer with offices and contact details',
        caption: 'Footer',
      },
    ],
    imageSrc: '/images/projects/wzw/hero.png',
    imageAlt: 'White Zuckerman Warsavsky Luna & Hunt expert witness site hero',
    gallery: [],
  },
  {
    slug: 'bowlsome-smoothie',
    title: 'Bowlsome Smoothie',
    summary:
      'Designed a self-service kiosk for Bowlsome Smoothie so people can build a custom bowl and check out without waiting in line.',
    description:
      'Bowlsome Smoothie is built around customizable smoothie bowls. The project was an in-store self-service kiosk so customers can order on their own. I designed the flow for a 2304 by 1632 kiosk screen, from opening through size, ingredients, toppings, cart, payment, and confirmation. That included the brand system, wireframes, high-fidelity screens, and a usability testing plan for the prototype.',
    role: 'UX/UI designer',
    tools: ['Figma'],
    year: '2025',
    focus: [
      'Map a clear ordering path for custom smoothie bowls',
      'Keep the experience fast for busy customers without cutting customization',
      'Follow the client brief on reach, contrast, and readable text',
      'Set up color, type, spacing, and reusable UI pieces',
      'Write a usability test around a real ordering scenario',
    ],
    problem:
      'Customers want customizable smoothie bowls, but waiting in line slows the process, so the kiosk had to stay fast without cutting customization or accessibility.',
    process:
      'From the client brief, use case, and user stories, I mapped the order flow, then wireframed opening, choosing, and checkout for the 2304 by 1632 kiosk. I expanded the given colors (#374B4A, #0CCA4A), chose Krub, and built spacing, buttons, cards, and fields on an 8px base with enough contrast around actions. I also wrote a usability script for a full order back to the start screen.',
    approach:
      'Screens move from bowl size through ingredients, add-ins, toppings, review, cart, payment, and confirmation, with a quicker path alongside full customization. Ingredient cards leave room for calories and allergens. Primary actions sit lower for reach, and review and cart keep totals and edit controls visible before pay.',
    outcomes: [
      'Delivered a full self-serve order flow from start through confirmation.',
      'Met the brief’s accessibility needs for reach, contrast, and readable text.',
      'Left a reusable UI system and a script to test a real ordering scenario.',
    ],
    finalWorkHeading: 'Final screens',
    finalSiteColumns: 2,
    hideOverviewSummary: true,
    coverAspect: '1024/599',
    coverBackgroundClass: 'bg-white',
    preserveImageAspect: true,
    processImages: [
      {
        src: '/images/projects/bowlsome/sitemap.png',
        alt: 'Bowlsome Smoothie site map of the ordering flow',
        caption: 'Site map',
      },
      {
        src: '/images/projects/bowlsome/wireframe-opening.png',
        alt: 'Low-fidelity wireframe for the Bowlsome opening screen',
        caption: 'Opening wireframe',
      },
      {
        src: '/images/projects/bowlsome/wireframe-choosing.png',
        alt: 'Low-fidelity wireframe for choosing menu items',
        caption: 'Choosing page wireframe',
      },
      {
        src: '/images/projects/bowlsome/wireframe-checkout.png',
        alt: 'Low-fidelity wireframe for checkout and order summary',
        caption: 'Checkout wireframe',
      },
    ],
    processSideImages: [
      {
        src: '/images/projects/bowlsome/color-palette.png',
        alt: 'Bowlsome Smoothie color palette',
        caption: 'Color palette',
      },
      {
        src: '/images/projects/bowlsome/typography.png',
        alt: 'Bowlsome Smoothie typography styles',
        caption: 'Typography',
      },
      {
        src: '/images/projects/bowlsome/spacing.png',
        alt: 'Bowlsome Smoothie spacing scale',
        caption: 'Spacing',
      },
      {
        src: '/images/projects/bowlsome/buttons.png',
        alt: 'Bowlsome Smoothie button styles and states',
        caption: 'Buttons',
      },
      {
        src: '/images/projects/bowlsome/menu-cards.png',
        alt: 'Bowlsome Smoothie menu item card states',
        caption: 'Menu item cards',
      },
      {
        src: '/images/projects/bowlsome/form-fields.png',
        alt: 'Bowlsome Smoothie form field and order summary states',
        caption: 'Form fields',
      },
    ],
    finalSiteDesktopImages: [
      {
        src: '/images/projects/bowlsome/final-opening.png',
        alt: 'Bowlsome Smoothie opening screen',
        caption: 'Opening',
      },
      {
        src: '/images/projects/bowlsome/final-bowl-size.png',
        alt: 'Bowlsome Smoothie bowl size selection screen',
        caption: 'Bowl size',
      },
      {
        src: '/images/projects/bowlsome/final-summary.png',
        alt: 'Bowlsome Smoothie bowl ingredients summary screen',
        caption: 'Bowl summary',
      },
      {
        src: '/images/projects/bowlsome/final-cart.png',
        alt: 'Bowlsome Smoothie cart screen',
        caption: 'Cart',
      },
      {
        src: '/images/projects/bowlsome/final-payment.png',
        alt: 'Bowlsome Smoothie tap to pay screen',
        caption: 'Payment',
      },
      {
        src: '/images/projects/bowlsome/final-confirmation.png',
        alt: 'Bowlsome Smoothie order confirmation screen',
        caption: 'Confirmation',
      },
    ],
    imageSrc: '/images/projects/bowlsome/logo.png',
    imageAlt: 'Bowlsome Smoothie logo',
    gallery: [],
  },
  {
    slug: 'upskillet',
    title: 'Upskillet',
    summary:
      'Redesigned Upskillet’s information architecture so busy users can find quick, healthy recipes without fighting vague menus and buried tasks.',
    description:
      'Upskillet is a cooking site built around recipes, classes, and kitchen resources. This project was an information architecture assessment: audit the original structure, research how busy users look for meals, then reshape navigation and wireframes around those tasks. The goals were to support healthy home cooking, cut cognitive load, and organize content the way users think about getting dinner on the table.',
    role: 'UX designer / information architecture',
    tools: ['Figma', 'Card sorting', 'Journey mapping'],
    year: '2025',
    focus: [
      'Audit the original site map',
      'Map the user journey',
      'Run card sorting with real users',
      'Rebuild navigation around user mental models',
      'Wireframe clearer desktop and mobile flows',
    ],
    problem:
      'Vague navigation and buried tasks made it hard for busy users to find recipes, save content, or complete simple actions without extra clicks and confusion.',
    process:
      'I audited the original site map and mapped the user journey. Both showed the same issues: vague labels like “More,” buried pages, and hidden details like prep time. Card sorting with real users confirmed clearer groupings for Recipes, Cooking Resources, About, and Blog. I rebuilt the site map around those categories, then wireframed the new structure.',
    approach:
      'Wireframes use clear top-level nav for Recipes, Cooking Resources, About Us, and Blog. Prep time, save, and nutrition sit up front on recipes, with filters to sort by time, type, and more. Browse, save, and submit stay in one flow so common tasks take fewer clicks.',
    outcomes: [
      'Navigation now matches how real users grouped the site in card sorting.',
      'Common tasks like finding, saving, and submitting recipes take fewer steps.',
      'Key recipe details and form feedback show up where people expected them.',
    ],
    finalWorkHeading: 'Wireframes',
    finalSiteColumns: 2,
    hideOverviewSummary: true,
    coverAspect: '16/9',
    coverBackgroundClass: 'bg-white',
    preserveImageAspect: true,
    processSideMatchHeight: true,
    processImages: [
      {
        src: '/images/projects/upskillet/journey-map.png',
        alt: 'User journey map for Upskillet',
        caption: 'User journey map',
      },
    ],
    processSideImages: [
      {
        src: '/images/projects/upskillet/card-sorting-1.png',
        alt: 'Upskillet card sorting results from a participant',
        caption: 'Card sorting',
      },
      {
        src: '/images/projects/upskillet/card-sorting-2.png',
        alt: 'Upskillet card sorting results from a second participant',
        caption: 'Card sorting',
      },
    ],
    solutionImages: [
      {
        src: '/images/projects/upskillet/sitemap-redesign.png',
        alt: 'Redesigned Upskillet site map with Recipes, Cooking Resources, About, and Blog',
        caption: 'Redesigned site map',
      },
    ],
    finalSiteDesktopImages: [
      {
        src: '/images/projects/upskillet/wireframe-recipes-desktop.png',
        alt: 'Desktop wireframe of the Upskillet recipes grid with sort options',
        caption: 'Recipes browse',
      },
      {
        src: '/images/projects/upskillet/wireframe-recipe-desktop.png',
        alt: 'Desktop wireframe of an Upskillet recipe detail page',
        caption: 'Recipe detail',
      },
      {
        src: '/images/projects/upskillet/wireframe-submit-desktop.png',
        alt: 'Desktop wireframe of the Upskillet submit a recipe form',
        caption: 'Submit a recipe',
      },
      {
        src: '/images/projects/upskillet/wireframe-about-desktop.png',
        alt: 'Desktop wireframe of the Upskillet about page with newsletter signup',
        caption: 'About',
      },
      {
        src: '/images/projects/upskillet/wireframe-nav-mobile.png',
        alt: 'Mobile wireframe of Upskillet navigation menu',
        caption: 'Mobile nav',
      },
      {
        src: '/images/projects/upskillet/wireframe-nav-expanded-mobile.png',
        alt: 'Mobile wireframe of expanded Upskillet navigation categories',
        caption: 'Mobile nav expanded',
      },
      {
        src: '/images/projects/upskillet/wireframe-recipes-mobile.png',
        alt: 'Mobile wireframe of Upskillet recipe browsing',
        caption: 'Mobile recipes',
      },
      {
        src: '/images/projects/upskillet/wireframe-recipe-detail-mobile.png',
        alt: 'Mobile wireframe of an Upskillet recipe detail page',
        caption: 'Mobile recipe detail',
      },
    ],
    imageSrc: '/images/projects/upskillet/cover.png',
    imageAlt: 'Upskillet information architecture assessment cover',
    gallery: [],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const getProjectSlugs = (): string[] => projects.map((project) => project.slug);
