// All case-study copy, verbatim from the published page. Do not edit wording here
// without updating the source design.
import type { ImageSlug } from './images';

export type Accent = 'blue' | 'red' | 'purple' | 'orange';
export interface Pic {
  slug: ImageSlug;
  alt: string;
}

export const hero = {
  title: 'UpRate',
  subtitle: 'Resource management software for plant hire firms',
  meta: 'Senior Product Designer · B2B SaaS · 4 years',
  skills: [
    { label: 'Product Strategy', accent: 'blue' },
    { label: 'Research', accent: 'red' },
    { label: 'Design Systems', accent: 'purple' },
    { label: 'Engineering Collaboration', accent: 'orange' },
  ] as { label: string; accent: Accent }[],
  summary:
    "I led design across UpRate's connected back-office workflows, working closely with customers, the founder and engineering to simplify complex operational processes and create a more coherent product experience.",
  cta: 'Explore the case study',
  collage: {
    main: { slug: 'hero-labour-scheduler', alt: 'UpRate dashboard overview' },
    contract: { slug: 'hero-sales-manager', alt: 'UpRate contract view' },
    resourcePanel: { slug: 'hero-invoicing', alt: 'UpRate resource panel' },
    scheduling: { slug: 'hero-timesheets', alt: 'UpRate scheduling view' },
    resourceDetails: { slug: 'hero-contract-editor', alt: 'UpRate resource details' },
    invoice: { slug: 'hero-labour-resources', alt: 'UpRate invoice view' },
  } satisfies Record<string, Pic>,
};

export const connecting = {
  title: 'Connecting the back office.',
  badge: 'One system, six connected areas',
  areas: [
    { title: 'Sales Manager', text: 'Create & Manage Customer Contracts', accent: 'blue' },
    { title: 'Hire Contract Editor', text: 'Create, Edit, Send & Sign hire contracts.', accent: 'red' },
    { title: 'Asset & Labour Resources', text: 'Add Full Inventory Details, Notes & Supporting Documents', accent: 'purple' },
    { title: 'Plant & Labour Schedulers', text: 'Schedule Contract Requirements - Assign Resources', accent: 'red' },
    { title: 'Timesheets', text: 'Sent Text Notifications & Track Submissions', accent: 'purple' },
    { title: 'Invoicing', text: 'Review, Track and Process all Invoices - Everything in one place.', accent: 'orange' },
  ] as { title: string; text: string; accent: Accent }[],
};

export const teams = {
  title: 'Different teams assemble around the same information.',
  intro:
    'Each role worked from the same underlying job information, entering the workflow at different points and using it to make different decisions.',
  roles: [
    { title: 'Contract Managers', lead: 'Job requirement & signed agreements.', text: 'Forming hire contracts to drive resource booking and charge items for invoicing.', accent: 'blue' },
    { title: 'Hiring Managers', lead: 'Fulfil job requirement bookings.', text: 'Booking assignments with specific plant & labour resources onto the scheduler.', accent: 'red' },
    { title: 'Assigned Labour', lead: 'Complete jobs & submit documents.', text: 'Timesheets, invoices, safety checks & reports get sent back to the specific job in the system.', accent: 'purple' },
    { title: 'Accounts Managers', lead: 'Ensuring all invoices are correct and sent out.', text: 'Invoices move through draft - review - approved & sent stages.', accent: 'orange' },
  ] as { title: string; lead: string; text: string; accent: Accent }[],
};

export const handoffs = {
  title: 'The complexity lived in the handoffs.',
  intro:
    'Each job moved through multiple teams, documents and decisions. Changes to contracts, resources and completed work had consequences elsewhere in the system, making continuity between workflows as important as the individual interfaces.',
  scheduler: {
    slug: 'cs-asset-scheduler',
    alt: 'UpRate plant & labour scheduler showing resource rows and assignment blocks across a weekly timeline',
  } as Pic,
  annotations: [
    { title: 'Time and resources formed the organising grid', text: 'Resources remained anchored in rows while dates ran across columns, giving schedulers a stable frame for comparing availability and assignments.' },
    { title: 'Assignment blocks carried essential context', text: 'Each block surfaced the customer or site, duration and operational state, allowing schedulers to scan the plan before opening the complete record.' },
    { title: 'Detail appeared without losing the wider plan', text: 'Selecting an assignment revealed its requirements, notes and linked information alongside the schedule, preserving the context of surrounding work.' },
  ],
  sticker: {
    label: 'Assignment Sticker',
    site: 'Tower Hamlets Civic Centre',
    ref: 'KLB002',
    customer: 'Keltbray',
    requirement: '1 no 50 tonne swl MOD spreader beam 4m long',
    price: '£3850.00 + VAT',
    note: 'Tom - please take DS17 VZF as your tractor unit is required in the garage',
    operator: 'Oliver Bishop - Operator',
    operatorMore: '+2',
    states: ['Hire Contract Signed', 'Contract On Hold'],
  },
  columns: [
    {
      label: 'SCALE',
      title: 'Weeks of work in one view',
      text: 'Schedulers managed concurrent bookings across labour, cranes, transport and equipment. Individual resources could have multiple assignments in one day, each with different durations and states.',
      images: [{ slug: 'cs-scale', alt: 'Scheduler scale view' }],
    },
    {
      label: 'DEPENDENCY',
      title: 'Every assignment relied on connected information',
      text: 'A scheduled assignment brought together the customer, job requirements, time, resources, hire agreement, charges and supporting documents. The Scheduler could not operate as an isolated calendar.',
      images: [
        { slug: 'cs-dependency-a', alt: 'Assignment dependency view' },
        { slug: 'cs-dependency-b', alt: 'Resource panel' },
      ],
    },
    {
      label: 'CHANGE',
      title: 'One update could affect the wider workflow',
      text: 'Moving a booking, replacing a resource or cancelling an assignment could affect timesheets, approvals, charges and final invoicing. Changes needed to remain visible and understandable across teams.',
      images: [
        { slug: 'cs-change-timesheets', alt: 'Assignment change view' },
        { slug: 'cs-change-invoicing', alt: 'Resource assignment panel' },
      ],
    },
  ] as { label: string; title: string; text: string; images: Pic[] }[],
};

