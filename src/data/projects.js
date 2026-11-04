export const projects = [
  {
    id: "01",
    name: "Tickets2Me",
    type: "PLATFORMS / BACKEND",
    year: "PROFESSIONAL WORK",
    color: "ticket",
    title: "Good times.\nSolid systems.",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy"],
    desc: "The engineering behind a smoother way to book events and movies.",
    problem:
      "Booking systems need to keep seat availability, payment status and ticket validation in sync—even when a booking fails or a customer leaves halfway through.",
    solution:
      "My work covers booking APIs, cancellation and refund rollback, regional PostgreSQL schemas, Alembic migrations, QR ticket scanning and background cleanup jobs. I also work on push notifications, confirmation emails and revenue reporting.",
    note: "Backend contributions described in my CV alongside my role at MITE Technology. No internal source code or production screenshots are included.",
  },
  {
    id: "02",
    name: "SmartDine",
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
    note: "Additional features include waiter dispatch, inventory alerts and PDF sales reports. Visuals here are illustrative interface concepts.",
  },
  {
    id: "03",
    name: "Food Rush",
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
    note: "Visuals here are illustrative interface concepts. Explore my GitHub profile for available repositories.",
  },
];
