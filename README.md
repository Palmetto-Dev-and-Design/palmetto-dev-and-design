# Palmetto Dev and Design

The portfolio website for **Palmetto Dev and Design**, built with [Next.js](https://nextjs.org/). It showcases our work, services, and ways to get in touch.

**Live site:** [palmettodd.com](https://palmettodd.com)

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Package manager:** [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later
- [pnpm](https://pnpm.io/installation)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-org>/palmetto-dev-and-design.git
cd palmetto-dev-and-design

# Install dependencies
pnpm install
```

### Environment Variables

If the project uses environment variables, copy the example file and fill in the values:

```bash
cp .env.example .env.local
```

### Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page reloads automatically as you edit files.

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Run the production build locally |
| `pnpm lint` | Lint the codebase |

## Project Structure

```
.
├── app/              # Routes, layouts, and pages (App Router)
├── components/       # Reusable UI components
├── public/           # Static assets (images, icons, fonts)
├── styles/           # Global styles
├── lib/              # Utilities and helpers
├── next.config.js    # Next.js configuration
└── package.json
```

## Adding Portfolio Projects

1. Add project images to `public/projects/`.
2. Add a new entry to the projects data file (e.g. `lib/projects.ts`) with the title, description, tags, and image path.
3. Run `pnpm dev` to preview the new project.

## Contributing

1. Create a branch from `main`: `git checkout -b feature/your-feature`
2. Commit your changes with clear messages.
3. Open a pull request for review.

## License

© Palmetto Dev and Design. All rights reserved.