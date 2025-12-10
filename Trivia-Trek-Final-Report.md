# Trivia Trek (React)

## Introduction
Step into the world of knowledge and excitement – a modern quiz experience awaits you with our state-of-the-art Trivia Trek application, intricately designed using the brilliance of React.js. Merging education with a user-centric approach, our platform is poised to redefine how you engage with quizzes and immerse yourself in learning.

Crafted for the curious mind, our React-based Trivia Trek seamlessly integrates robust functionality with an intuitive user interface. From testing your general knowledge to mastering specific topics, our platform ensures a comprehensive trivia journey tailored to your unique interests.

The core of our Trivia Trek beats with React, a dynamic and feature-rich JavaScript library. Immerse yourself in a visually stunning and interactive interface, where every question, timer tick, and score update feels like a victory. Whether you're on a desktop, tablet, or smartphone, our responsive design guarantees a consistent and enjoyable experience across all devices.

Bid farewell to boring quizzes and embrace a realm of fun with our React-based Trivia Trek. Join us on this knowledge expedition as we transform the way you learn and play. Get ready to elevate your trivia experience – it's time to hit "Start Quiz" on a new era of gaming.

## Scenario-Based Intro
Imagine a typical evening at home. You’ve just finished dinner and want to challenge your friends or learn something new. You open your favorite quiz app, "Trivia Trek."

As you begin your session, Trivia Trek greets you with a clean, intuitive interface, customized to your preferences. The vibrant theme sets a fun mood, while clear navigation makes it easy to choose a topic. You start by selecting a "General Knowledge" quiz, and as you play, the real-time scoring keeps the adrenaline pumping, speeding up your engagement.

Later, you decide to create a custom quiz for your family. With Trivia Trek’s integrated Admin Panel, you easily add new questions, set time limits, and manage topics, creating a personalized game night experience. The application's instant feedback and smooth transitions prevent any interruptions to the fun.

## Target Audience
Trivia Trek is tailored for a diverse community of individuals, including:
*   **Quiz Enthusiasts:** People passionate about testing their knowledge, spending their free time immersed in trivia to learn new facts and challenge themselves.
*   **Students & Teachers:** For educational purposes, revising topics in a fun and interactive way.
*   **Gamers:** Users who enjoy competitive, timed challenges and score tracking.

## Project Goals and Objectives
The primary goal of Trivia Trek is to offer a seamless platform for trivia lovers, facilitating a fun and efficient gaming experience. Our objectives include:
*   **User-Friendly Interface:** Develop an intuitive interface that enables users to navigate, play, and create quizzes effortlessly, promoting a smooth and entertaining environment.
*   **Comprehensive Features:** Provide robust features for organizing and managing quiz content, including timed challenges and real-time scoring for streamlined gameplay.
*   **Modern Tech Stack:** Leverage cutting-edge web development technologies, such as React.js and Tailwind CSS, to ensure an efficient and enjoyable user experience while navigating and interacting with the application. This ensures that developers can seamlessly craft, edit, and optimize code using the latest advancements in web development tools.

## Key Features
*   **Multiple Quiz Topics:** Access quizzes in various categories such as General Knowledge, Science, and Movies.
*   **Timed Challenges:** Enhances excitement with per-quiz time limits using a dedicated Timer component.
*   **Real-time Scoring:** Provides instant feedback on user performance as they answer each question.
*   **Admin Panel:** Allows for full CRUD (Create, Read, Update, Delete) operations on quizzes.
*   **Responsive Design:** A beautiful UI crafted with Tailwind CSS that adapts to any screen size.

## PRE-REQUISITES
Here are the key prerequisites for developing a frontend application using React.js:

### Node.js and npm
Node.js is a powerful JavaScript runtime environment that allows you to run JavaScript code on the local environment. It provides a scalable and efficient platform for building network applications.
Install Node.js and npm on your development machine, as they are required to run JavaScript on the server-side.
*   Download: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
*   Installation instructions: [https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/)

### React.js
React.js is a popular JavaScript library for building user interfaces. It enables developers to create interactive and reusable UI components, making it easier to build dynamic and responsive web applications.

**Create a new React app:**
```bash
npm create vite@latest
# Enter project-name and select preferred frameworks (React)
cd project-name
npm install
```

