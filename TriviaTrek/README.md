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
- **API Resilience**: Exponential backoff retry logic for network requests

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios with interceptors
- **Backend**: JSON-Server (mock API)
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier

## Project Structure

```
TriviaTrek/
├── src/
│   ├── components/
│   │   ├── QuestionCard.tsx
│   │   ├── QuestionCard.test.tsx
│   │   ├── Timer.tsx
│   │   └── Timer.test.tsx
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

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Git

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
npm run seed:api     # Seed database with sample data
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

### Example cURL Commands

**Get all quizzes:**
```bash
curl http://localhost:4000/quizzes
```

**Get a specific quiz:**
```bash
curl http://localhost:4000/quizzes/1
```

**Create a new quiz:**
```bash
curl -X POST http://localhost:4000/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "History Quiz",
    "description": "Test your history knowledge",
    "timeLimit": 300,
    "scorePerQuestion": 10,
    "questions": [
      {
        "id": "q1",
        "text": "When did World War I end?",
        "options": [
          {"id": "o1", "text": "1917"},
          {"id": "o2", "text": "1918"},
          {"id": "o3", "text": "1919"}
        ],
        "correctOptionIndex": 1
      }
    ]
  }'
```

**Save a quiz result:**
```bash
curl -X POST http://localhost:4000/results \
  -H "Content-Type: application/json" \
  -d '{
    "quizId": "1",
    "score": 80,
    "totalQuestions": 5,
    "answers": {"q1": 1, "q2": 0, "q3": 2},
    "timestamp": "2024-01-15T10:30:00Z",
    "completedAt": "2024-01-15T10:35:00Z"
  }'
```

## Database Schema

### Quiz
```typescript
{
  id: string
  title: string
  description: string
  timeLimit: number (seconds)
  scorePerQuestion: number
  questions: Question[]
}
```

### Question
```typescript
{
  id: string
  text: string
  options: Option[]
  correctOptionIndex: number
}
```

### Option
```typescript
{
  id: string
  text: string
}
```

### Result
```typescript
{
  id: string
  quizId: string
  score: number
  totalQuestions: number
  answers: Record<string, number>
  timestamp: string (ISO 8601)
  completedAt: string (ISO 8601)
}
```

## Testing

Run the test suite:
```bash
npm run test
```

Run tests with UI:
```bash
npm run test:ui
```

Tests are located in `src/**/*.test.tsx` and cover:
- QuestionCard component (click handling, keyboard support, accessibility)
- Timer component (countdown, expiration, cleanup)

## Accessibility Features

- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ ARIA labels and roles
- ✅ Semantic HTML
- ✅ Color contrast compliance
- ✅ Focus management
- ✅ Live regions for timer updates

## Performance Optimizations

- **Code Splitting**: Lazy-loaded routes with React Router
- **API Resilience**: Exponential backoff retry for failed requests
- **Optimized Builds**: Vite tree-shaking and minification
- **CSS**: Tailwind CSS purging unused styles

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `VITE_API_URL=https://your-api-url.com`
4. Deploy

### Backend (Render or Railway)

1. Create a new service on Render/Railway
2. Use build command: `npm install`
3. Use start command: `npm run start:api`
4. Set port to 4000
5. Deploy

## Environment Variables

Create a `.env.local` file for local development:
```env
VITE_API_URL=http://localhost:4000
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### API Connection Issues
- Ensure JSON-Server is running: `npm run start:api`
- Check that port 4000 is not in use
- Verify `http://localhost:4000/quizzes` returns data

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist .vite`

### Test Failures
- Ensure all dependencies are installed
- Run `npm run test` with verbose output: `npm run test -- --reporter=verbose`

## Support

For issues and questions, please open an issue on GitHub.

---

**Happy Quizzing! 🎓**
