# LuxGen Nepal

LuxGen Nepal is a modern IT services website for showcasing web development, mobile app development, UI/UX design, cloud solutions, portfolio projects, pricing, team members, and client contact workflows.

The project is built as a responsive marketing and admin-enabled web app for a Nepal-based digital solutions company serving local and global clients.
live : https://luxgen-nepal.vercel.app/

## Features

- Responsive landing page with hero, services, process, portfolio, pricing, testimonials, team, and contact sections
- Mobile-optimized card layouts across the main homepage sections
- Editable portfolio/team/site content structure
- Firebase authentication with Google login
- Admin route for managing website content and contact requests
- Firestore-backed contact submissions
- EmailJS integration for contact email notifications
- Cloudinary upload helper for media assets

## Tech Stack

- React 19
- TanStack Router / TanStack Start
- TypeScript
- Tailwind CSS
- Firebase Auth and Firestore
- EmailJS
- Cloudinary
- Vite

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Variables

Create a `.env` file for local secrets and service keys. The project expects Firebase, EmailJS, and Cloudinary-related values where those integrations are enabled.

Do not commit `.env` files. They are intentionally ignored by Git.

## Project Goal

LuxGen Nepal aims to present affordable, high-quality digital solutions with a polished user experience, clear service offerings, real project showcases, and a simple way for clients to request consultations.
