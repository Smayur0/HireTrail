# Frontend Application Summary

## Overview
The frontend is built using **React** with **Vite** and **Tailwind CSS**. It features a modern, responsive user interface with dark mode support.

## Key Technologies
- **Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM
- **Icons:** Lucide React

## Features & Implementation

### 1. Global Layout & Navigation
- **Navbar:** Implemented a global sticky navbar that appears on all authentic pages.
    -   Includes Logo, Navigation Links (Home, Dashboard), and Theme Switcher.
    -   Responsive design.
-   **Layout Structure:** Root layout wraps the application, ensuring consistent structure.

### 2. Authentication UI
- **Login Page:**
    -   **Split Layout:** Two-column design on large screens (Form Left/Right, Branding on other side).
    -   **Google Auth:** "Login with Google" button integrated with backend API (`/auth/google`).
    -   **Aesthetics:** Polished UI with "Welcome Back" messaging and responsive layouts.
-   **Public/Private Routes:** public routes (Landing, Login) vs private routes (Dashboard) protected by auth logic.

### 3. Theming (Dark Mode)
- **Implementation:** Uses `next-themes` (or custom `ThemeProvider`) compatible with Tailwind CSS v4.
-   **Semantic Colors:** Application uses semantic variables (e.g., `--background`, `--foreground`, `--primary`) rather than hardcoded colors, ensuring enabling seamless light/dark mode switching.
-   **Theme Switcher:** Toggle available in the Navbar.

### 4. Pages
-   **Landing Page:** informative landing page with Hero section, Features, and Testimonials. Refactored to remove redundant navbar and use global layout.
-   **Dashboard:** Placeholder for application tracking features.
-   **Login:** Dedicated login entry point.

## Configuration
-   `src/config.ts`: Centralized configuration for API URLs (e.g., `API_URL` pointing to backend).
