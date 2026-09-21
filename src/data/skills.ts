export interface SkillItem {
  name: string;
  tag: string;
  usage: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    description:
      "Crafting responsive web interfaces, interactive admin tools, state management, and type-safe component systems.",
    skills: [
      {
        name: "React",
        tag: "UI & State Architecture",
        usage:
          "Used to build production interfaces, admin dashboards, e-commerce workflows, and reusable component systems.",
      },
      {
        name: "Next.js",
        tag: "SSR & App Router",
        usage:
          "Applied for server-rendered web applications, SEO optimization, file-based routing, and high-performance pages.",
      },
      {
        name: "TypeScript",
        tag: "Type Safety",
        usage:
          "Enforces end-to-end data contracts across frontend props, API payload models, and state structures.",
      },
      {
        name: "JavaScript",
        tag: "Core Language",
        usage:
          "Deep understanding of ES6+, async/await execution, DOM manipulation, and browser event loops.",
      },
      {
        name: "Tailwind CSS",
        tag: "Utility Styling",
        usage:
          "Rapidly styling dark-first design systems, responsive grid layouts, and custom theme tokens.",
      },
      {
        name: "Redux",
        tag: "Global State Management",
        usage:
          "Managing complex client state across multi-step user workflows, shopping carts, and cached application data.",
      },
      {
        name: "Bootstrap",
        tag: "UI Framework",
        usage:
          "Utilized for rapid prototyping and legacy admin portal layouts requiring standardized grid components.",
      },
      {
        name: "HTML5",
        tag: "Semantic Structure",
        usage:
          "Structuring clean, accessible DOM markup with proper semantic landmarks and ARIA attributes.",
      },
      {
        name: "CSS3",
        tag: "Modern Layouts",
        usage:
          "Writing Flexbox, CSS Grid, custom properties, media queries, and subtle micro-transitions.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description:
      "Building resilient server APIs, routing logic, middleware authentication, and business rule pipelines.",
    skills: [
      {
        name: "Node.js",
        tag: "Server Runtime",
        usage:
          "Powers backend event loops, REST endpoints, data transformation streams, and server-side utilities.",
      },
      {
        name: "Express.js",
        tag: "Web Framework",
        usage:
          "Architecting modular API routing, request validation middleware, error handling, and controller layers.",
      },
      {
        name: "REST APIs",
        tag: "Interface Design",
        usage:
          "Designing clean, versioned HTTP API endpoints with predictable JSON payloads and status codes.",
      },
      {
        name: "Authentication",
        tag: "Access Control",
        usage:
          "Implementing secure login pipelines, password hashing (bcrypt), session tokens, and role-based access.",
      },
      {
        name: "JWT",
        tag: "Stateless Tokens",
        usage:
          "Generating and verifying signed JSON Web Tokens for client session authorization across protected routes.",
      },
    ],
  },
  {
    id: "data",
    label: "Data",
    description:
      "Designing relational schemas, optimizing SQL query performance, and integrating type-safe ORMs.",
    skills: [
      {
        name: "MySQL",
        tag: "Relational RDBMS",
        usage:
          "Designing normalized schemas, foreign keys, index structures, and transactions for production systems.",
      },
      {
        name: "PostgreSQL",
        tag: "Advanced RDBMS",
        usage:
          "Utilized for robust data integrity, JSON query capabilities, and complex relational data modeling.",
      },
      {
        name: "Prisma",
        tag: "Type-Safe ORM",
        usage:
          "Defining declarative database schemas, auto-generating TypeScript client types, and running migrations.",
      },
      {
        name: "SQL",
        tag: "Query Language",
        usage:
          "Writing raw JOIN queries, aggregate operations, index optimizations, and data extraction scripts.",
      },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    description:
      "Connecting applications to payment gateways, communication channels, shipping engines, and external APIs.",
    skills: [
      {
        name: "Stripe",
        tag: "Payment Gateway",
        usage:
          "Integrating checkout sessions, card processing, refund APIs, and webhook listener verification.",
      },
      {
        name: "Razorpay",
        tag: "Payment Gateway",
        usage:
          "Configuring payment order initialization, signature verification, and transaction status logging.",
      },
      {
        name: "Shipping APIs",
        tag: "Logistics Integration",
        usage:
          "Calculating distance-based delivery zones, postcode validation, and automated shipping fee logic.",
      },
      {
        name: "SMTP / Email",
        tag: "Communication",
        usage:
          "Configuring automated transactional email delivery for order receipts, password resets, and notifications.",
      },
      {
        name: "Third-Party APIs",
        tag: "API Consumers",
        usage:
          "Connecting to external REST & GraphQL services, managing rate limits, timeout retries, and API key security.",
      },
    ],
  },
  {
    id: "production",
    label: "Production",
    description:
      "Deploying applications to cloud infrastructure, managing process managers, Nginx reverse proxies, and CI/CD.",
    skills: [
      {
        name: "Git",
        tag: "Version Control",
        usage:
          "Managing feature branches, commit history, merge conflict resolutions, and collaborative workflows.",
      },
      {
        name: "GitHub",
        tag: "Code Repository",
        usage:
          "Code review workflows, pull request reviews, repository management, and automated action triggers.",
      },
      {
        name: "Linux",
        tag: "Server OS",
        usage:
          "Navigating terminal environments, file permissions, shell scripts, environment variables, and log analysis.",
      },
      {
        name: "Nginx",
        tag: "Reverse Proxy",
        usage:
          "Configuring HTTP reverse proxying, SSL certificate termination, static asset caching, and port routing.",
      },
      {
        name: "PM2",
        tag: "Process Manager",
        usage:
          "Running production Node.js processes, configuring auto-restarts, zero-downtime reloads, and log tracking.",
      },
      {
        name: "Vercel",
        tag: "Cloud Hosting",
        usage:
          "Deploying Next.js & React frontend applications with instant preview deployments and domain management.",
      },
      {
        name: "Deployment",
        tag: "Production Delivery",
        usage:
          "Configuring live application servers, environment security secrets, build optimization, and uptime checks.",
      },
    ],
  },
];
