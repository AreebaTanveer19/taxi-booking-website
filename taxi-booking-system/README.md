# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 📁 Folder Structure (Planned)

```
src/
  components/      # Reusable UI components (Navbar, Footer, Modal, etc.)
  pages/           # Main pages (Home, BookRide, MyRides, About, Contact)
  styles/          # Global and component-specific CSS files
  assets/          # Images, SVGs, icons
  App.jsx          # Main app component
  main.jsx         # Entry point
  index.css        # Global styles
  App.css          # App-level styles
```

- **components/**: All custom React components (e.g., Navbar, BookingForm, RideCard, Modal, Footer)
- **pages/**: Each route/page (e.g., Home.jsx, BookRide.jsx, MyRides.jsx, About.jsx, Contact.jsx)
- **styles/**: CSS files for global and modular styles
- **assets/**: Images, SVGs, and other static assets
