# Personal Full-Stack Developer Portfolio

A modern, database-driven developer portfolio showcasing technical skills, selected work, personal projects, professional experience, and media assets. Built with Next.js, React, TypeScript, Tailwind CSS, and Supabase, and deployed on Vercel.

## Live Demo

Explore the portfolio at **[aaronmts.vercel.app](https://aaronmts.vercel.app/)**.

## Key Features

- **Database-driven content:** Portfolio profile information, technologies, work, and projects are queried from Supabase rather than being embedded in the page UI.
- **Structured project data:** Work and personal projects are retrieved by type and ordered using database sort fields.
- **Project media:** Project images are served from Supabase Storage using signed URLs.
- **Responsive interface:** A custom Tailwind CSS design adapts to mobile, tablet, and desktop viewports.
- **Progressive loading:** Suspense boundaries and skeleton components provide loading states for page content.
- **Optimized data access:** Next.js caching is used for selected portfolio data queries.
- **Typed database access:** Supabase queries use generated TypeScript database types.

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend and database | Supabase, PostgreSQL, Supabase Storage |
| Deployment and hosting | Vercel |

## Project Architecture and Database

Next.js renders the portfolio UI and retrieves structured content from Supabase through the Supabase JavaScript client. Server-side Supabase helpers are also used for cookie-aware requests, including retrieval of project image records and signed image URLs from Supabase Storage.

The PostgreSQL database organizes portfolio content into relational tables, including:

- `profile` — introductory text, current focus, and social links.
- `profile_techs` — technologies displayed on the portfolio.
- `projects` — work and personal projects, distinguished by their `type` and ordered by `sort_order`.
- `project-images` — image records associated with projects; the corresponding files are stored in the `project-images` Storage bucket.

The application uses Next.js caching for selected queries. Update the database or application cache behavior as needed when changing content freshness requirements.

## Getting Started

### Prerequisites

- Node.js and npm
- A Supabase project with the tables and Storage bucket used by the application

### Installation

1. Clone the repository and move into its directory:

   ```bash
   git clone https://github.com/AaronMTS/portfolio-next.git
   cd portfolio-next
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root and add your Supabase project credentials:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-or-anon-key
   ```

   Use the URL and publishable (or legacy anon) key from your Supabase project settings. Do not put a Supabase service-role key in a `NEXT_PUBLIC_` variable or expose it in client-side code.

4. Start the local development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Build the application for production. |
| `npm run start` | Start the production server after building. |
| `npm run lint` | Run ESLint. |

## Future Enhancements

- Document and version the Supabase schema and any required seed data.
- Add a content-management workflow for editing portfolio data.
- Add automated tests for data access and key page behavior.
