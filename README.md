# Career Intelligence Platform (CIP)

A comprehensive AI Student Assistant and Task Management platform built with Angular and NestJS.

## 🚀 Features

### Dashboard

- Dashboard which displays recent schedules tasks and quizzes
- displays total no of quizzes,tasks,schedules created by specific user

### Career Guidance CHatbot and Career Roadmap Generator

- Can ask various questions related to career and study to chatbot
- Generate roadmaps based on the career path entered by user

### Task Management

- Task creation
- Tracks Completed and pending tasks

### Schedule Management

- can create schedules
- can update and delete schedules
- schedule categorization
- can create schedule using a prompt of form based approach

### Quiz System

- Interactive quizzes
- Quiz Genrated From PDFs
- can regenerate questions if user feels currrent questions are easy
- and result is shown with no of rigt answers and the total percentage

## 🛠️ Technology Stack

### Frontend (assistant-client)

- Angular 17
- TailwindCSS
- TypeScript

### Backend (assistant-backend)

- NestJS
- TypeScript
- MongoDB
- Auth0 Authentication
- Gemini AI Integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Angular CLI
- MongoDB
- Git

2. Install Frontend Dependencies

```bash
cd assistant-client
npm install
```

3. Install Backend Dependencies

```bash
cd assistant-backend
npm install
```

4. Set up environment variables
   Create `.env` files in both frontend and backend directories with necessary configurations.

### Running the Application

1. Start the Backend Server

```bash
cd assistant-backend
npm run start:dev
```

2. Start the Frontend Application

```bash
cd assistant-client
ng serve
```
