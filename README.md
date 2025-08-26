# 🚀 React Component Library with Tailwind CSS

A modern, comprehensive React component library built with TypeScript, Tailwind CSS, and following atomic design principles. This project provides a robust foundation for building scalable web applications with pre-built, accessible UI components.

## ✨ Features

- **🎨 30+ Atomic Components** - Button, Input, Dialog, Toast, and more
- **🧬 Molecular Components** - DataTable, MultiStepForm, FileUpload, and more
- **🎯 TypeScript First** - Full type safety and excellent developer experience
- **🎨 Tailwind CSS v4** - Latest utility-first CSS framework
- **♿ Accessibility** - Built with Radix UI primitives for screen reader support
- **🌍 Internationalization** - Built-in i18n support with Persian language
- **📱 Responsive Design** - Mobile-first approach with modern UI patterns
- **🧪 Testing Ready** - Vitest, React Testing Library, and Storybook integration
- **📚 Documentation** - Comprehensive Storybook documentation
- **⚡ Performance** - Vite build tool for fast development and builds

## 🏗️ Architecture

This project follows the **Atomic Design** methodology, organizing components into logical hierarchies:

```
src/components/
├── atoms/          # Basic building blocks (Button, Input, etc.)
├── molecules/      # Component combinations (FormField, DataTable, etc.)
├── organisms/      # Complex UI sections (Header, Sidebar, etc.)
├── templates/      # Page layouts
└── pages/          # Complete pages
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd react-component-with-tailwind

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3010](http://localhost:3010).

## 📦 Available Components

### 🧪 Atoms (Basic Components)

| Component | Description | Status |
|-----------|-------------|---------|
| **Button** | Versatile button with variants | ✅ Ready |
| **Input** | Text input with validation | ✅ Ready |
| **Dialog** | Modal dialogs and alerts | ✅ Ready |
| **Toast** | Notification system | ✅ Ready |
| **Select** | Dropdown selection | ✅ Ready |
| **Checkbox** | Checkbox with states | ✅ Ready |
| **Radio Group** | Radio button groups | ✅ Ready |
| **Avatar** | User profile images | ✅ Ready |
| **Badge** | Status indicators | ✅ Ready |
| **Tabs** | Tabbed content | ✅ Ready |
| **Accordion** | Collapsible content | ✅ Ready |
| **Drawer** | Slide-out panels | ✅ Ready |
| **Tooltip** | Hover information | ✅ Ready |
| **Skeleton** | Loading placeholders | ✅ Ready |
| **Progress Bar** | Progress indicators | ✅ Ready |
| **Stepper** | Multi-step navigation | ✅ Ready |
| **Tree** | Hierarchical data display | ✅ Ready |
| **Time Picker** | Time selection | ✅ Ready |
| **Persian Date Picker** | Persian calendar input | ✅ Ready |
| **Tags Input** | Tag management | ✅ Ready |
| **Textarea** | Multi-line text input | ✅ Ready |
| **Password** | Secure password input | ✅ Ready |
| **Actions Dropdown** | Action menus | ✅ Ready |
| **Barcodes** | Barcode/QR code generation | ✅ Ready |

### 🧬 Molecules (Composite Components)

| Component | Description | Status |
|-----------|-------------|---------|
| **DataTable** | Advanced data table with filtering | ✅ Ready |
| **MultiStepForm** | Multi-step form wizard | ✅ Ready |
| **File Upload** | Single and multi-file upload | ✅ Ready |
| **Meter Group** | Progress meter collections | ✅ Ready |
| **Layout** | Page layout components | ✅ Ready |

## 🛠️ Development Tools

### Testing

```bash
# Run tests
npm run test

# Interactive test UI
npm run test:ui

# Coverage report
npm run coverage
```

### Storybook

```bash
# Start Storybook
npm run storybook

# Build static Storybook
npm run build-storybook
```

### Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run build
```

## 🎨 Styling & Theming

This project uses **Tailwind CSS v4** with custom configurations:

- **Utility-first CSS** approach
- **Custom color palette** and design tokens
- **Responsive breakpoints** for mobile-first design
- **Dark mode support** (configurable)
- **Custom animations** and transitions

### CSS Architecture

```css
/* Example component styling */
.button {
  @apply px-4 py-2 rounded-lg font-medium transition-all;
  @apply hover:shadow-md active:scale-95;
}
```

## 🌍 Internationalization

Built-in support for multiple languages:

- **English** (en) - Default language
- **Persian** (fa) - RTL support with custom fonts
- **Extensible** - Easy to add new languages

### Usage Example

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('welcome.title')}</h1>;
}
```

## 📱 Responsive Design

All components are built with mobile-first responsive design:

- **Mobile** (320px+) - Primary design target
- **Tablet** (768px+) - Enhanced layouts
- **Desktop** (1024px+) - Full feature set
- **Large** (1280px+) - Optimized spacing

## ♿ Accessibility Features

- **ARIA labels** and roles
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Focus management** for modals
- **Color contrast** compliance
- **Semantic HTML** structure

## 🔧 Configuration

### Environment Setup

```bash
# Development
NODE_ENV=development

# Production
NODE_ENV=production
```

### Build Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 3010 },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
    }
  }
});
```

## 📚 API Reference

### Component Usage

```tsx
import { Button, Input, Dialog } from '@/components/atoms';

function MyForm() {
  return (
    <Dialog>
      <Input placeholder="Enter text" />
      <Button variant="primary">Submit</Button>
    </Dialog>
  );
}
```

### TypeScript Support

```tsx
import type { ButtonProps, InputProps } from '@/components/atoms';

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}
```

## 🚀 Performance

- **Tree shaking** for optimal bundle size
- **Lazy loading** for heavy components
- **Memoization** for expensive operations
- **Bundle analysis** tools included
- **Code splitting** by component category

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Add** tests for new functionality
5. **Ensure** all tests pass
6. **Submit** a pull request

### Development Standards

- **TypeScript** for all new code
- **ESLint** for code quality
- **Prettier** for formatting
- **Conventional commits** for commit messages
- **100% test coverage** for new components

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radix UI** for accessible primitives
- **Tailwind CSS** for utility-first styling
- **Vite** for fast build tooling
- **React Testing Library** for testing utilities
- **Storybook** for component documentation

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/react-component-with-tailwind/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/react-component-with-tailwind/discussions)
- **Documentation**: [Storybook](http://localhost:6006)

---

<div align="center">
  <p>Built with ❤️ using React, TypeScript, and Tailwind CSS</p>
  <p>
    <a href="https://github.com/your-username/react-component-with-tailwind">
      <img src="https://img.shields.io/badge/GitHub-View%20on%20GitHub-blue?logo=github" alt="View on GitHub" />
    </a>
    <a href="https://npmjs.com/package/your-package-name">
      <img src="https://img.shields.io/npm/v/your-package-name" alt="npm version" />
    </a>
    <a href="https://github.com/your-username/react-component-with-tailwind/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT" />
    </a>
  </p>
</div>