export const convergence = {
  title: 'Scheduling was where the whole system converged.',
  intro:
    'The scheduling experience brought contract requirements, resource availability and downstream timesheet and invoicing needs together in one workflow.',
  flow: ['Contract Requirement', 'Assignment', 'Resource Availability'],
  main: { slug: 'contract-scheduler', alt: 'Scheduling interface overview' } as Pic,
  details: [
    { slug: 'assignment-detail', alt: 'Scheduling resource panel' },
    { slug: 'labour-resources', alt: 'Scheduling assignment detail' },
  ] as Pic[],
};

export const workExisted = {
  title: 'The work existed before a resource was assigned.',
  intro:
    'Repeated customer conversations showed that hiring managers often knew what a job required before they knew which person or asset would fulfil it. The resource-first workflow pushed them towards a decision they were not ready to make.',
  existing: { label: 'Existing Workflow', steps: ['Resource', 'Booking'] },
  required: { label: 'Required Workflow', steps: ['Customer', 'Engagement', 'Assignment', 'Resource'] },
  research: [
    { slug: 'research-whiteboard', alt: 'Early scheduling wireframe' },
    { slug: 'research-spreadsheet', alt: 'Resource-first workflow mockup' },
    { slug: 'research-screen', alt: 'Assignment model exploration' },
  ] as Pic[],
  legacy: { slug: 'legacy-scheduler', alt: 'Assignment workflow overview' } as Pic,
  legacyCaption: "The Assignment already existed within UpRate's data model and APIs, but it wasn't organising the user experience.",
  mockup: {
    slug: 'assignment-mockup',
    alt: 'Early mock-up introducing the Assignment level independently of the resource-first approach',
  } as Pic,
  mockupCaption: 'Early mock-up introducing the assignment level independently of the resource-first approach.',
};

export const decisions = {
  title: 'The product decisions that mattered.',
  intro: 'These decisions transformed scheduling from a fixed resource booking into a workflow that could evolve with the job.',
  items: [
    { title: 'Make the assignment explicit', text: 'Expose the Assignment as a first-class level in the interface, allowing requirements and resources to be managed around the work itself.', accent: 'blue' },
    { title: 'Capture requirements before allocation', text: 'Contract and Hiring Managers could define evolving labour or asset requirements before committing to a specific resource.', accent: 'red' },
    { title: 'Change resources without rebuilding the assignment', text: 'Resources could be replaced or removed as real-world plans changed, while the Assignment and its wider job context remained intact.', accent: 'purple' },
    { title: 'Keep connected changes visible', text: 'Assignment-level changes could update grouped resources together, while individual availability conflicts remained visible.', accent: 'orange' },
  ] as { title: string; text: string; accent: Accent }[],
};

export const phases = {
  title: 'Designed to evolve in phases.',
  intro:
    'Working with Product and Engineering, I separated the immediate customer need from the wider architectural change, enabling early delivery without closing off future capability.',
  items: [
    { label: 'Phase 1', text: 'Delivered the immediate scheduling capability and received positive customer feedback.', accent: 'blue' },
    { label: 'Phase 2', text: 'Extended the workflow without redesigning its foundation.', accent: 'red' },
    { label: 'Phase 3', text: 'Established the Assignment-led foundation for future scheduling capability.', accent: 'purple' },
  ] as { label: string; text: string; accent: Accent }[],
};

