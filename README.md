# StoryHub

A modern full-stack social publishing platform where users can discover stories, share their ideas, publish articles, interact with other users, and build their personal profile.

🔗 **Live Demo:** https://storyhub-iota.vercel.app/

🔗 **Frontend Repository:** https://github.com/tfshorifulislam/StoryHub

🔗 **Backend Repository:** https://github.com/tfshorifulislam/StoryHub-server


## ✨ Features

### 🔐 Authentication

- Email & password authentication
- Google OAuth authentication
- User registration and login
- Protected routes
- User sessions
- Custom username-based profiles


### 📝 Posts & Articles

- Create and publish posts
- Rich text content editor
- Post title and content
- Image upload support
- Tags
- Reading time information
- Post details page
- User-specific posts
- Responsive article layout


### 💬 Comments

- Add comments to posts
- Reply to comments
- Nested comment structure
- Like comments
- View comment likes
- Threaded discussions


### ❤️ Post Interactions

- Like posts
- Save posts
- View saved posts
- Comment on posts
- Share posts


### 📖 Stories

- Create stories
- Upload story media
- Image/video story support
- Story viewer
- Story progress indicator
- Story views
- User-based story grouping
- Automatically expire old stories


### 👤 User Profiles

- Username-based profile URLs
- Profile information
- User avatar
- User posts
- Saved posts
- Profile tabs


### 🔎 Search

- Search posts
- Search using keywords
- Search result pages


### 📱 Responsive Design

StoryHub is designed to work across:

- Desktop
- Tablet
- Mobile

The interface includes a responsive navigation system and mobile-friendly layouts.


## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- TipTap
- React Hook Form
- date-fns
- html-react-parser


### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Better Auth


### Authentication

- Better Auth
- Google OAuth
- Email & Password


### Database

- PostgreSQL
- Prisma ORM


### Media Storage

- Cloudinary


### Deployment

- Vercel


## 🏗️ Architecture

StoryHub uses a separate frontend and backend architecture.

```text
                    ┌─────────────────────┐
                    │      User           │
                    │  Browser / Mobile   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Next.js         │
                    │     Frontend        │
                    │      Vercel         │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express.js        │
                    │     Backend         │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌──────────┐     ┌──────────┐    ┌───────────┐
        │ Prisma   │     │BetterAuth│    │ Cloudinary│
        │   ORM    │     │          │    │   Media   │
        └────┬─────┘     └──────────┘    └───────────┘
             │
             ▼
        ┌──────────┐
        │PostgreSQL│
        └──────────┘