# Codex

A next-generation writing application designed for a calm, focused, and powerful creative experience.

## Guiding Principles

Codex is being built with a clear vision for the user experience. All features and design choices are measured against these three core principles:

* **Calm:** A clean, minimalist, and distraction-free interface.
* **Focused:** The writing experience is paramount. UI elements use progressive disclosure to stay out of the user's way until needed.
* **Powerful:** Complex features are translated into simple, intuitive user actions.

## ✨ Current Features (Client-Side)

This repository contains the client-side implementation of Codex. All data is currently mocked in the client's state and is not persistent.

* **Project & Document Management:** Full CRUD (Create, Rename, Delete) for both projects and documents.
* **Persistent & Responsive Layout:** A collapsible and resizable sidebar that remembers its size and state across sessions.
* **Context-Aware Navigation:** The sidebar and breadcrumbs intelligently update based on the user's location within the app.
* **Dynamic Views:** Seamlessly switch between a project dashboard, a project-specific document list, and the main editor.
* **Rich Text Editor:** Powered by TipTap, featuring a Notion-style floating bubble menu for text formatting.
* **User Preferences:** A settings system (persisted to `localStorage`) to control UI features, such as switching between a bubble menu and a static toolbar.
* **Theming:** Full Light, Dark, and System theme support.

## 💻 Tech Stack & Architecture

* **Framework:** [React](https://react.dev/) (with [Vite](https://vitejs.dev/))
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Component Library:** [Shadcn/ui](https://ui.shadcn.com/)
* **Editor:** [TipTap](https://tiptap.dev/)
* **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
* **Routing:** [React Router](https://reactrouter.com/)
* **Architecture:** [Feature-Sliced Design (FSD)](https://feature-sliced.design/)

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or a compatible package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd writer-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a file named `.env.local` in the root of the project. This will be used for the Supabase integration in the next steps.
    ```env
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_PUBLIC_KEY"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

* `npm run dev`: Starts the development server.
* `npm run build`: Builds the application for production.
* `npm run lint`: Lints the codebase using ESLint.
* `npm run preview`: Serves the production build locally.