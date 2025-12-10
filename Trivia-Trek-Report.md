# Trivia Trek Project Report

## Introduction
Trivia Trek is a modern, full-stack quiz application built to challenge users with engaging quizzes across multiple topics. Designed with a user-centric approach, it leverages the power of React, TypeScript, and Vite to deliver a seamless and interactive experience. Whether testing general knowledge or diving into specific subjects like Science or Movies, Trivia Trek offers a robust platform for learning and entertainment.

## Project Goals
The primary goal of Trivia Trek is to provide an accessible and enjoyable quiz platform. Key objectives include:
*   **Engagement**: enticing users with timed challenges and real-time scoring.
*   **Performance**: ensuring a fast, responsive user interface across all devices.
*   **Maintainability**: utilizing a modern, type-safe tech stack for robust development.

## Key Features
*   **Multiple Quiz Topics**: Access quizzes in various categories such as General Knowledge, Science, and Movies.
*   **Timed Challenges**: Enhances excitement with per-quiz time limits.
*   **Real-time Scoring**: Provides instant feedback on user performance.
*   **Admin Panel**: Allows for full CRUD (Create, Read, Update, Delete) operations on quizzes.
*   **Responsive Design**: A beautiful UI crafted with Tailwind CSS that adapts to any screen size.
*   **Accessibility**: Features full keyboard support and ARIA labels.
*   **Type-Safe**: Built with TypeScript to ensure code reliability.

## Tech Stack
The project utilizes a modern stack to ensure performance and developer experience:
*   **Frontend**: React 18, TypeScript, Vite
*   **Styling**: Tailwind CSS, PostCSS, Autoprefixer
*   **Routing**: React Router DOM v6
*   **HTTP Client**: Axios
*   **Backend**: JSON-Server (mock API)
*   **Testing**: Vitest, React Testing Library
*   **Code Quality**: ESLint, Prettier

## Prerequisites
To run this project locally, ensure you have the following installed:
*   **Node.js**: Version 16 or higher
*   **npm** or **yarn**

## Getting Started

### Installation
1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd TriviaTrek
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application
To run the application, you need to start both the mock API server and the frontend development server.

1.  **Start the API Server:**
    Open a terminal and run:
    ```bash
    npm run start:api
    ```
    The API will be running at `http://localhost:4000`.

2.  **Start the Frontend:**
    In a separate terminal window, run:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## Available Scripts
*   `npm run dev`: Start the Vite development server.
*   `npm run build`: Build the application for production.
*   `npm run preview`: Preview the production build locally.
*   `npm run start:api`: Start the JSON-Server mock API.
*   `npm run lint`: Run ESLint to check for code quality issues.
*   `npm run format`: Format code using Prettier.
*   `npm run test`: Run tests with Vitest.

## Project Structure
The project follows a standard React organization:

*   `src/components`: Reusable UI components (e.g., QuestionCard, Timer).
*   `src/pages`: Main application views (Home, QuizList, PlayQuiz, Admin, etc.).
*   `src/lib`: Utility functions and API configurations.
*   `src/types`: TypeScript type definitions.
*   `src/styles`: Global and component-specific styles.
*   `db.json`: The database file for JSON-Server.

## API Endpoints
The application communicates with the following endpoints:

*   **Quizzes**:
    *   `GET /quizzes`: Retrieve all quizzes.
    *   `GET /quizzes/:id`: Retrieve a specific quiz.
    *   `POST /quizzes`: Create a new quiz.
    *   `PUT /quizzes/:id`: Update an existing quiz.
    *   `DELETE /quizzes/:id`: Delete a quiz.

*   **Results**:
    *   `GET /results`: Retrieve all results.
    *   `POST /results`: Save a new quiz result.

## Conclusion
Trivia Trek combines modern web technologies to create a fun and educational quiz platform. Its modular structure and comprehensive feature set make it an excellent example of a contemporary React application.
