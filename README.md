# CDMS Frontend

This is the frontend for the CDMS project, built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

Clone the repository and install dependencies:

```bash
yarn install
# or
npm install
```

### Development

Start the development server:

```bash
yarn dev
# or
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the app for production:

```bash
yarn build
# or
npm run build
```

### Linting

To run ESLint:

```bash
yarn lint
# or
npm run lint
```

### Preview Production Build

To preview the production build locally:

```bash
yarn preview
# or
npm run preview
```

## Project Structure

- `src/` - Main source code (React components, styles, assets)
- `public/` - Static assets
- `vite.config.ts` - Vite configuration
- `tsconfig*.json` - TypeScript configuration

## Atomic Design Folder Structure

The project uses the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology for organizing UI components. The structure is as follows:

```
src/
  components/
    atoms/       # Smallest, reusable UI elements (e.g., Button, Input)
    molecules/   # Groups of atoms functioning together (e.g., FormField)
    organisms/   # Complex UI components composed of molecules/atoms (e.g., Header, Card)
    templates/   # Page-level layouts with placeholder content
    pages/       # Full pages composed of templates and organisms
```

- **atoms/**: Basic building blocks, such as buttons, inputs, icons.
- **molecules/**: Combinations of atoms, like a search bar (input + button).
- **organisms/**: Relatively complex components, like navigation bars or cards.
- **templates/**: Layouts that define the structure of a page without real content.
- **pages/**: Actual pages, composed of templates and real content/data.

## Styling with Tailwind CSS

This project uses the following packages for utility-first styling:
- 🎨 `tailwindcss`
- ⚡ `@tailwindcss/vite`
- 🧩 `tailwind-merge`
- 🟦 `shadcn/ui` (for ready-to-use, accessible UI components)

Tailwind CSS is already configured in the project. You can use Tailwind utility classes directly in your React components.

For more information, see the [Tailwind CSS documentation](https://tailwindcss.com/docs/installation).

## Key Libraries Used

Some important libraries in this project:
- ⚛️ `react`, `react-dom` — Core React libraries
- 🔄 `@tanstack/react-query`, `@tanstack/react-query-devtools` — Data fetching, caching, and devtools
- 🌐 `axios` — Promise-based HTTP client
- 🌍 `i18next`, `react-i18next` — Internationalization (i18n) support
- 🧪 `@hookform/resolvers` — Integrates validation libraries with React Hook Form
- 🧰 `clsx` — Utility for conditionally joining classNames
- 📝 `yup` — JavaScript schema validation
- 🎨 `tailwindcss` — Utility-first CSS framework
- ⚡ `@tailwindcss/vite` — Vite plugin for Tailwind CSS
- 🧩 `tailwind-merge` — Utility for intelligently merging Tailwind CSS classes
- 🟦 `shadcn/ui` — Accessible and customizable UI components built on top of Radix UI and Tailwind CSS
- 🧪 `vitest` — Blazing fast unit test framework
- 🧪 `@testing-library/react`, `@testing-library/jest-dom` — React component testing utilities and matchers
- 🧪 `jsdom` — JavaScript implementation of the DOM for testing
- 📚 `storybook`, `@storybook/react-vite` — UI component explorer and documentation
- 🦺 `eslint`, `typescript`, `typescript-eslint` — Linting and static type checking
- 🦾 `@radix-ui/react-slot` — Primitive for advanced composition patterns
- 🏗️ `@vitejs/plugin-react`, `vite` — Vite build tool and React plugin
- 🧪 `@vitest/coverage-v8` — Code coverage for Vitest
- 🧪 `@vitest/browser` — Browser-based testing with Vitest
- 🧪 `playwright` — End-to-end browser testing

## License

This project is licensed under the MIT License.

## Testing

This project uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and component testing.

### Running Tests

```bash
yarn test
# or
npm run test
```

### Interactive Test UI

```bash
yarn test:ui
# or
npm run test:ui
```

### Coverage Report

To generate a code coverage report:

```bash
yarn coverage
# or
npm run coverage
```

The coverage report will be available in the `coverage/` directory (which is git-ignored).

## Storybook

Storybook is used for developing and testing UI components in isolation.

### Start Storybook

```bash
yarn storybook
# or
npm run storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006).

### Build Storybook Static Site

```bash
yarn build-storybook
# or
npm run build-storybook
```

The static build will be output to the `storybook-static/` directory.

## Additional Notes

- **Testing**: All test files should be named with `.test.ts(x)` or `.spec.ts(x)` and placed alongside the components in the `src/` directory.
- **Coverage**: The project uses [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) for improved assertions in tests.
- **Atomic Design**: Follow the atomic design methodology for organizing components.