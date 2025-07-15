# Task Management Application

## Overview

This is a full-stack task management application built with React, TypeScript, Express.js, and PostgreSQL. The application features a modern, responsive UI built with shadcn/ui components and provides comprehensive task management capabilities with categories, priorities, and filtering.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod for request/response validation
- **Development**: In-memory storage fallback for development

### Key Components

#### Database Schema
- **Tasks**: Core entity with title, description, category, priority, due date, and completion status
- **Categories**: Predefined categories with names and color coding
- **Users**: Basic user structure (defined but not fully implemented)

#### API Structure
- RESTful endpoints for tasks (`/api/tasks`)
- Category management (`/api/categories`)
- Full CRUD operations with proper error handling
- Input validation using Zod schemas

#### UI Components
- **Header**: Search functionality and user info
- **TaskFilters**: Status and category filtering with counters
- **TaskItem**: Individual task display with inline actions
- **TaskModal**: Create/edit task form with validation
- **Responsive Layout**: Mobile-first design with Tailwind CSS

## Data Flow

1. **Task Creation**: User fills form → Validation → API call → Database update → UI refresh
2. **Task Updates**: Inline editing → Optimistic updates → API sync → State reconciliation
3. **Filtering**: Client-side filtering based on status, category, and search query
4. **Real-time Updates**: React Query manages cache invalidation and refetching

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **date-fns**: Date manipulation utilities

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server to `dist/index.js`
- **Database**: Drizzle migrations in `migrations/` directory

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)
- Development uses Vite dev server with HMR
- Production serves static files from Express

### Development Workflow
- `npm run dev`: Starts development server with hot reload
- `npm run build`: Creates production build
- `npm run db:push`: Pushes database schema changes
- Uses Replit-specific plugins for development environment

The application follows a monorepo structure with shared schemas and utilities, enabling type safety across the full stack while maintaining clear separation of concerns between frontend and backend code.