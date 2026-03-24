import {
  Certificate,
  EducationEntry,
  PortfolioContent,
  Project,
  Skill
} from '../models/portfolio.models';

export const portfolioContent: PortfolioContent = {
  hero: {
    name: 'Harsh Raj',
    tagline: 'DevOps • Cloud • Full Stack Engineer',
    intro:
      'Computer Science student building cloud-native systems, DevOps pipelines, and modern full stack applications.',
    profileImage: 'assets/images/profile/profile.jpg',
    cvUrl: 'assets/Harsh-Raj-CV.pdf',
    links: [
      { label: 'GitHub', href: 'https://github.com/harsh-raj04' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harshraj04/' }
    ],
    techStack: [
      { label: 'Docker', color: '#3B82F6', position: 'top-8 left-6', delay: '0s' },
      { label: 'AWS', color: '#F59E0B', position: 'top-16 right-10', delay: '0.8s' },
      { label: 'React', color: '#22C55E', position: 'bottom-16 left-12', delay: '1.4s' },
      { label: 'Node', color: '#0F172A', position: 'bottom-10 right-12', delay: '2s' },
      { label: 'MongoDB', color: '#22C55E', position: 'top-1/2 left-2', delay: '2.5s' }
    ]
  },
  aboutCards: [
    {
      title: 'Cloud & DevOps',
      icon: 'cloud',
      description: 'Focus on automation, infrastructure as code, and CI/CD.'
    },
    {
      title: 'Full Stack Development',
      icon: 'code',
      description: 'Building scalable web apps using modern JS stacks.'
    },
    {
      title: 'Problem Solver',
      icon: 'brain',
      description: 'Strong DSA foundation and systems thinking.'
    }
  ],
  contactLinks: [
    { label: 'GitHub', href: 'https://github.com/harsh-raj04' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harshraj04/' },
    { label: 'Email', href: 'mailto:nameharshraj@gmail.com' },
    { label: 'Phone', href: 'tel:+917992336832' }
  ],
  contributionGraph: [
    [1, 2, 3, 1, 4, 2, 0],
    [0, 1, 2, 3, 4, 2, 1],
    [2, 3, 1, 4, 2, 1, 3],
    [3, 4, 2, 2, 1, 0, 2],
    [2, 1, 3, 4, 3, 2, 1],
    [4, 2, 1, 3, 2, 4, 2],
    [1, 2, 4, 2, 3, 1, 4],
    [0, 1, 3, 2, 4, 3, 2],
    [2, 4, 1, 3, 1, 2, 4],
    [4, 3, 2, 1, 2, 4, 1]
  ]
};

export const fallbackProjects: Project[] = [
  {
    slug: 'devops-food-delivery-pipeline',
    title: 'DevOps Food Delivery Pipeline',
    summary: 'Infrastructure-first delivery platform focused on automation, release speed, and cloud reliability.',
    metric: { label: 'Deployment speed', value: '45% faster' },
    previewImage: 'assets/images/projects/devops-pipeline-preview.svg',
    architectureImage: 'assets/images/diagrams/devops-pipeline-diagram.svg',
    techStack: ['AWS', 'Terraform', 'Docker', 'Jenkins', 'Node.js'],
    categories: ['DevOps', 'Cloud', 'Node.js'],
    highlights: [
      'AWS infrastructure',
      'Terraform automation',
      'Docker containers',
      'Jenkins CI/CD'
    ],
    features: [
      'Reusable infrastructure modules for repeatable environments.',
      'Pipeline stages for build, validation, and automated deployment.',
      'Operational observability and rollback-friendly delivery.'
    ],
    gallery: [
      {
        type: 'screenshot',
        label: 'Pipeline board',
        image: 'assets/images/projects/devops-pipeline-preview.svg'
      },
      {
        type: 'diagram',
        label: 'Architecture diagram',
        image: 'assets/images/diagrams/devops-pipeline-diagram.svg'
      }
    ],
    githubUrl: 'https://github.com/harsh-raj04/Zomato-devops-pipeline',
    order: 1
  },
  {
    slug: 'ai-task-manager',
    title: 'AI Task Manager',
    summary: 'Productivity workspace blending a fast dashboard UI with assistant-driven task suggestions.',
    metric: { label: 'UI responsiveness', value: 'Sub-second' },
    previewImage: 'assets/images/projects/ai-task-manager-preview.svg',
    architectureImage: 'assets/images/diagrams/ai-task-manager-diagram.svg',
    techStack: ['React', 'Node.js', 'MongoDB', 'OpenAI', 'Express'],
    categories: ['Full Stack', 'AI', 'MongoDB'],
    highlights: ['React frontend', 'Node backend', 'MongoDB database', 'Smart task suggestions'],
    features: [
      'Task triage views optimized for quick scanning.',
      'AI-assisted suggestions integrated into the planning flow.',
      'Separation between UI state, API state, and persistence.'
    ],
    gallery: [
      {
        type: 'screenshot',
        label: 'Dashboard preview',
        image: 'assets/images/projects/ai-task-manager-preview.svg'
      },
      {
        type: 'diagram',
        label: 'Architecture diagram',
        image: 'assets/images/diagrams/ai-task-manager-diagram.svg'
      }
    ],
    githubUrl: '',
    order: 2
  },
  {
    slug: 'tax-calculator',
    title: 'Tax Calculator',
    summary: 'Interactive calculator comparing old and new tax regimes with live computation feedback.',
    metric: { label: 'Decision support', value: 'Instant comparison' },
    previewImage: 'assets/images/projects/tax-calculator-preview.svg',
    architectureImage: 'assets/images/diagrams/tax-calculator-diagram.svg',
    techStack: ['Java', 'JavaScript', 'HTML', 'CSS'],
    categories: ['Java', 'Frontend'],
    highlights: [
      'Old vs New regime',
      'Real-time calculations',
      'Java logic',
      'JS frontend'
    ],
    features: [
      'Realtime UI feedback for income and deduction inputs.',
      'Computation model separated from presentation logic.',
      'Readable result summaries for side-by-side regime comparison.'
    ],
    gallery: [
      {
        type: 'screenshot',
        label: 'Calculator preview',
        image: 'assets/images/projects/tax-calculator-preview.svg'
      },
      {
        type: 'diagram',
        label: 'Calculation flow',
        image: 'assets/images/diagrams/tax-calculator-diagram.svg'
      }
    ],
    githubUrl: 'https://github.com/harsh-raj04/Tax-Calculator',
    order: 3
  },
  {
    slug: 'medical-appointment-website',
    title: 'Medical Appointment Website',
    summary: 'Booking experience designed for fast scheduling, clean validation, and simplified patient flow.',
    metric: { label: 'Booking workflow', value: 'Simplified' },
    previewImage: 'assets/images/projects/medical-appointment-preview.svg',
    architectureImage: 'assets/images/diagrams/medical-appointment-diagram.svg',
    techStack: ['JavaScript', 'HTML', 'CSS', 'Node.js'],
    categories: ['Frontend', 'UX', 'Node.js'],
    highlights: [
      'Doctor scheduling',
      'Form validation',
      'Simplified booking workflow',
      'Responsive interface'
    ],
    features: [
      'Fast patient scheduling flow with clear status feedback.',
      'Responsive layout with accessible form states.',
      'Expandable architecture for future backend integrations.'
    ],
    gallery: [
      {
        type: 'screenshot',
        label: 'Booking preview',
        image: 'assets/images/projects/medical-appointment-preview.svg'
      },
      {
        type: 'diagram',
        label: 'Booking flow',
        image: 'assets/images/diagrams/medical-appointment-diagram.svg'
      }
    ],
    githubUrl: 'https://github.com/harsh-raj04/Medical-Appointment-Website',
    order: 4
  }
];

export const fallbackSkills: Skill[] = [
  { category: 'Languages', name: 'Java', iconKey: 'java', level: 90, accent: '#3B82F6', description: 'Backend logic, DSA, and object-oriented problem solving.', order: 1 },
  { category: 'Languages', name: 'C++', iconKey: 'cpp', level: 84, accent: '#22C55E', description: 'Performance-focused programming and algorithm practice.', order: 2 },
  { category: 'Languages', name: 'C', iconKey: 'c', level: 78, accent: '#06B6D4', description: 'Systems fundamentals and memory-level reasoning.', order: 3 },
  { category: 'Languages', name: 'Python', iconKey: 'python', level: 82, accent: '#3B82F6', description: 'Automation scripts and productivity tooling.', order: 4 },
  { category: 'Languages', name: 'JavaScript', iconKey: 'javascript', level: 88, accent: '#22C55E', description: 'Frontend interactions and full stack product work.', order: 5 },
  { category: 'Languages', name: 'Shell scripting', iconKey: 'shell', level: 80, accent: '#14B8A6', description: 'Local automation, deployment flows, and operational tasks.', order: 6 },
  { category: 'Frameworks', name: 'React', iconKey: 'react', level: 86, accent: '#3B82F6', description: 'Component-driven UI development and dashboard experiences.', order: 7 },
  { category: 'Frameworks', name: 'Node.js', iconKey: 'node', level: 85, accent: '#22C55E', description: 'API design, runtime tooling, and backend services.', order: 8 },
  { category: 'Frameworks', name: 'HTML', iconKey: 'html', level: 92, accent: '#F97316', description: 'Semantic markup and landing-page structure.', order: 9 },
  { category: 'Frameworks', name: 'CSS', iconKey: 'css', level: 89, accent: '#3B82F6', description: 'Responsive design systems and motion-rich UI polish.', order: 10 },
  { category: 'DevOps Tools', name: 'AWS', iconKey: 'aws', level: 85, accent: '#F59E0B', description: 'Cloud infrastructure and deployment environments.', order: 11 },
  { category: 'DevOps Tools', name: 'Docker', iconKey: 'docker', level: 88, accent: '#3B82F6', description: 'Containerized workflows for consistent delivery.', order: 12 },
  { category: 'DevOps Tools', name: 'Jenkins', iconKey: 'jenkins', level: 80, accent: '#22C55E', description: 'CI/CD orchestration and automated delivery pipelines.', order: 13 },
  { category: 'DevOps Tools', name: 'Terraform', iconKey: 'terraform', level: 84, accent: '#8B5CF6', description: 'Infrastructure as code and repeatable provisioning.', order: 14 },
  { category: 'DevOps Tools', name: 'Git', iconKey: 'git', level: 90, accent: '#F97316', description: 'Version control and collaborative engineering workflows.', order: 15 },
  { category: 'DevOps Tools', name: 'GitHub', iconKey: 'github', level: 92, accent: '#6366F1', description: 'Repository management and project collaboration.', order: 16 },
  { category: 'DevOps Tools', name: 'Linux', iconKey: 'linux', level: 83, accent: '#22C55E', description: 'Command-line operations and server fundamentals.', order: 17 },
  { category: 'DevOps Tools', name: 'Maven', iconKey: 'maven', level: 75, accent: '#3B82F6', description: 'Java build automation and dependency management.', order: 18 },
  { category: 'DevOps Tools', name: 'MongoDB', iconKey: 'mongodb', level: 81, accent: '#22C55E', description: 'Document modeling and application persistence.', order: 19 }
];

export const fallbackEducation: EducationEntry[] = [
  {
    period: '2023 - Present',
    institution: 'Lovely Professional University',
    program: 'B.Tech Computer Science',
    scoreLabel: 'CGPA',
    scoreValue: '8.33',
    location: 'Punjab, India',
    order: 1
  },
  {
    period: '2020 - 2021',
    institution: 'SP Jain College',
    program: 'Intermediate',
    scoreLabel: 'Score',
    scoreValue: '69%',
    location: 'Sasaram, India',
    order: 2
  },
  {
    period: '2018 - 2019',
    institution: 'Dedicated Public School',
    program: 'Matriculation',
    scoreLabel: 'Score',
    scoreValue: '78%',
    location: 'Sasaram, India',
    order: 3
  }
];

export const fallbackCertificates: Certificate[] = [
  {
    title: 'DSA using Java',
    issuer: 'Cipher School',
    logo: 'assets/images/certificates/cipher-school-logo.svg',
    previewImage: 'assets/images/certificates/cipher-school-certificate-preview.svg',
    credentialUrl: 'https://www.cipherschools.com/certificate/preview?id=6888e124d6aded19153caa60',
    order: 1
  },
  {
    title: 'Computer Networking',
    issuer: 'Coursera',
    logo: 'assets/images/certificates/coursera-logo.svg',
    previewImage: 'assets/images/certificates/coursera-networking-certificate-preview.svg',
    credentialUrl: 'https://coursera.org/share/c9f8cffd1ef017a5175234f6b69ae28f',
    order: 2
  },
  {
    title: 'Computer Communications',
    issuer: 'Coursera',
    logo: 'assets/images/certificates/coursera-logo.svg',
    previewImage: 'assets/images/certificates/coursera-communications-certificate-preview.svg',
    credentialUrl: 'https://coursera.org/share/62590cc34dd5ab07632e150686383a00',
    order: 3
  }
];
