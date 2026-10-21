export type ScopeItem = {
  title: string
  href: string
  summary: string
  deliverables: string[]
}

export type GalleryImage = {
  src: string
  alt: string
  orientation: 'landscape' | 'portrait'
}

export type CaseStudy = {
  slug: string
  client: string
  logo: string
  tagline: string
  engagement: string
  role: string
  timeline: string
  industry: string
  heroImage: string
  featureImage: string
  brief: string[]
  approach: string[]
  scope: ScopeItem[]
  launch: {
    title: string
    copy: string
    // Swap `video` for the hosted launch-video URL (e.g. Cloudinary) when it's ready.
    video: string
    poster: string
  }
  gallery: GalleryImage[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'no-fear',
    client: 'No Fear',
    logo: '/logos/mono/no-fear-solid.png',
    tagline: 'Bringing an icon back to the dirt.',
    engagement: 'Full Scope',
    role: 'Creative Direction',
    timeline: '2025 — Present',
    industry: 'Motocross / Lifestyle',
    heroImage: '/work/no-fear/hero.jpg',
    featureImage: '/work/no-fear/hoodie-bike.jpg',
    brief: [
      'No Fear is one of the most recognizable names in action sports. The goal was to bring the brand back with the same energy that made it a culture staple — without leaning on nostalgia alone.',
      'They needed one team to own the whole picture: how the brand looks, what it drops, what it posts, and how it talks to its customers.',
    ],
    approach: [
      'We took the creative director seat for the brand. Every shoot, product, post, email and printed piece runs through one creative vision, so the brand shows up the same way everywhere.',
      'We built it from inside the culture — real riders, real bikes, real locations — and designed the merch, content and campaigns to feel like they came from the community, not a marketing department.',
    ],
    scope: [
      {
        title: 'Content Creation',
        href: '/services/content-creation',
        summary: 'Campaign shoots, product photography and short-form video for every drop.',
        deliverables: ['Lifestyle Shoots', 'Product Photo', 'Launch Video', 'Reels & Shorts'],
      },
      {
        title: 'Social Media Management',
        href: '/services/social-media-management',
        summary: 'Day-to-day management of the brand’s social channels — strategy, posting and community.',
        deliverables: ['Content Calendar', 'Posting', 'Community', 'Monthly Reporting'],
      },
      {
        title: 'Email Marketing',
        href: '/services/email-sms-marketing',
        summary: 'Launch campaigns and automated flows that turn followers into customers.',
        deliverables: ['Drop Campaigns', 'Automations', 'List Growth', 'Design & Copy'],
      },
      {
        title: 'Merchandise Design',
        href: '/services/merchandise-production',
        summary: 'Collection design from concept through production — tees, fleece, headwear and moto.',
        deliverables: ['Collection Design', 'Graphics', 'Tech Packs', 'Production'],
      },
      {
        title: 'Print',
        href: '/services/print-production',
        summary: 'Labels, trims, stickers and physical brand materials that match the collection.',
        deliverables: ['Labels & Trims', 'Stickers', 'Packaging', 'Event Print'],
      },
    ],
    launch: {
      title: 'The Drop',
      copy: 'Each collection launches as a campaign — shot, cut and rolled out across social and email in the same week, built for the phone first.',
      video: '/work/no-fear/launch.mp4',
      poster: '/work/no-fear/launch-poster.jpg',
    },
    gallery: [
      { src: '/work/no-fear/back-print.jpg', alt: 'No Fear back-print tee', orientation: 'portrait' },
      { src: '/work/no-fear/merch-rack.jpg', alt: 'No Fear collection on the rack with a dirt bike', orientation: 'landscape' },
      { src: '/work/no-fear/night-rider.jpg', alt: 'Rider in No Fear moto gear at night', orientation: 'landscape' },
      { src: '/work/no-fear/duo.jpg', alt: 'No Fear lifestyle campaign', orientation: 'landscape' },
      { src: '/work/no-fear/white-tee.jpg', alt: 'No Fear white tee back graphic', orientation: 'portrait' },
      { src: '/work/no-fear/black-tee.jpg', alt: 'Rider in a No Fear black tee', orientation: 'landscape' },
      { src: '/work/no-fear/rack-bw.jpg', alt: 'Black and white behind-the-scenes on set', orientation: 'landscape' },
      { src: '/work/no-fear/field.jpg', alt: 'No Fear back print in the field', orientation: 'landscape' },
      { src: '/work/no-fear/red-bike.jpg', alt: 'No Fear moto jersey on a red bike', orientation: 'landscape' },
      { src: '/work/no-fear/rider-moto.jpg', alt: 'No Fear lifestyle shoot with dirt bike', orientation: 'landscape' },
    ],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
