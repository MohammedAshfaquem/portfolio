export const projects = [
  {
    id: "01",
    categories: ["Backend"],
    name: "Tickets2Me",
    cover: "/images/projects/tickets2me-illustrated-cover.jpg",
    coverAlt:
      "3D Tickets2Me desktop booking interface and mobile digital ticket illustration",
    type: "PLATFORMS / BACKEND",
    year: "PROFESSIONAL WORK",
    color: "ticket",
    title: "Good times.\nSolid systems.",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "LLMs", "AI Integration"],
    desc: "A ticketing platform spanning Admin, Customer, Counter Sales and Inventory Management & POS.",
    problem:
      "Booking systems need to keep seat availability, payment status and ticket validation in sync—even when a booking fails or a customer leaves halfway through.",
    solution:
      "My work covers booking APIs, cancellation and refund rollback, regional PostgreSQL schemas, Alembic migrations, QR ticket scanning and background cleanup jobs. I also work on push notifications, confirmation emails and revenue reporting.",
    note: "Tickets2Me includes Admin, Customer, Counter Sales and Inventory Management & POS applications. The links below open UAT environments; some require authorized access. Source code is hosted privately on Bitbucket; no public repository is available.",
    privateSource: true,
    links: [
      {
        label: "Admin · UAT",
        href: "https://tickets2me-admin-uat.netlify.app/login",
      },
      {
        label: "Customer · UAT",
        href: "https://mite-uat.tickets2me.com/en/ind/up",
      },
      {
        label: "Counter Sales · UAT",
        href: "https://uat-tickets2me-countersale.netlify.app/login",
      },
      {
        label: "Inventory & POS · UAT",
        href: "https://tickets2me-inventory-uat.netlify.app/login",
      },
    ],
  },
  {
    id: "02",
    categories: ["Full stack", "AI"],
    name: "SmartDine",
    cover: "/images/projects/smartdine-illustrated-cover.jpg",
    coverAlt:
      "3D SmartDine restaurant dashboard and mobile table ordering illustration",
    links: [
      {
        label: "View repository",
        href: "https://github.com/MohammedAshfaquem/Smart_Dine",
      },
    ],
    type: "PRODUCT / FULL STACK",
    year: "SELECTED PROJECT",
    color: "dine",
    title: "Less waiting.\nMore dining.",
    stack: ["Django REST", "Gemini API", "JWT"],
    desc: "An AI-assisted restaurant workflow, from the table to the kitchen.",
    problem:
      "Restaurant ordering involves different people, changing order states and a menu that customers may need help exploring.",
    solution:
      "Built role-based authentication for Admin, Kitchen, Waiter and Customer workflows. Table-specific QR ordering connects to a custom dish builder, preparation estimates and a Pending → Preparing → Ready → Served lifecycle. A Gemini assistant offers menu recommendations.",
    note: "Additional features include waiter dispatch, inventory alerts and PDF sales reports. Cover image is an illustrative visual, not an application screenshot.",
  },
  {
    id: "03",
    categories: ["Full stack"],
    name: "Food Rush",
    cover: "/images/projects/food-rush-illustrated-cover.jpg",
    coverAlt:
      "3D Food Rush food commerce desktop and mobile checkout illustration",
    links: [
      {
        label: "View repository",
        href: "https://github.com/MohammedAshfaquem/Food_App-React",
      },
    ],
    type: "COMMERCE / FULL STACK",
    year: "SELECTED PROJECT",
    color: "food",
    title: "Built for\nthe appetite.",
    stack: ["React", "Redux", "Django REST"],
    desc: "A responsive commerce experience backed by a complete order workflow.",
    problem:
      "A shopping experience needs a responsive interface and a backend that handles authentication, products, payments and orders together.",
    solution:
      "Built a React and Redux frontend with Tailwind CSS, integrated with Django REST Framework and PostgreSQL APIs for authentication, product management, payments and order processing.",
    note: "Cover image is an illustrative visual, not an application screenshot. Source code is available in the linked GitHub repository.",
  },
  {
    id: "04",
    name: "Resume Analyzer",
    categories: ["Full stack", "AI"],
    cover: "/images/projects/resume-analyzer-illustrated-cover.jpg",
    coverAlt:
      "3D Rolewise Resume Analyzer dashboard showing document evidence, requirement coverage and feedback",
    type: "AI / WEB APPLICATION",
    year: "SELECTED PROJECT",
    color: "resume",
    stack: ["Python", "Django", "Gemini API", "Pydantic"],
    desc: "Evidence-based résumé feedback, matched to the role you want.",
    problem:
      "Comparing a résumé with a job description can be time-consuming, and useful feedback needs to distinguish supported experience from claims that the résumé does not demonstrate.",
    solution:
      "Built Rolewise with Django and Gemini to compare résumé text against job requirements. Users can extract text from PDF or DOCX files, review it, and receive requirement-level evidence, coverage feedback and wording suggestions. Python verifies quoted evidence and calculates weighted coverage; users can download a plain-text report.",
    note: "Coverage is an explainable application rubric, not an employer's ATS score or hiring probability. Cover image is a conceptual illustration, not an application screenshot.",
    links: [
      {
        label: "View repository",
        href: "https://github.com/MohammedAshfaquem/resume_analyzer",
      },
    ],
  },
];
