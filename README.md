# IAX - Intelligent Advertising Platform (TypeScript Website)

A modern, TypeScript-powered landing page for the IAX (Intelligent Advertising) platform. This website showcases the revolutionary advertising ecosystem where users earn cryptocurrency for willing exposure to relevant advertisements.

## 🌟 Features

- **Modern TypeScript Architecture** - Type-safe, maintainable code
- **Responsive Design** - Beautiful experience on all devices
- **Smooth Animations** - Scroll-triggered animations and hover effects
- **Interactive Elements** - Modal dialogs, notifications, and smooth scrolling
- **Bootstrap Integration** - Professional UI components
- **Vite Build System** - Fast development and optimized production builds

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd website_typescript
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit `http://localhost:3000` to see the website

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🎨 Design Features

### Hero Section
- **Gradient Background** - Professional dark slate to blue gradient
- **Animated Elements** - Floating background particles
- **Interactive Demo Flow** - Visual representation of the coffee → AI → ads → IAX process
- **Dual Call-to-Action** - Separate paths for users and advertisers

### Platform Cards
- **Glass Morphism Design** - Semi-transparent cards with backdrop blur
- **Hover Animations** - 3D transform effects on interaction
- **Gradient Accents** - Color-coded borders (teal for users, purple for advertisers)
- **Feature Lists** - Detailed benefits for each platform

### Video Section
- **Founder Introduction** - Placeholder for promotional video
- **Feature Highlights** - Side-by-side benefits comparison
- **Responsive Layout** - Adapts to different screen sizes

### Interactive Elements
- **Smooth Scrolling** - Navigation links scroll smoothly to sections
- **Scroll Animations** - Elements animate in as they enter viewport
- **Modal Dialogs** - Role selection modal for registration
- **Toast Notifications** - User feedback for interactions

## 🛠️ Technical Stack

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Bootstrap 5** - UI framework
- **Font Awesome** - Icon library
- **Google Fonts** - Poppins font family
- **CSS3** - Custom animations and gradients

## 📁 Project Structure

```
website_typescript/
├── src/
│   ├── index.html          # Main HTML file
│   ├── main.ts            # TypeScript application logic
│   └── styles/
│       └── main.css       # Custom CSS styles
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── README.md             # This file
```

## 🎯 Key Components

### IAXWebsite Class
Main application class handling:
- Event listeners for interactive elements
- User registration flow with role selection
- Login functionality
- Scroll animations and effects
- Navbar behavior

### ScrollEffects Class
Handles advanced visual effects:
- Parallax scrolling
- Enhanced hover effects
- Viewport-based animations

### Utils Object
Utility functions for:
- Function debouncing
- Viewport detection
- ID generation

## 🎨 Color Scheme

The website uses a professional color palette inspired by the original design:

- **Primary**: `#0f172a` (Dark slate)
- **Secondary**: `#14b8a6` (Teal)
- **Accent**: `#22d3ee` (Cyan)
- **Success**: `#10b981` (Emerald)
- **Warning**: `#f59e0b` (Amber)

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Adjusted layouts for medium screens
- **Desktop Enhanced** - Full-featured experience on large screens

## 🚀 Performance

- **Vite Optimization** - Fast HMR and optimized builds
- **Lazy Loading** - Animations only trigger when elements are visible
- **Debounced Events** - Optimized scroll and resize handlers
- **Minimal Dependencies** - Clean, lightweight codebase

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔧 Customization

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add styles to `src/styles/main.css`
3. Add TypeScript logic to `main.ts`

### Modifying Colors
Update CSS custom properties in `main.css`:
```css
:root {
  --betousd-primary: #your-color;
  --betousd-secondary: #your-color;
  /* ... */
}
```

### Adding Animations
Use the `ScrollEffects` class to add new scroll-triggered animations.

## 📄 License

MIT License - see LICENSE file for details.

## 👥 Authors

- **Tania Aizenman** - Founder
- **Humberto Villalta** - Lead Developer

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ for the future of intelligent advertising.
