import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import QuizList from './pages/QuizList'
import PlayQuiz from './pages/PlayQuiz'
import Review from './pages/Review'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/quiz/:id" element={<PlayQuiz />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

