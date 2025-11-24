import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">TriviaTrek</h1>
          <div className="space-x-4">
            <Link to="/quizzes" className="text-gray-700 hover:text-blue-600">
              Quizzes
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-blue-600">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center text-white mb-12">
          <h2 className="text-5xl font-bold mb-4">Welcome to TriviaTrek</h2>
          <p className="text-xl mb-8">Challenge yourself with engaging quizzes on various topics</p>
          <Link
            to="/quizzes"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Start Quiz
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Multiple Topics</h3>
            <p className="text-gray-600">
              Test your knowledge across General Knowledge, Science, Movies, and more
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">⏱️</div>
            <h3 className="text-xl font-bold mb-2">Timed Challenges</h3>
            <p className="text-gray-600">Race against the clock and challenge yourself with time limits</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Instant Feedback</h3>
            <p className="text-gray-600">Get immediate results and review your answers</p>
          </div>
        </div>
      </div>
    </div>
  )
}
