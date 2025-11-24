# TriviaTrek 🎯

A modern, full-stack quiz application built with React, TypeScript, Vite, and JSON-Server. Challenge yourself with engaging quizzes across multiple topics!

## Features

- **Multiple Quiz Topics**: General Knowledge, Science, Movies, and more
- **Timed Challenges**: Race against the clock with per-quiz time limits
- **Real-time Scoring**: Instant feedback on quiz performance
- **Admin Panel**: Create, edit, and delete quizzes with full CRUD operations
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **Accessibility**: Full keyboard support and ARIA labels
- **Type-Safe**: Built with TypeScript for robust development

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios with interceptors
- **Backend**: JSON-Server (mock API)
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TriviaTrek
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the JSON-Server (in a separate terminal)**
   ```bash
   npm run start:api
   ```
   The API will be available at `http://localhost:4000`

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

## Available Scripts

### Development
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### API
```bash
npm run start:api    # Start JSON-Server on port 4000
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run test         # Run tests with Vitest
npm run test:ui      # Run tests with UI
```

## API Endpoints

### Quizzes
- `GET /quizzes` - Get all quizzes
- `GET /quizzes/:id` - Get a specific quiz
- `POST /quizzes` - Create a new quiz
- `PUT /quizzes/:id` - Update a quiz
- `DELETE /quizzes/:id` - Delete a quiz

### Results
- `GET /results` - Get all results
- `GET /results/:id` - Get a specific result
- `POST /results` - Save a quiz result

## Project Structure

```
TriviaTrek/
├── src/
│   ├── components/
│   │   ├── QuestionCard.tsx
│   │   └── Timer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── QuizList.tsx
│   │   ├── PlayQuiz.tsx
│   │   ├── Review.tsx
│   │   └── Admin.tsx
│   ├── lib/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   └── components.css
│   ├── test/
│   │   └── setup.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── db.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
└── .prettierrc
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

---

**Happy Quizzing! 🎓**