**Running the React App:**
With the React app created, you can now start the development server and see your React application in action.
Start the development server:
```bash
npm run dev
```
This command launches the development server, and you can access your React app at `http://localhost:5173` in your web browser.

### HTML, CSS, and JavaScript
Basic knowledge of HTML for creating the structure of your app, CSS for styling (Tailwind CSS in this project), and JavaScript for client-side interactivity is essential.

### Version Control
Use Git for version control, enabling collaboration and tracking changes throughout the development process.
*   **Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads)

### Development Environment
Choose a code editor or IDE that suits your preferences.
*   Visual Studio Code: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
*   Sublime Text: [https://www.sublimetext.com/download](https://www.sublimetext.com/download)
*   WebStorm: [https://www.jetbrains.com/webstorm/download](https://www.jetbrains.com/webstorm/download)

## Project Structure
The project structure may vary, but organizing files logically is essential to improve code maintainability.
*   `src/components`: Reusable UI components like `QuestionCard.jsx` and `Timer.jsx`.
*   `src/pages`: Main application views like `Home.jsx`, `PlayQuiz.jsx`, and `Admin.jsx`.

## Project Flow
**Project demo:** [Link to your project demo if available]
**Code:** [https://github.com/Gknows1234/Trivia-Website](https://github.com/Gknows1234/Trivia-Website)

### Milestone 1: Project Setup and Configuration
1.  **Install required tools and software:**
    *   React Js
    *   Tailwind CSS
    *   React Router DOM
    *   Axios
    *   JSON Server
    *   Resources: [React Installation](https://react.dev/learn/installation)

### Milestone 2: Web Development
1.  **Setup React Application:**
    *   Create React application.
    *   Configure Routing/Navigation.
    *   Install required libraries.

    **App.jsx component:**
    *   Creates a `Router` to manage navigation.
    *   Defines `Routes` for `/`, `/quizzes`, `/quiz/:id`, `/review/:id`, and `/admin`.
    *   Imports page components like `Home`, `PlayQuiz`, and `Admin` to render based on the URL.
    *   This component serves as the root component handling the overall layout and routing structure.

2.  **Design UI components:**
    *   Create Components (`QuestionCard`, `Timer`).
    *   Implement layout and styling using Tailwind CSS.
    *   Add navigation buttons in `Home.jsx`.

3.  **Implement frontend logic:**
    *   Integration with API endpoints using `axios`.
    *   Implement data binding and state management.

## Code Description

### Home Component (Home.jsx)
*   The landing page of the application.
*   Uses `useNavigate` for navigation to Quizzes and Admin panel.
*   Displays a welcome message and "Start Quiz" / "Admin Panel" buttons.
*   Features a responsive grid layout highlighting key features like "Timed Challenges" and "Real-time Scoring".

### Play Quiz Component (PlayQuiz.jsx)
*   **State Management:** Uses `useState` to manage `quiz` data, `currentQuestion` index, `score`, `answered` status, and `timer`.
*   **Data Fetching:** specific quiz data is fetched using `axios` based on the URL parameter (`id`).
*   **Logic:**
    *   `handleAnswer`: Checks if the selected answer is correct, updates the score, and stores the answer.
    *   `handleNext`: Moves to the next question or saves the result if the quiz is finished.
    *   `saveResult`: Posts the final score and details to the `json-server` backend.
*   **Rendering:** Conditionally renders logic for "Loading", "Quiz not found", or "Time's Up". Displays the `Timer`, current score, progress bar, and the `QuestionCard`.

### Question Card Component (QuestionCard.jsx)
*   **Props:** Receives `question` object, `onAnswer` function, and `answered` state.
*   **Selection Logic:** accurate state management to track the user's selected option (`selected`).
*   **Feedback:** visually distinguishes the selected answer. When `answered` is true, it highlights the correct answer in green and incorrect selection in red.
*   **Interaction:** Contains the "Submit Answer" button which triggers the parent component's answer handler.

## Project Execution
After completing the code, run the react application by using the command:
```bash
npm run start:api
# In a new terminal
npm run dev
```

### Screenshots of the Application
**Home Component**
[Place Screenshot Here]

**Quiz List Component**
[Place Screenshot Here]

**Play Quiz Component**
[Place Screenshot Here]

**Output (Result)**
[Place Screenshot Here]

**Admin Panel**
[Place Screenshot Here]

*** Happy coding!! ***
