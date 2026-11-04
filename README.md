# Ashfaque Portfolio

A React portfolio with a Three.js hanging ID card, light/dark themes, an interactive cursor, project case studies and a floating character guide. Vite provides the development server and production build.

## Technology

- JavaScript and JSX for React components.
- Three.js, React Three Fiber and Drei for the interactive 3D card.
- CSS for layouts, responsive styles and interface animations.
- `index.html` is the small browser entry point. React renders the page into its `#root` element; it is not a separate HTML-only implementation.
- Static frontend: no backend server, database or secret API keys are required.

## Project structure

```text
ashfaque-portfolio/
├── design-assets/drafts/          # Unused reference variant; not served by Vite
├── public/
│   ├── documents/                 # Downloadable CV
│   └── images/                    # Portrait and character images
├── src/
│   ├── app/
│   │   └── App.jsx                # Composes sections and shared UI
│   ├── components/
│   │   ├── companion/             # Floating guide and contact character
│   │   ├── effects/               # Interactive cursor
│   │   ├── layout/                # Header and footer
│   │   ├── projects/              # Project previews and case-study modal
│   │   ├── theme/                 # Theme toggle and saved preference
│   │   └── three/
│   │       ├── HeroScene.jsx      # Card interaction and scene rendering
│   │       └── geometry/          # Card textures, holder and ribbon geometry
│   ├── data/                      # Profile, projects, experience and principles
│   ├── hooks/                     # Reusable React behavior
│   ├── sections/                  # Hero, Work, About, Experience, Contact, etc.
│   ├── styles/                    # Global, theme/cursor and companion styles
│   └── main.jsx                   # Mounts the React application
├── .openai/hosting.json           # Existing Sites deployment identity/config
├── index.html
├── package.json
└── package-lock.json
```

`node_modules/` contains installed dependencies. `dist/` contains generated build output. Both are ignored by Git; edit source files rather than build output.

## Run locally

```sh
npm install
npm run dev
```

For Windows PowerShell installations that block `npm.ps1`, use `npm.cmd` in place of `npm`.

## Build and preview

```sh
npm run build
npm run preview
```

Format or check the source with `npm run format` and `npm run format:check`. Prettier is a development-only dependency.

## Where to make changes

| Change                                        | File or directory                                     |
| --------------------------------------------- | ----------------------------------------------------- |
| Project titles, descriptions and case studies | `src/data/projects.js`                                |
| Job history                                   | `src/data/experience.js`                              |
| Engineering principles                        | `src/data/principles.js`                              |
| Contact email and profile metadata            | `src/data/profile.js`                                 |
| Hero copy and flip/reset controls             | `src/sections/Hero.jsx`                               |
| About text and education                      | `src/sections/About.jsx`                              |
| Page order                                    | `src/app/App.jsx`                                     |
| 3D motion and drag behavior                   | `src/components/three/HeroScene.jsx`                  |
| Card print, clasp and ribbon geometry         | `src/components/three/geometry/`                      |
| Dark mode and cursor behavior                 | `src/components/theme/` and `src/components/effects/` |
| Floating guide and character                  | `src/components/companion/Companion.jsx`              |
| Layout and responsive styling                 | `src/styles/global.css`                               |
| Theme and cursor styling                      | `src/styles/atmosphere.css`                           |
| CV download                                   | `public/documents/Mohammed-Ashfaque-CV.pdf`           |

Keep state beside the component that owns it. The app only shares project-modal state because the floating guide must hide while a case study is open. Keep page sections in `sections/` and reusable UI in `components/`; avoid adding empty service or store folders until the project needs them.

## Hosting

The existing Sites project is retained in `.openai/hosting.json`. The folder-structure refactor was performed locally. Publishing remains a separate operation; never place hosting credentials or tokens in this repository.
