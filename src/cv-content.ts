// CV page copy, verbatim as supplied. Do not reword.
import type { Accent } from './content';

export const cvHero = {
  name: 'Dan Hemsley',
  role: 'Senior Product Designer',
  statement: 'I turn complex systems and operational workflows into clear, coherent product experiences.',
  intro:
    'I have 12+ years of experience across product design, UX, publishing and front-end development. Most recently, I led end-to-end design for UpRate’s B2B SaaS platform—working from customer research and product strategy through interaction design, design systems and delivery.',
  location: 'Tonbridge, Kent, UK',
};

export const cvStats: { value: string; text: string; accent: Accent }[] = [
  { value: '12+ years', text: 'Across product design, UX and front-end development', accent: 'blue' },
  { value: 'Two products launched', text: 'From early discovery through customer delivery at UpRate', accent: 'red' },
  { value: '1–2 days saved per release', text: 'Through reusable design-system components and clearer Design QA', accent: 'purple' },
];

export const cvProfile = {
  title: 'Profile',
  statement: 'I’m strongest when a product connects multiple roles, decisions and systems.',
  paragraphs: [
    'My approach is to understand how work moves between people, model the relationships beneath the interface and make the reasoning visible. This helps customers, Product and Engineering build a shared understanding of the problem before committing to a solution.',
    'I work comfortably across discovery, product framing, interaction design, prototyping and delivery. My background in front-end development also helps me collaborate closely with engineers, understand implementation constraints and stay involved until the experience ships.',
  ],
};

export interface Position {
  company: string;
  role: string;
  dates: string;
  /** Extra context shown after the dates, e.g. "B2B SaaS". */
  context?: string;
  summary?: string;
  points: string[];
  /** Visual weight: featured (UpRate) → standard → compact for earlier roles. */
  tier: 'featured' | 'standard' | 'compact';
  caseStudy?: { label: string };
}

export const cvExperience: Position[] = [
  {
    company: 'UpRate',
    role: 'Senior Product Designer',
    dates: 'July 2022–Present',
    context: 'B2B SaaS',
    summary: 'Resource-management software supporting the connected back-office operations of plant-hire businesses.',
    points: [
      'Owned design end to end across discovery, product strategy, interaction design, validation and delivery.',
      'Helped bring two products to market across sales management, hire contracts, resource scheduling, invoicing and job workflows.',
      'Worked directly with customers to understand how work moved between Contract Managers, Hiring Managers, assigned labour and Accounts.',
      'Reframed resource-first scheduling around an explicit Assignment model, allowing requirements to be captured before a specific person or asset was selected.',
      'Built a reusable Figma design system covering components, variants, states, themes and tokens.',
      'Reduced design and QA work by approximately one to two days per release through clearer patterns and closer Engineering collaboration.',
      'Contributed directly to the Flutter codebase and remained involved through implementation and Design QA.',
      'Achieved an average 83% improvement in user satisfaction across measured product releases.',
    ],
    tier: 'featured',
    caseStudy: { label: 'Explore the UpRate case study' },
  },
  {
    company: 'Independent Artist and Illustrator',
    role: 'Self-employed',
    dates: 'July 2021–July 2022',
    points: [
      'Built an online audience of more than 100,000 followers.',
      'Developed and published original creative work across digital channels.',
      'Collaborated with the TikTok UK Creator programme.',
      'Managed the creative, commercial and audience-development sides of an independent practice.',
    ],
    tier: 'standard',
  },
  {
    company: 'SixPorts',
    role: 'User Experience Designer',
    dates: 'March 2019–July 2021',
    points: [
      'Designed digital products and customer experiences from early requirements through flows, prototypes and final interfaces.',
      'Turned stakeholder objectives and user needs into clearer journeys and interaction models.',
      'Worked closely with clients and developers throughout design and delivery.',
    ],
    tier: 'standard',
  },
  {
    company: 'MCM Net',
    role: 'Front-End Developer',
    dates: 'July 2017–February 2019',
    points: [
      'Designed and built responsive websites and digital experiences.',
      'Connected visual design decisions with practical front-end implementation.',
      'Introduced reusable approaches that made common delivery work approximately 50% faster.',
    ],
    tier: 'compact',
  },
  {
    company: 'Pugpig',
    role: 'Designer and Front-End Developer',
    dates: 'August 2012–June 2017',
    points: [
      'Designed and built digital publishing experiences across mobile and web.',
      'Translated editorial, commercial and technical requirements into responsive products.',
      'Worked across interface design and front-end implementation within a product-focused team.',
    ],
    tier: 'compact',
  },
  {
    company: 'Calverley',
    role: 'Graphic Designer and Product Designer',
    dates: 'November 2007–July 2012',
    points: [
      'Designed brand, print and digital experiences for a range of clients.',
      'Helped translate business requirements into clearer customer-facing products.',
      'Contributed to enquiry improvements that made common enquiries approximately 65% faster.',
    ],
    tier: 'compact',
  },
];

export const cvCapabilities: { title: string; items: string[]; accent: Accent }[] = [
  {
    title: 'Product and research',
    items: ['Product strategy', 'Discovery', 'Customer interviews', 'User research', 'Workflow mapping', 'Data-informed design', 'Usability testing'],
    accent: 'blue',
  },
  {
    title: 'Experience design',
    items: ['UX/UI design', 'Interaction design', 'Information architecture', 'Wireframing', 'Prototyping', 'Responsive design', 'Accessibility'],
    accent: 'red',
  },
  {
    title: 'Systems and delivery',
    items: ['Design systems', 'Component libraries', 'Design QA', 'Cross-functional collaboration', 'Agile delivery', 'Engineering partnership'],
    accent: 'purple',
  },
  {
    title: 'Technology and tools',
    items: ['Figma', 'FigJam', 'Front-end development', 'HTML', 'CSS', 'JavaScript', 'Flutter', 'AI-assisted discovery and prototyping'],
    accent: 'orange',
  },
];

export const cvEducation = {
  school: 'University of Southampton',
  degree: 'BA Fine Art Painting',
  dates: '2002–2005',
};

export const cvContact = {
  title: 'Let’s talk',
  text: 'I’m interested in Senior Product Designer roles where complex systems, thoughtful interaction design and close Engineering collaboration matter.',
};
