import { ProjectItem, SkillItem, NavStation } from '../types';

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
      "Sarang R N is an MCA graduate with a foundation in software development, Python, Java, C, SQL/MySQL and modern web technologies, with a strong interest in machine learning and building practical software solutions.",
    role: "Software Developer / Machine Learning Enthusiast",
    education: "Master of Computer Applications",
    location: "Kakkanad, Ernakulam, Kerala, India",
    focus: [
      "Software Development",
      "Python",
      "Machine Learning",
      "Web Technologies"
    ]
  },

  education: {
    degree: "MASTER OF COMPUTER APPLICATIONS",
    institution: "Cochin University of Science and Technology (CUSAT)",
    cgpa: "7.66 / 10",
    classification: "First Class",
    details:
      "Comprehensive academic curriculum focusing on software architecture, object-oriented programming, relational database engineering, algorithm analysis, and machine learning foundations."
  },

  resumeSummary:
    "MCA graduate from Cochin University of Science and Technology with a CGPA of 7.66/10 (First Class), with a foundation in Python, Java, C, SQL/MySQL, and web technologies. Strong academic project experience in machine learning and software development, with an interest in building practical and interactive software solutions."
};

export const NAV_STATIONS: NavStation[] = [
  { id: 'intro', number: '00', label: 'OVERVIEW', objectName: 'StationDesk' },
  { id: 'about', number: '01', label: 'ABOUT', objectName: 'StationAbout' },
  { id: 'skills', number: '02', label: 'SKILLS', objectName: 'StationSkills' },
  { id: 'projects', number: '03', label: 'PROJECTS', objectName: 'StationProjects' },
  { id: 'education', number: '04', label: 'EDUCATION', objectName: 'StationEducation' },
  { id: 'resume', number: '05', label: 'RESUME', objectName: 'StationResume' },
  { id: 'contact', number: '06', label: 'CONTACT', objectName: 'StationContact' },
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
