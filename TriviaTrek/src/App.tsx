import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { QuizList } from './pages/QuizList'
import { PlayQuiz } from './pages/PlayQuiz'
import { Review } from './pages/Review'
import { Admin } from './pages/Admin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/play/:id" element={<PlayQuiz />} />
        <Route path="/review/:resultId" element={<Review />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
