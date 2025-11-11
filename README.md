# FoodWagen

A modern food delivery platform built with Next.js, TypeScript, and Tailwind CSS. FoodWagen provides an intuitive interface for browsing, searching, and managing meals from various restaurants.

## Live Demo

[https://foodwagen-ashy.vercel.app](https://foodwagen-ashy.vercel.app)

## Overview

FoodWagen is a full-stack food ordering application that demonstrates modern web development practices with a focus on user experience, performance, and security. The application features a responsive design that works seamlessly across mobile, tablet, and desktop devices.

## Features

### Core Functionality
- **Browse Meals**: View a comprehensive catalog of available meals with detailed information
- **Search & Filter**: Real-time search functionality to find meals quickly
- **CRUD Operations**: Create, read, update, and delete meal entries through an intuitive interface
- **Responsive Design**: Fully optimized layouts for mobile (320px+), tablet (768px+), and desktop (1024px+)
- **Image Handling**: Smart fallback system with graceful error handling for external images

### Advanced State Management
- **React Query**: Powerful server-state management with automatic caching and background refetching
- **Query Invalidation**: Automatic cache invalidation on mutations for always-fresh data
- **Optimistic Updates**: Immediate UI feedback before server confirmation
- **Stale-While-Revalidate**: Background data refresh for optimal user experience
- **Custom Hooks**: `useFoods`, `useCreateFood`, `useUpdateFood`, `useDeleteFood` for clean data fetching

### Schema Validation with Zod
- **Type-Safe Validation**: Runtime validation with Zod schemas for all form inputs
- **Automatic Type Inference**: TypeScript types automatically inferred from Zod schemas
- **Field-Level Validation**: Granular validation with clear error messages
- **Transform & Refine**: Automatic data transformation and custom validation rules
- **Schema Composition**: Reusable validation logic across the application

### Performance Optimizations
- **React.memo**: Memoized components prevent unnecessary re-renders
- **useCallback**: Stable function references across renders
- **useMemo**: Memoized computed values for expensive calculations
- **Lazy Loading**: Dynamic imports for modals using Next.js `dynamic()`
- **Code Splitting**: Automatic code splitting for optimal bundle sizes
- **Image Optimization**: Next.js Image component with smart loading

### User Experience
- **Entry Animations**: Smooth slide-up animations (300ms) for cards on page load
- **Hover Effects**: Interactive hover states with 150ms transitions
- **Modal Interactions**: Lazy-loaded intuitive modal dialogs for meal creation and editing
- **Form Validation**: Client-side validation with Zod and clear error messaging
- **Loading States**: Visual feedback during API operations with React Query states
- **Error Boundaries**: Graceful error handling with user-friendly messages

### Technical Implementation
- **Type Safety**: Full TypeScript implementation for enhanced code reliability
- **API Integration**: RESTful API communication with React Query for caching and state management
- **State Management**: React Query for server state, React hooks for UI state
- **Performance**: Memoization, lazy loading, and optimized images for fast load times
- **Testing**: Comprehensive test suite with 17 passing tests (Jest & React Testing Library)

## Security Features

- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **CSRF Protection**: Form submissions include CSRF token validation
- **Content Security Policy**: Configured CSP headers for additional protection
- **Image Domain Whitelisting**: Restricted external image sources to trusted CDNs only
- **Environment Variables**: Sensitive configuration stored securely in environment variables
- **API Error Handling**: Proper error handling without exposing sensitive information

## Technology Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query (v5)
- **Validation**: Zod
- **Icons**: React Icons
- **Testing**: Jest & React Testing Library
- **Deployment**: Vercel

## Advanced Features Implemented

### 1. React Query for Server State Management
FoodWagen uses TanStack React Query for all server-side state management:
- Automatic caching with configurable stale times (1 minute)
- Background refetching to keep data fresh
- Optimistic updates for instant UI feedback
- Query invalidation on mutations
- Custom hooks for all CRUD operations

### 2. Zod Schema Validation
All form data is validated using Zod schemas:
- Type-safe runtime validation
- Automatic TypeScript type inference
- Field-level validation with descriptive error messages
- Data transformation (string to number conversion)
- Enum validation for restaurant status

### 3. Performance Optimizations
- **React.memo**: Components like `FoodCard` and `Hero` are memoized
- **useCallback**: Event handlers are memoized to prevent recreation
- **useMemo**: Expensive computations are memoized (e.g., filtered foods)
- **Lazy Loading**: Modals are dynamically imported using `next/dynamic`
- **Code Splitting**: Automatic route-based code splitting by Next.js

### 4. Developer Experience
- Full TypeScript coverage with strict type checking
- Custom React Query hooks for clean, reusable data fetching
- Zod schemas as single source of truth for validation
- Comprehensive test coverage (17/17 tests passing)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iPascal619/A2SV-Web-Developer-Challenge.git
cd A2SV-Web-Developer-Challenge
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Run Tests

```bash
npm test
```

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout with QueryClientProvider
│   ├── page.tsx        # Home page with React Query hooks
│   └── globals.css     # Global styles
├── components/          # React components
│   ├── common/         # Reusable components (FoodCard, Button, etc.)
│   ├── layout/         # Layout components (Header, Hero, Footer)
│   └── modals/         # Modal dialogs (AddFoodModal, EditFoodModal)
├── hooks/              # Custom React hooks
│   └── useFoodQueries.ts  # React Query hooks for CRUD operations
├── providers/          # Context providers
│   └── QueryProvider.tsx  # React Query provider setup
├── schemas/            # Zod validation schemas
│   └── foodSchema.ts   # Food form validation schema
├── services/           # API service layer
│   └── foodService.ts  # API calls with error handling
├── types/              # TypeScript type definitions
│   └── food.ts         # Food and form data types
└── utils/              # Utility functions
    └── validation.ts   # Validation helpers
```

## API Integration

The application integrates with a RESTful API for meal management. All API calls include proper error handling and user feedback mechanisms.

## Contributing

This project was developed as part of the A2SV Web Developer Challenge.

## License

This project is part of an assessment and is for demonstration purposes.
