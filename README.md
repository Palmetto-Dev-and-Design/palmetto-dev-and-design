# Palmetto Dev and Design

The website for **Palmetto Dev and Design**, a small studio that builds websites for home-service businesses. It showcases our work, services, and team, and has a contact form that saves leads and emails them to us.

**Live site:** [palmettodd.com](https://palmettodd.com)

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router) with [React](https://react.dev/) 19 and [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4, with design tokens defined in `app/globals.css`
- **Animation:** [GSAP](https://gsap.com/) with `@gsap/react`
- **Glass effect:** [Vaso](https://github.com/huozhi/vaso) (refracting glass cards)
- **Icons:** [Phosphor Icons](https://phosphoricons.com/)
- **API:** [Hono](https://hono.dev/) mounted in a Next.js route handler, validated with [Zod](https://zod.dev/)
- **Database:** Postgres on [Neon](https://neon.tech/), via [Drizzle ORM](https://orm.drizzle.team/)
- **Email:** [Resend](https://resend.com/)
- **Spam protection:** [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) plus a honeypot field
- **Linting/formatting:** [Biome](https://biomejs.dev/)
- **Package manager:** [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.9 or later
- [pnpm](https://pnpm.io/installation)
- A Postgres database (a free [Neon](https://neon.tech/) project works)

### Installation

```bash
# Clone the repository
git clone https://github.com/Palmett-Dev-and-Design/palmetto-dev-and-design.git
cd palmetto-dev-and-design

# Install dependencies
pnpm install
```

### Environment Variables

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (used by the app and Drizzle) |
| `RESEND_API_KEY` | Resend API key for sending contact emails |
| `CONTACT_FROM_EMAIL` | Sender address for contact emails (must be on a domain verified in Resend) |
| `CONTACT_TO_EMAIL` | Where contact form submissions are sent |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key (public, used by the form) |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key (server only, used to verify submissions) |

Cloudflare publishes [test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) for local development.

### Set Up the Database

```bash
pnpm db:migrate
```

This applies the migrations in `drizzle/` and creates the `contact_submissions` table.

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
| `pnpm lint` | Check the code with Biome |
| `pnpm lint:fix` | Check and apply Biome's fixes |
| `pnpm format` | Format the code with Biome |
| `pnpm db:generate` | Generate a Drizzle migration from `db/schema.ts` |
| `pnpm db:migrate` | Apply migrations to the database |
| `pnpm db:push` | **Do not use.** It skips migrations; always use `db:generate` and `db:migrate` |
| `pnpm db:studio` | Open Drizzle Studio to browse the data |

## Pages

| Route | Status |
| --- | --- |
| `/` | Home: hero, services, our work, why work with us, process, and call to action |
| `/work` | Work: project cards on a dark background, then a call to action |
| `/about` | About: hero, team (click a photo to read a bio), why a small team, philosophy, and call to action |
| `/contact` | Contact: form, details, and a link to book a discovery call |
| `/services` and `/services/*` | Placeholders for now (web design, web development, SEO, misc. services) |

## Project Structure

```
.
├── app/                  # Routes, layouts, and pages (App Router)
│   ├── api/[[...route]]/ # Mounts the Hono app as a Next.js route handler
│   └── globals.css       # Tailwind setup, design tokens, and type utilities
├── components/
│   ├── layout/           # Header, MobileMenu, and the fixed Footer
│   ├── primitives/       # Button, GlassCard, SocialLinks
│   └── sections/         # Page sections (Cta, ProjectCard, Team, ContactForm, ...)
├── db/                   # Drizzle client and schema
├── drizzle/              # Generated SQL migrations
├── lib/                  # Content data (projects, services, process, nav), utils, API client
├── server/               # Hono app and routes (the contact endpoint)
├── public/               # Static assets (images, artwork)
├── biome.json            # Lint and format rules
├── drizzle.config.ts     # Drizzle Kit configuration
└── package.json
```

## How It Works

### Contact form

`components/sections/ContactForm.tsx` posts to `/api/contact`, which is handled by the Hono app in `server/app.ts` and `server/routes/contact.ts`. The request:

1. is validated with the Zod schema in `lib/schema/contact.ts` (a filled-in honeypot field is silently accepted and dropped),
2. is verified with Cloudflare Turnstile,
3. is rate limited using saved submissions (3 per email per hour, 30 total per hour),
4. is saved to the `contact_submissions` table, and
5. is emailed to `CONTACT_TO_EMAIL` through Resend. The submission is saved first, so a failed email doesn't lose the lead, and `email_sent` records whether the email went out.

The client in `lib/api.ts` is a typed Hono client, so the form is type-checked against the route.

### Design system

- Colors, fonts, spacing, and type scales are tokens and `@utility` classes in `app/globals.css`. Prefer them (`bg-bg-inverse-muted`, `text-fg-muted`, `heading-2-desktop`, `label-md`, `paragraph-lg`, ...) over raw values.
- `components/primitives/Button.tsx` has `primary`, `secondary`, `charcoal`, `outline`, and `ghost` variants in `xs`, `sm`, `md`, and `cta` sizes. `https://` links open in a new tab.
- `components/primitives/GlassCard.tsx` wraps Vaso for refracting glass surfaces.
- The footer is fixed to the bottom of the screen under the page, and a spacer reveals it as you scroll to the end.

### Animation

Hover reveals, the team bio transition, and the scroll-driven sections use GSAP through `useGSAP`. Components that animate are client components (`'use client'`).

## Updating Content

- **Portfolio projects:** edit `lib/projects.ts` (image, category, title, description, link). Put the images in `public/`. The entries there are placeholders for now.
- **Services and process steps:** edit `lib/services.ts` and `lib/process.ts`.
- **Navigation and social links:** edit `lib/nav.ts`.
- **Team members and bios:** edit the `team` array in `components/sections/Team.tsx`. A member with a `bio` is clickable.

## Contributing

1. Create a branch from `main`: `git checkout -b feature/your-feature`
2. Run `pnpm lint` before committing.
3. Commit your changes with clear messages.
4. Open a pull request for review.

## License

© Palmetto Dev and Design. All rights reserved.
