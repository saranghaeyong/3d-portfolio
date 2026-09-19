import { ProjectItem, SkillItem, NavStation, EducationItem, CertificationItem } from '../types';

export const PERSONAL_DATA = {
  name: "SARANG R N",
  primaryTitle: "MCA GRADUATE",
  secondaryTitle: "SOFTWARE DEVELOPMENT | PYTHON | MACHINE LEARNING",
  shortIdentity: "Software Developer & Machine Learning Enthusiast",
  location: "Kakkanad, Ernakulam, Kerala, India",
  email: "rnsarang@gmail.com",
  phone: "7994963196",
  tagline: "BUILDING IDEAS INTO SOFTWARE.",
  subTagline: "CODE. CREATE. EXPLORE.",
  
  about: {
    summary:
      "Sarang R N is an MCA graduate with a solid academic foundation in software development, Python, Java, C, SQL/MySQL, and modern web technologies, combined with a strong interest in machine learning and building practical software solutions. His technical journey encompasses an MCA from Cochin University of Science and Technology (CUSAT), a BCA from Bharata Mata College of Science and Arts, Higher Secondary (Science Biology) from Cardinal Higher Secondary, Thrikkakara, secondary school from St Alberts HS, Ernakulam, along with professional computer training and certifications in Web Designing, Desktop Publishing, and Computer Applications from Softmedia Computer Training.",
    role: "Software Developer / Machine Learning Enthusiast",
    education: "Master of Computer Applications (CUSAT)",
    undergrad: "Bachelor of Computer Applications (Bharata Mata College)",
    location: "Kakkanad, Ernakulam, Kerala, India",
    trainingInstitution: "Softmedia Computer Training",
    focus: [
      "Software Development",
      "Python & Algorithms",
      "Machine Learning",
      "Database Systems",
      "Web Technologies"
    ],
    academicJourney: [
      "MCA — Cochin University of Science and Technology (CUSAT)",
      "BCA — Bharata Mata College of Science and Arts",
      "Plus Two (Science Biology) — Cardinal Higher Secondary, Thrikkakara",
      "10th — St Alberts HS, Ernakulam",
      "Professional Computer Training — Softmedia Computer Training"
    ]
  },

  educationOverview: {
    highestDegree: "Master of Computer Applications (MCA)",
    highestInstitution: "Cochin University of Science and Technology (CUSAT)",
    cgpa: "7.66 / 10",
    classification: "First Class"
  },

  resumeSummary:
    "MCA graduate from Cochin University of Science and Technology with a CGPA of 7.66/10 (First Class), holding a BCA from Bharata Mata College of Science and Arts (CCPA 6.24/10, B Class). Grounded in Python, Java, C, SQL/MySQL, and web technologies with certified professional training in Web Designing, DTP, and Computer Applications from Softmedia Computer Training. Strong academic project experience in machine learning and software development, with an interest in building practical and interactive software solutions."
};

