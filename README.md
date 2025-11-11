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

### User Experience
- **Entry Animations**: Smooth slide-up animations (300ms) for cards on page load
- **Hover Effects**: Interactive hover states with 150ms transitions
- **Modal Interactions**: Intuitive modal dialogs for meal creation and editing
- **Form Validation**: Client-side validation with clear error messaging
- **Loading States**: Visual feedback during API operations

### Technical Implementation
- **Type Safety**: Full TypeScript implementation for enhanced code reliability
- **API Integration**: RESTful API communication with proper error handling
- **State Management**: Efficient React state management with hooks
- **Performance**: Optimized images and code splitting for fast load times
- **Testing**: Comprehensive test suite with 17 passing tests

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
- **Icons**: React Icons
- **Testing**: Jest & React Testing Library
- **Deployment**: Vercel

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
├── components/          # React components
│   ├── common/         # Reusable components (FoodCard, Button, etc.)
│   ├── layout/         # Layout components (Header, Hero, Footer)
│   └── modals/         # Modal dialogs (AddFoodModal, EditFoodModal)
├── services/           # API service layer
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and validation
```

## API Integration

The application integrates with a RESTful API for meal management. All API calls include proper error handling and user feedback mechanisms.

## Contributing

This project was developed as part of the A2SV Web Developer Challenge.

## License

This project is part of an assessment and is for demonstration purposes.
