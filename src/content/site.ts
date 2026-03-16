export type RouteId = 'home' | 'download' | 'privacy' | 'terms' | 'support' | 'about' | 'status';

export interface RouteMeta {
  id: RouteId;
  label: string;
  path: string;
  title: string;
  description: string;
  canonicalPath: string;
}

export interface FeatureCardContent {
  title: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}


export const supportEmail = 'developer@stagedevices.com';
export const appStoreUrl = 'https://apps.apple.com/us/app/chrony-synced-notepad/id6756780213';
export const appStoreBadgeHref =
  'https://apps.apple.com/us/app/chrony-synced-notepad/id6756780213?itscg=30200&itsct=apps_box_badge&mttnsubad=6756780213';
export const appStoreBadgeImageUrl =
  'https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1766361600';
export const statusPageUrl = 'https://status.chronyapp.com';

export const routeMetaList: RouteMeta[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    title: 'chrony | One shared pad, always ready',
    description:
      'chrony is a synced notepad for writing, coding, and keeping one shared pad always ready.',
    canonicalPath: '/',
  },
  {
    id: 'download',
    label: 'Download',
    path: '/download',
    title: 'Download chrony for iPhone, iPad, and Mac',
    description:
      'Install chrony from the App Store and use one synced pad across iPhone, iPad, and Mac.',
    canonicalPath: '/download',
  },
  {
    id: 'privacy',
    label: 'Privacy',
    path: '/privacy',
    title: 'chrony Privacy Policy | Stage Devices',
    description:
      'Read how Stage Devices collects, uses, and protects data for chrony and its synced notepad services.',
    canonicalPath: '/privacy',
  },
  {
    id: 'terms',
    label: 'Terms',
    path: '/terms',
    title: 'chrony Terms of Use | Stage Devices',
    description:
      'Terms of Use for chrony, including subscriptions, service availability, and account responsibilities.',
    canonicalPath: '/terms',
  },
  {
    id: 'support',
    label: 'Support',
    path: '/support',
    title: 'chrony Support | Stage Devices',
    description:
      'Contact chrony support, review troubleshooting FAQs, and send diagnostics for faster help.',
    canonicalPath: '/support',
  },
  {
    id: 'about',
    label: 'About',
    path: '/about',
    title: 'About chrony | Stage Devices',
    description:
      'Learn about chrony, its synced writing workflow, and the Stage Devices team building it.',
    canonicalPath: '/about',
  },
  {
    id: 'status',
    label: 'Status',
    path: '/status',
    title: 'chrony Status | Stage Devices',
    description: 'Live chrony status from Better Stack.',
    canonicalPath: '/status',
  },
];

export const routeMetaById: Record<RouteId, RouteMeta> = routeMetaList.reduce(
  (acc, route) => {
    acc[route.id] = route;
    return acc;
  },
  {} as Record<RouteId, RouteMeta>,
);

export const featureCards: FeatureCardContent[] = [
  {
    title: 'One continuous pad',
    body: 'Start writing immediately. No setup, no project handoff, no waiting for state.',
  },
  {
    title: 'Synced account pad',
    body: 'Sign in with Apple and keep one shared document synchronized across devices.',
  },
  {
    title: 'Language-aware readability',
    body: 'Stay in AUTO for daily writing, then switch language mode for code-focused clarity.',
  },
  {
    title: 'Arctic chrome controls',
    body: 'Compact radii, restrained surfaces, and low-friction controls modeled after app chrome.',
  },
  {
    title: 'chrony pro workflows',
    body: 'Unlock timeline restore, sanitize and validate, pinned snapshots, and advanced language workflows.',
  },
  {
    title: 'Support diagnostics pipeline',
    body: 'Copy diagnostics in-app and send support reports with app version and subscription state details.',
  },
];

export const supportFaq: FaqItem[] = [
  {
    question: 'How do I contact support?',
    answer: `Email ${supportEmail}. Include what happened, what you expected, and what changed right before the issue.`,
  },
  {
    question: 'What diagnostics should I send?',
    answer:
      'Include app version, device, OS version, locale, sign-in status, and subscription state. The About and Support panel in chrony can copy diagnostics text.',
  },
  {
    question: 'Why is sync not updating?',
    answer:
      'Confirm Sign in with Apple is active, check connectivity, and reopen the app. chrony retries background synchronization and surfaces sync state in chrome hints.',
  },
  {
    question: 'How do I manage or cancel subscriptions?',
    answer:
      'Subscriptions are managed through App Store account subscription settings. Billing and refunds are handled by Apple according to App Store policies.',
  },
  {
    question: 'How do I delete synced account data?',
    answer:
      'Use the in-app account deletion flow while signed in. chrony requests remote pad deletion and queues retries if the backend is temporarily unavailable.',
  },
];

