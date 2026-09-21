export interface CaseStudyData {
  overview: string;
  problem: string;
  solution: string;
  role: string;
  architectureNodes: {
    frontend: string;
    api: string;
    businessLogic: string;
    database: string;
    externalServices: string;
    production: string;
  };
  features: string[];
  engineeringChallenges: {
    title: string;
    why: string;
    how: string;
    whatWasHard: string;
    howSolved: string;
  }[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Project {
  id: string;
  number: string;
  name: string;
  type: string;
  oneLiner: string;
  technologies: string[];
  badge: string;
  /** Banner screenshot in /public/projects/<id>.jpg (falls back to a designed panel). */
  image: string;
  /** Accent gradient (from → to, any CSS colors) used for the fallback banner. */
  gradient: [string, string];
  caseStudy: CaseStudyData;
}

export const PROJECTS: Project[] = [
  {
    id: "bagel-master-uk",
    number: "01",
    name: "Bagel Master UK",
    type: "Production Food Ordering & E-Commerce Platform",
    oneLiner:
      "Full-featured online ordering system with distance-based delivery calculation, slot scheduling, Stripe payments, and real-time admin order management.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Stripe API",
      "Distance Matrix API",
      "REST APIs",
      "Admin Portal",
      "Production Deployment",
    ],
    badge: "LIVE PRODUCTION PLATFORM",
    image: "/projects/bagel-master.jpg",
    gradient: ["#f59e0b", "#b45309"],
    caseStudy: {
      role: "Full Stack Developer (End-to-End Development & Deployment)",
      overview:
        "Bagel Master UK is a production-grade food ordering and e-commerce platform designed for direct-to-consumer bagel orders across the UK. It handles both collection and delivery orders with strict time-slot scheduling, dynamic delivery fee calculations based on customer distance, and a comprehensive admin backend for order fulfillment and refunds.",
      problem:
        "Local food businesses often struggle with generic e-commerce tools that lack distance-restricted delivery zones, order slot throttling, and real-time kitchen order management. Standard platforms either charge high commission fees or fail to enforce delivery radius logic accurately.",
      solution:
        "Built a custom full-stack web application featuring a responsive React frontend for seamless order customization, integrated Stripe checkout for secure payments, an Express backend to compute distance-based delivery eligibility dynamically, and an admin dashboard for live order tracking and refund processing.",
      architectureNodes: {
        frontend: "React SPA • Tailwind CSS • Cart State",
        api: "Express.js REST Routing • Validation Middleware",
        businessLogic: "Distance Radius Engine • Slot Scheduling • Order Rules",
        database: "Relational Order Schema • Customer Logs",
        externalServices: "Stripe Payment Gateway • Google Distance Matrix API",
        production: "Cloud Hosted Server • SSL • Environment Configs",
      },
      features: [
        "Collection & Delivery order selection with distance-based eligibility validation",
        "Slot scheduling system to prevent kitchen order congestion",
        "Integrated Stripe payment gateway with webhook payment status confirmation",
        "Admin management dashboard for live order tracking, status updates, and customer refunds",
        "Automated order confirmation receipts and kitchen printing views",
        "Mobile-optimized checkout flow with minimal friction",
      ],
      engineeringChallenges: [
        {
          title: "Accurate Distance-Based Delivery Throttling & Pricing",
          why: "Food delivery quality degrades if orders are placed beyond manageable geographic radiuses.",
          how: "Integrated Google Distance Matrix API into the checkout backend validation step before payment initialization.",
          whatWasHard:
            "Handling edge cases like invalid postcodes, API rate limits, and avoiding unnecessary third-party API calls on every keystroke.",
          howSolved:
            "Implemented address normalization and server-side address caching. Distance is calculated strictly when the customer confirms their delivery postcode.",
        },
        {
          title: "Real-Time Order Lifecycle & Safe Refund Handling",
          why: "Restaurant staff need immediate visibility into new orders and the ability to process partial/full refunds directly from the admin panel.",
          how: "Built structured API endpoints connecting the admin dashboard with the Stripe Refunds API.",
          whatWasHard:
            "Ensuring database order states synchronized accurately with Stripe transaction statuses when refunds were initiated.",
          howSolved:
            "Used database transactions and Stripe webhook handlers to guarantee atomic state updates across the database and payment provider.",
        },
      ],
      liveUrl: "https://bagelmaster.co.uk",
    },
  },
  {
    id: "vasavi-ayurveda",
    number: "02",
    name: "Vasavi Ayurveda",
    type: "Full-Stack Healthcare E-Commerce Platform",
    oneLiner:
      "Comprehensive Ayurvedic healthcare platform with product catalog management, doctor registration system, customer accounts, and secure checkout.",
    technologies: [
      "React + Vite",
      "Node.js",
      "Express",
      "MySQL",
      "JWT Auth",
      "Payment Gateways",
      "Admin Dashboard",
      "Doctor Portal",
    ],
    badge: "HEALTHCARE E-COMMERCE",
    image: "/projects/vasavi-ayurveda.jpg",
    gradient: ["#10b981", "#065f46"],
    caseStudy: {
      role: "Full Stack Developer (Database Design, REST APIs & Admin Portal)",
      overview:
        "Vasavi Ayurveda is an e-commerce and healthcare portal that sells authentic Ayurvedic formulations while providing a dedicated portal for practitioner doctor registration and patient consultations. It features a relational MySQL database backbone, customer account management, multi-category product cataloging, and an intuitive admin control center.",
      problem:
        "Combining retail e-commerce with specialized practitioner registration requires strict separation of customer versus doctor workflows, dynamic product categorization, and structured relational data management.",
      solution:
        "Developed a modern React + Vite frontend backed by a Node.js/Express REST server and MySQL relational database. Built distinct access control middleware for regular customers, registered doctors, and administrative managers.",
      architectureNodes: {
        frontend: "React + Vite • Tailwind • State Management",
        api: "Express.js REST APIs • JWT Auth Middleware",
        businessLogic: "Cart & Checkout Rules • Doctor Verification Pipeline",
        database: "MySQL Relational Database • Foreign Key Constraints",
        externalServices: "Payment Gateway Integration • Cloud File Storage",
        production: "Node Application Server • Database Backup Scripts",
      },
      features: [
        "Hierarchical product catalog with category and sub-category filtering",
        "Doctor registration portal with document verification workflows",
        "Customer account management with saved shipping addresses and order history",
        "Shopping cart and multi-step checkout pipeline with payment gateway integration",
        "Admin management dashboard for inventory control, order status tracking, and doctor approvals",
        "Responsive, dark/light aesthetic optimized for health products",
      ],
      engineeringChallenges: [
        {
          title: "Relational Schema Design for Multi-User Roles",
          why: "The system needed to support standard shoppers, verified Ayurvedic doctors, and system admins without duplicating entity attributes.",
          how: "Designed a clean MySQL schema using normalized tables for users, roles, doctor credentials, products, orders, and order items.",
          whatWasHard:
            "Maintaining data consistency across user profiles, address books, and historical order snapshots when user profiles were updated.",
          howSolved:
            "Enforced strict foreign key constraints and stored immutable snapshot data (such as address and price at time of purchase) inside order tables.",
        },
        {
          title: "Secure Payment & Order Verification",
          why: "Preventing order creation with tampered price payloads or unverified payment statuses.",
          how: "Calculated all order totals exclusively on the backend server before initiating the payment gateway token request.",
          whatWasHard:
            "Handling browser drop-offs during payment redirection without leaving ghost pending orders in the database.",
          howSolved:
            "Implemented order state transitions (`PENDING_PAYMENT` → `PAID` / `FAILED`) triggered by server-to-server payment webhooks.",
        },
      ],
      liveUrl: "https://vasaviayurveda.com",
    },
  },
  {
    id: "vasavi-astrology",
    number: "03",
    name: "Vasavi Astrology",
    type: "Modern Full-Stack Next.js Application",
    oneLiner:
      "High-performance astrology platform built with Next.js App Router, Prisma ORM, and MySQL for seamless consultation booking and content distribution.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma ORM",
      "MySQL",
      "Tailwind CSS",
      "Server Actions",
      "Data Integration",
      "Admin Panel",
    ],
    badge: "NEXT.JS & PRISMA STACK",
    image: "/projects/vasavi-astrology.jpg",
    gradient: ["#8b5cf6", "#4c1d95"],
    caseStudy: {
      role: "Full Stack Developer",
      overview:
        "Vasavi Astrology is a modern Next.js web application providing astrological insights, horoscope consultation scheduling, and digital services. It leverages Next.js App Router for server-rendered page speed, Prisma ORM for type-safe database queries, and MySQL for reliable data persistence.",
      problem:
        "Traditional astrology portals suffer from slow page load times, poor mobile UX, and difficult content management for non-technical site administrators.",
      solution:
        "Architected a Next.js application utilizing Server-Side Rendering (SSR) for instant initial page loads and SEO indexability, backed by Prisma ORM for clean database migrations and a custom admin interface for service management.",
      architectureNodes: {
        frontend: "Next.js App Router • React • Tailwind CSS",
        api: "Next.js Route Handlers • Server Actions",
        businessLogic: "Booking Logic • Content Scheduler",
        database: "Prisma ORM • MySQL Database",
        externalServices: "Notification Service • Payment Link Generation",
        production: "Vercel / Cloud Host • Automated CI/CD",
      },
      features: [
        "Server-rendered service pages with high SEO visibility and fast page speeds",
        "Type-safe database interactions powered by Prisma ORM and MySQL",
        "Consultation booking form workflows with input validation",
        "Admin panel for managing consultation slots, client requests, and site content",
        "Clean, responsive editorial UI designed for desktop and mobile reading",
      ],
      engineeringChallenges: [
        {
          title: "Type-Safe Database Modeling with Prisma & Next.js",
          why: "To eliminate runtime database query errors and ensure full end-to-end TypeScript safety across client and server.",
          how: "Defined a clean Prisma schema (`schema.prisma`) mapping models for consultations, services, users, and site assets.",
          whatWasHard:
            "Managing database connections cleanly across Next.js serverless route handler invocations.",
          howSolved:
            "Instantiated a global Prisma Client singleton pattern to prevent connection exhaustion during development and hot-reloading.",
        },
      ],
      liveUrl: "https://vasaviastrology.com",
    },
  },
  {
    id: "matrimony-application",
    number: "04",
    name: "Matrimony Application",
    type: "Full-Stack Matrimony & Matchmaking Platform",
    oneLiner:
      "Full-stack matchmaking application featuring multi-step user registration, detailed profile management, search filtering, and secure user authentication.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MySQL",
      "RESTful APIs",
      "Auth Middleware",
      "Form Workflows",
    ],
    badge: "FULL-STACK SOCIAL APP",
    image: "/projects/matrimony.jpg",
    gradient: ["#f43f5e", "#881337"],
    caseStudy: {
      role: "Full Stack Developer",
      overview:
        "The Matrimony Application is a dedicated matchmaking web platform that enables users to create comprehensive profiles, search for potential matches based on specific preferences, and interact securely. It features multi-step registration forms, image uploads, preference filtering, and protected user routes.",
      problem:
        "Matrimony applications require gathering extensive user data (family details, education, career, lifestyle) across multi-step registration flows without frustrating users or losing form state.",
      solution:
        "Engineered a structured React frontend with step-by-step form validation, backed by an Express REST API and MySQL relational storage. Route authorization is governed by JWT middleware to protect user privacy.",
      architectureNodes: {
        frontend: "React • Step-by-Step Form State • Tailwind",
        api: "Express.js REST Endpoints • Route Guards",
        businessLogic: "Preference Matching Engine • Profile Validation",
        database: "MySQL Relational Schema • User Indexes",
        externalServices: "Cloudinary Image Hosting",
        production: "Cloud Hosted Node Engine • Managed MySQL",
      },
      features: [
        "Multi-step user onboarding and profile creation wizard with live validation",
        "Secure user authentication (registration, login, password encryption, JWT session control)",
        "Advanced search and filter engine by age, education, location, and background",
        "Profile view, shortlist, and interest request communication workflows",
        "Admin management interface for profile moderation and account verification",
      ],
      engineeringChallenges: [
        {
          title: "Multi-Step Registration State & Partial Save Resilience",
          why: "User onboarding for matrimony involves 20+ data fields across 4 distinct steps.",
          how: "Designed a modular form state architecture coupled with partial endpoint saving.",
          whatWasHard:
            "Preventing incomplete user profiles from cluttering active search directory results.",
          howSolved:
            "Added an explicit `profile_status` state (`DRAFT` vs `ACTIVE` vs `VERIFIED`). Search queries strictly filter for `ACTIVE` and `VERIFIED` profile records.",
        },
      ],
      liveUrl: "https://vadiyarajulu.com",
    },
  },
];
