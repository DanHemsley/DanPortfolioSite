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

// Figure + label split approved by Dan ("12+ years" -> "12+" / "years", etc.). The 83% card is worded from the
// former UpRate point "Achieved an average 83% improvement in user satisfaction across measured product releases."
// (removed from the UpRate points at Dan's request, so the figure appears once).
export const cvStats: { figure: string; label: string; text: string; accent: Accent }[] = [
  { figure: '12+', label: 'years', text: 'Across product design, UX and front-end development', accent: 'blue' },
  { figure: '2', label: 'products launched', text: 'From early discovery through customer delivery at UpRate', accent: 'red' },
  { figure: '1–2', label: 'days saved per release', text: 'Through reusable design-system components and clearer Design QA', accent: 'purple' },
  { figure: '83%', label: 'average improvement in user satisfaction', text: 'Across measured product releases at UpRate', accent: 'orange' },
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
    ],
    tier: 'featured',
    caseStudy: { label: 'Explore the UpRate case study' },
  },
  // Earlier roles: summary and points verbatim from the CV PDF (public/dan-hemsley-cv.pdf).
  {
    company: 'Independent Artist and Illustrator',
    role: 'Self-employed',
    dates: 'July 2021–July 2022',
    summary: 'Built an independent creative business focused on illustration, digital content and online community building.',
    points: [
      'Built a personal creative brand across social platforms.',
      'Grew an online audience to more than 100,000 followers through content strategy and live streaming.',
      'Collaborated with the TikTok UK Creator team to trial new platform features.',
      'Developed valuable insight into creator tools, digital communities and user engagement from the perspective of both customer and product user.',
    ],
    tier: 'standard',
  },
  {
    company: 'SixPorts',
    role: 'User Experience Designer',
    dates: 'March 2019–July 2021',
    summary: 'Worked closely with clients and stakeholders to define product direction and improve user experience across a suite of digital products.',
    points: [
      'Unified multiple products into a single UX strategy, improving customer satisfaction and creating a more consistent product experience.',
      'Produced early product concepts and interactive prototypes that accelerated stakeholder decision-making.',
      'Validated requirements directly with clients, reducing friction throughout the design and development process.',
      'Conducted user research and market analysis to identify opportunities and inform product decisions.',
    ],
    tier: 'standard',
  },
  {
    company: 'MCM Net',
    role: 'Front-End Developer',
    dates: 'July 2017–February 2019',
    summary: 'Delivered responsive web products while improving collaboration between design and development teams.',
    points: [
      'Delivered multiple small to medium-sized websites for clients across a range of industries.',
      'Introduced development processes that reduced delivery time for common website requirements by 50%.',
      'Embedded user-centred design practices into development workflows, improving product quality and customer satisfaction.',
      'Standardised components and templates, reducing design-to-development handover time and improving project consistency.',
    ],
    tier: 'compact',
  },
  {
    company: 'Pugpig',
    role: 'Designer and Front-End Developer',
    dates: 'August 2012–June 2017',
    summary: 'Contributed to the design and development of digital publishing products used by global media organisations.',
    points: [
      'Collaborated within a multidisciplinary team of 10–15 developers, delivering hundreds of digital publishing titles for multiple publishers.',
      'Unified the front-end design strategy, achieving full customer adoption, significantly reducing turnaround time for new customer onboarding.',
      'Led the company’s visual identity across two rebrands, including website design and development and marketing materials.',
      'Created wellbeing initiatives and championed mental health awareness within the company.',
    ],
    tier: 'compact',
  },
  {
    company: 'Calverley',
    role: 'Graphic Designer and Product Designer',
    dates: 'November 2007–July 2012',
    summary: 'Delivered creative solutions across print and digital media.',
    points: [
      'Developed internal tools that reduced response times for client enquiries by 65%.',
      'Established a new animation service that generated an additional sustained revenue stream for the business.',
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