export const NAV_STATIONS: NavStation[] = [
  { id: 'intro', number: '01', label: 'HOME', objectName: 'StationDesk' },
  { id: 'about', number: '02', label: 'ABOUT', objectName: 'StationAbout' },
  { id: 'skills', number: '03', label: 'SKILLS', objectName: 'StationSkills' },
  { id: 'education', number: '04', label: 'EDUCATION', objectName: 'StationEducation' },
  { id: 'certifications', number: '05', label: 'CERTIFICATIONS', objectName: 'StationCertifications' },
  { id: 'projects', number: '06', label: 'PROJECTS', objectName: 'StationProjects' },
  { id: 'resume', number: '07', label: 'RESUME', objectName: 'StationResume' },
  { id: 'contact', number: '08', label: 'CONTACT', objectName: 'StationContact' },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-mca",
    order: 4,
    qualification: "Master of Computer Applications (MCA)",
    degreeCode: "MCA",
    institution: "Cochin University of Science and Technology (CUSAT)",
    score: "7.66 / 10",
    scoreType: "CGPA",
    classification: "First Class",
    isHighest: true,
    shortDescription:
      "Advanced postgraduate program specializing in software architecture, algorithms, relational database systems, and machine learning foundations.",
    highlights: [
      "Highest Academic Qualification",
      "CGPA: 7.66/10 (First Class)",
      "Cochin University of Science and Technology"
    ]
  },
  {
    id: "edu-bca",
    order: 3,
    qualification: "Bachelor of Computer Applications (BCA)",
    degreeCode: "BCA",
    institution: "Bharata Mata College of Science and Arts",
    duration: "2019–2022",
    year: "2019–2022",
    score: "6.24 / 10",
    scoreType: "CCPA",
    classification: "B Class",
    isHighest: false,
    shortDescription:
      "Undergraduate computer applications degree providing rigorous foundations in programming languages, object-oriented concepts, relational databases, and operating systems.",
    highlights: [
      "Duration: 2019–2022",
      "CCPA: 6.24/10",
      "Class: B Class"
    ]
  },
  {
    id: "edu-plustwo",
    order: 2,
    qualification: "Higher Secondary / Plus Two",
    degreeCode: "PLUS TWO",
    stream: "Science Biology",
    institution: "Cardinal Higher Secondary, Thrikkakara",
    duration: "2017–2019",
    year: "2017–2019",
    isHighest: false,
    shortDescription:
      "Higher secondary education focused on Science Biology, building scientific methodology, logical reasoning, and mathematics principles.",
    highlights: [
      "Stream: Science Biology",
      "Duration: 2017–2019",
      "Thrikkakara, Ernakulam"
    ]
  },
  {
    id: "edu-10th",
    order: 1,
    qualification: "High School / 10th",
    degreeCode: "10TH",
    institution: "St Alberts HS, Ernakulam",
    duration: "2012–2017",
    year: "2012–2017",
    isHighest: false,
    shortDescription:
      "Secondary school education establishing foundational analytical skills, mathematics, general sciences, and language comprehension.",
    highlights: [
      "Duration: 2012–2017",
      "Ernakulam, Kerala"
    ]
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "cert-web",
    title: "Diploma in Web Designing",
    credentialType: "DIPLOMA",
    institution: "Softmedia Computer Training",
    year: "2019",
    shortDescription:
      "Comprehensive training in modern web design, UI layout structuring, visual hierarchy, and client-side web markup technologies.",
    competencies: [
      "Web Layout Design",
      "HTML & CSS UI Structuring",
      "Digital Interface Composition"
    ]
  },
  {
    id: "cert-dtp",
    title: "Desktop Publishing (DTP)",
    credentialType: "CERTIFICATION",
    institution: "Softmedia Computer Training",
    year: "2018",
    shortDescription:
      "Professional curriculum in digital publication composition, typography, print and digital media layout, and graphic document management.",
    competencies: [
      "Desktop Publishing (DTP)",
      "Document Structuring",
      "Graphic Typography"
    ]
  },
  {
    id: "cert-dca",
    title: "Diploma in Computer Applications",
    credentialType: "DIPLOMA",
    institution: "Softmedia Computer Training",
    year: "2017",
    shortDescription:
      "Foundational computer training covering computer operations, standard software applications, digital documentation, and computing essentials.",
    competencies: [
      "Computer Applications",
      "Digital Office Utilities",
      "Operating System Essentials"
    ]
  }
];