export const outcome = {
  title: 'The workflow no longer started with a resource.',
  intro:
    'Contract and Hiring Managers could define the work from its requirements, allocate labour and assets when ready, and adapt those resources without rebuilding the Assignment.',
  callout: 'Phase 1 shipped to customers, received positive feedback and became the foundation for subsequent scheduling releases.',
  main: { slug: 'contract-scheduler-shipped', alt: 'UpRate scheduler with Assignment-led workflow' } as Pic,
  overlay: { slug: 'assignment-actions', alt: 'Assignment detail overlay' } as Pic,
  results: [
    { label: 'PLANNING', title: 'Plan before allocating', text: 'Jobs could enter the scheduling workflow before a specific person or asset had been selected.', accent: 'blue' },
    { label: 'ADAPTABILITY', title: 'Adapt without rebuilding', text: 'Resources could be replaced or removed while the Assignment, requirements and wider job context remained intact.', accent: 'purple' },
    { label: 'FOUNDATION', title: 'Extend without starting again', text: 'Later scheduling capabilities were added to the same Assignment-led foundation established in the first release.', accent: 'purple' },
  ] as { label: string; title: string; text: string; accent: Accent }[],
};

export const connectedNext = {
  title: 'The Assignment connected what happened next.',
  intro:
    'Once work was scheduled, the same underlying job context carried through timesheet submission, review and invoicing. Each team could act on the information they needed without rebuilding the job at every handoff.',
  flow: ['Scheduled Assignment', 'Timesheet', 'Approval', 'Invoice'],
  callout: 'Different teams needed different interfaces, but the work remained connected throughout.',
  panels: [
    {
      label: 'Timesheets',
      accent: 'purple',
      title: 'Scheduled work became evidence of completed work.',
      text: 'Assigned labour submitted timesheets against the work they had completed. Hiring Managers could track submissions and Accounts could work from the same underlying record.',
      image: { slug: 'cs-panel-timesheets', alt: 'Timesheet submission interface' },
    },
    {
      label: 'Invoice',
      accent: 'orange',
      title: 'Accounts could see what was ready and what was blocking invoicing.',
      text: 'Timesheet and contract information carried forward into the invoicing workflow, giving Accounts the evidence and status needed to move each job forward.',
      image: { slug: 'cs-panel-invoicing', alt: 'Invoice management interface' },
    },
  ] as { label: string; accent: Accent; title: string; text: string; image: Pic }[],
};

export const designSystem = {
  title: 'One system needed one design language.',
  intro:
    'As the product expanded, I worked closely with Engineering to turn recurring patterns and workflow rules into reusable components, variants and tokens. This created a shared language for designing and implementing new workflows consistently.',
  overview: { slug: 'ds-overview', alt: 'UpRate design system overview' } as Pic,
  gallery: [
    { label: 'Colour', slug: 'ds-colour', alt: 'Colour tokens' },
    { label: 'Themes', slug: 'ds-themes', alt: 'Theme documentation' },
    { label: 'Modes', slug: 'ds-modes', alt: 'Component modes' },
    { label: 'Spacing', slug: 'ds-spacing', alt: 'Spacing system' },
    { label: 'Typography', slug: 'ds-typography', alt: 'Typography scales' },
  ] as (Pic & { label: string })[],
  principles: [
    { title: 'Built around real workflows', text: 'Recurring scheduling and management patterns became reusable structures rather than isolated screens.' },
    { title: 'States were designed into the system', text: 'Components accounted for empty, selected, blocked and completed states alongside their defaults.' },
    { title: 'Shared with Engineering', text: 'Documented components and tokens provided a common reference during implementation and review.' },
  ],
  callout: 'The system helped the product expand without fragmenting its interaction patterns or visual language.',
};

export const howIWork = {
  title: 'Making the reasoning visible kept the team moving.',
  intro:
    'I worked with customers, Product, the founder and Engineering to build shared understanding, make trade-offs visible and connect decisions from discovery through delivery.',
  callout: 'Shared reasoning kept customer evidence connected to what shipped.',
  practices: [
    { label: 'CUSTOMERS', title: 'Listen across the workflow', text: 'Regular conversations and on-site sessions showed how work moved between Contract Managers, Hiring Managers, labour and Accounts—and where context was lost.', accent: 'blue' },
    { label: 'FRAMING', title: 'Separate the problem from the first solution', text: 'Customers and stakeholders often arrived with proposed answers. I mapped workflows and data relationships to separate the underlying need from the initial suggestion.', accent: 'red' },
    { label: 'DECISIONS', title: 'Turn disagreement into testable choices', text: 'When perspectives differed, I represented each direction fairly, surfaced its assumptions and compared flows and prototypes against customer evidence. This allowed the direction to change when the evidence supported it.', accent: 'purple' },
    { label: 'DELIVERY', title: 'Stay close through implementation', text: 'I involved engineers early and adapted the detail through Figma comments, stand-up questions and smaller decision chunks. This reduced Design QA time and kept the Assignment model intact through phased delivery.', accent: 'orange' },
  ] as { label: string; title: string; text: string; accent: Accent }[],
};

export const closing = {
  title: 'The strongest design decision lived beneath the interface.',
  paragraphs: [
    'Making the Assignment explicit gave requirements, resources, time and completed work a stable place within the product. Different teams could enter the workflow at different moments without losing the shared job context between them.',
    'This work reinforced the approach I bring to complex B2B products: understand how work moves across roles, model the relationships beneath the interface, and make the reasoning visible so customers, Product and Engineering can shape the answer together.',
  ],
  callout: 'The result was more than a new scheduler, it was a foundation the wider back office could continue to build on.',
};