export const privacySections: LegalSection[] = [
  {
    heading: '1. Operator and scope',
    paragraphs: [
      'chrony is operated by Stage Devices. This Privacy Policy explains how data is handled for the chrony app and the chronyapp.com website.',
      'This policy applies to data processed when you use app features such as Apple Sign In, synchronized pads, subscriptions, and support contact channels.',
    ],
  },
  {
    heading: '2. Data we process',
    paragraphs: ['chrony may process the following categories of data:'],
    bullets: [
      'Account identifiers and profile fields from Sign in with Apple, including Apple account identifier and, when available, display name and email.',
      'Synced pad content and snapshots you create while using synchronization features.',
      'Subscription state and product entitlement signals returned by App Store purchase APIs.',
      'Support diagnostics you choose to share, such as app version, platform, locale, sign-in status, and subscription status.',
      'Support communication content sent to Stage Devices by email.',
      'Website access metadata required for hosting and delivery. The website does not use analytics cookies or tracking scripts in v1.',
    ],
  },
  {
    heading: '3. Why we process data',
    paragraphs: ['Stage Devices processes data only for service operation and support, including:'],
    bullets: [
      'Authenticating your account session and providing signed-in experiences.',
      'Syncing and restoring your shared pad content.',
      'Managing pro feature access tied to App Store subscription state.',
      'Responding to support requests and troubleshooting reported issues.',
      'Protecting service integrity, preventing abuse, and debugging service faults.',
    ],
  },
  {
    heading: '4. Data retention and deletion',
    paragraphs: [
      'Local account fields are stored on your device for session continuity and can be cleared by signing out.',
      'When you request account data deletion in-app, chrony requests remote pad deletion. If remote deletion cannot complete immediately, chrony queues retries until the deletion request succeeds.',
      'Support emails and related diagnostic information may be retained as needed to resolve your request and maintain support records.',
    ],
  },
  {
    heading: '5. Sharing and processors',
    paragraphs: [
      'Stage Devices does not sell personal data. Data may be processed by infrastructure and platform providers necessary to operate chrony, including Apple services for authentication and subscriptions and backend hosting providers for synchronization services.',
      'These providers process data under their own terms and privacy policies where applicable.',
    ],
  },
  {
    heading: '6. Security',
    paragraphs: [
      'Stage Devices applies reasonable technical and organizational safeguards for service operation. No method of storage or transmission is guaranteed to be perfectly secure.',
    ],
  },
  {
    heading: '7. Your choices',
    paragraphs: ['You can:'],
    bullets: [
      'Sign out to remove local session data from your device.',
      'Request account data deletion through in-app controls while signed in.',
      'Manage subscriptions through App Store account settings.',
      'Contact support to request help with privacy questions.',
    ],
  },
  {
    heading: '8. Children',
    paragraphs: [
      'chrony is not directed to children under 13. If you believe data was provided by a child under 13, contact Stage Devices for review and removal where appropriate.',
    ],
  },
  {
    heading: '9. Changes',
    paragraphs: [
      'Stage Devices may update this policy over time. Material updates will be reflected on this page with a revised effective date.',
    ],
  },
  {
    heading: '10. Contact',
    paragraphs: [
      `For privacy questions, contact Stage Devices at ${supportEmail}.`,
      'Effective date: March 15, 2026.',
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: '1. Agreement',
    paragraphs: [
      'These Terms of Use govern your use of chrony and chronyapp.com, operated by Stage Devices. By using chrony, you agree to these terms.',
    ],
  },
  {
    heading: '2. Service description',
    paragraphs: [
      'chrony provides a synchronized writing pad experience with optional paid pro features. Service features may evolve over time and may vary by platform and availability.',
    ],
  },
  {
    heading: '3. Accounts and acceptable use',
    paragraphs: ['You agree to:'],
    bullets: [
      'Provide accurate sign-in information through supported authentication flows.',
      'Use the service lawfully and avoid abusive, fraudulent, or harmful behavior.',
      'Avoid attempts to disrupt service infrastructure or other user access.',
      'Remain responsible for content you write, store, or share using chrony.',
    ],
  },
  {
    heading: '4. Subscriptions and billing',
    paragraphs: [
      'Paid features are offered through App Store subscriptions. Pricing, billing cycles, free trials, renewals, and cancellation are managed by Apple and subject to App Store terms.',
      'Stage Devices does not process direct card payments for in-app subscriptions.',
    ],
  },
  {
    heading: '5. Availability and changes',
    paragraphs: [
      'Stage Devices may modify, suspend, or discontinue features to maintain reliability, security, or product direction. While reasonable efforts are made to maintain uptime, uninterrupted availability is not guaranteed.',
    ],
  },
  {
    heading: '6. Intellectual property',
    paragraphs: [
      'chrony software, branding, and site content are owned by Stage Devices or its licensors. You may not copy, reverse engineer, or redistribute service components except as permitted by law.',
    ],
  },
  {
    heading: '7. Disclaimer',
    paragraphs: [
      'chrony is provided on an "as is" and "as available" basis. To the maximum extent permitted by law, Stage Devices disclaims warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
    ],
  },
  {
    heading: '8. Limitation of liability',
    paragraphs: [
      'To the maximum extent permitted by law, Stage Devices is not liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, profits, or business interruption arising from your use of chrony.',
    ],
  },
  {
    heading: '9. Termination',
    paragraphs: [
      'You may stop using chrony at any time. Stage Devices may suspend or terminate access for violation of these terms, abuse, or security risk.',
    ],
  },
  {
    heading: '10. Governing terms and contact',
    paragraphs: [
      'These terms are governed by applicable law in the jurisdiction where Stage Devices operates, unless otherwise required by law.',
      `For legal or support inquiries, contact ${supportEmail}.`,
      'Effective date: March 15, 2026.',
    ],
  },
];