export const SKILLS_DATA: SkillItem[] = [
  // Programming
  {
    name: "PYTHON",
    category: "LANGUAGE",
    description:
      "Programming language used for software development, automation, data processing and machine-learning workflows.",
    tags: ["Core Python", "Automation", "Data Pipelines"]
  },
  {
    name: "JAVA",
    category: "LANGUAGE",
    description:
      "Object-oriented programming language used for application development.",
    tags: ["OOP", "Robust Backends", "Algorithms"]
  },
  {
    name: "C",
    category: "LANGUAGE",
    description:
      "Foundational programming language used for low-level systems logic, memory concepts, and algorithmic foundations.",
    tags: ["Procedural Logic", "Pointers", "Core Systems"]
  },

  // Database
  {
    name: "SQL",
    category: "DATABASE",
    description:
      "Standard language for storing, querying, manipulating and managing relational databases.",
    tags: ["Relational Schema", "Queries", "Data Integrity"]
  },
  {
    name: "MYSQL",
    category: "DATABASE",
    description:
      "Database technologies for storing, querying and managing structured data.",
    tags: ["RDBMS", "Indexing", "Transactions"]
  },

  // Web
  {
    name: "HTML",
    category: "WEB",
    description:
      "Standard markup language for creating structured, semantic web applications.",
    tags: ["Semantic Markup", "Accessibility", "DOM"]
  },
  {
    name: "CSS",
    category: "WEB",
    description:
      "Style sheet language used for designing responsive, modern user interfaces and layouts.",
    tags: ["Responsive Design", "Flexbox & Grid", "Modern UI"]
  },
  {
    name: "JAVASCRIPT",
    category: "WEB",
    description:
      "Dynamic scripting language for interactive web client logic and modern browser experiences.",
    tags: ["Async Logic", "DOM Manipulation", "ES6+"]
  },

  // Machine Learning
  {
    name: "MACHINE LEARNING",
    category: "AI / ML",
    description:
      "Area of interest focused on building systems that learn patterns from data.",
    tags: ["Supervised Learning", "Pattern Recognition", "Data Modeling"]
  },
  {
    name: "ARTIFICIAL INTELLIGENCE",
    category: "AI / ML",
    description:
      "Concepts and computational models for automated problem-solving, feature analysis, and data-driven intelligence.",
    tags: ["Model Evaluation", "Neural Architectures", "Intelligent Systems"]
  },

  // Tools
  {
    name: "GIT",
    category: "TOOLS",
    description:
      "Distributed version control system for tracking source code changes and branch workflows.",
    tags: ["Version Control", "Branching", "Commit History"]
  },
  {
    name: "GITHUB",
    category: "TOOLS",
    description:
      "Cloud platform for hosting git repositories, collaboration, and code management.",
    tags: ["Repositories", "Code Review", "Collaboration"]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-1",
    number: "PROJECT 01",
    title: "Machine Learning Pattern Recognition & Predictive Model",
    subtitle: "Python & Machine Learning Academic Implementation",
    description:
      "Academic machine learning project designed to extract predictive features, train pattern recognition models, and evaluate decision-boundary performance on structured data.",
    technologies: ["Python", "Machine Learning", "Pattern Recognition", "NumPy", "Data Processing"],
    problem:
      "Real-world structured datasets frequently exhibit non-linear feature distributions and noisy attributes that prevent straightforward rule-based predictions.",
    approach:
      "Implemented a clean data pipeline in Python to normalize inputs, engineer discriminating features, train classification models, and perform cross-validation against standard test splits.",
    result:
      "Successfully modeled pattern variations with stable convergence, demonstrating effective feature weighting and predictive precision."
  },
  {
    id: "proj-2",
    number: "PROJECT 02",
    title: "Relational Database Management & Query Processing System",
    subtitle: "SQL / MySQL Structured Data Engineering",
    description:
      "Relational data management application implementing normalized SQL schemas, transactional consistency, and optimized analytical querying.",
    technologies: ["SQL", "MySQL", "Database Design", "Python", "Data Integrity"],
    problem:
      "Unstructured or poorly normalized records cause data redundancy, update anomalies, and slow response times during multi-table joins.",
    approach:
      "Engineered a 3NF normalized relational schema in MySQL with foreign key constraints, indexed lookup columns, and parameter-safe query scripts.",
    result:
      "Maintained zero-redundancy consistency, sub-millisecond query retrieval, and safe atomic transactions across interdependent tables."
  },
  {
    id: "proj-3",
    number: "PROJECT 03",
    title: "Object-Oriented Software Utility & Computational Logic",
    subtitle: "Java & C Algorithm & Systems Software",
    description:
      "Core software engineering utility implementing object-oriented design principles, robust error containment, and algorithmic data structures.",
    technologies: ["Java", "C", "Object-Oriented Design", "Data Structures", "Git"],
    problem:
      "Managing complex procedural tasks requires structured memory allocation, deterministic object lifecycles, and maintainable module boundaries.",
    approach:
      "Built clean class hierarchies utilizing encapsulation, inheritance, and modular interfaces with rigorous edge-case exception handling.",
    result:
      "Delivered a dependable, highly maintainable computational utility exhibiting predictable memory usage and clear separation of concerns."
  }
];
