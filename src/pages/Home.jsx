import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold text-white mb-4">🎯 TriviaTrek</h1>
        <p className="text-xl text-blue-100 mb-8">
          Challenge yourself with engaging quizzes across multiple topics!
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/quizzes')}
            className="w-full bg-white text-blue-600 py-4 px-8 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            📚 Start Quiz
          </button>

          <button
            onClick={() => navigate('/admin')}
            className="w-full bg-purple-500 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-purple-600 transition-colors shadow-lg"
          >
            ⚙️ Admin Panel
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-20 text-white p-6 rounded-lg">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-bold mb-2">Timed Challenges</h3>
            <p className="text-sm">Race against the clock</p>
          </div>

          <div className="bg-white bg-opacity-20 text-white p-6 rounded-lg">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-bold mb-2">Real-time Scoring</h3>
            <p className="text-sm">Instant feedback</p>
          </div>

          <div className="bg-white bg-opacity-20 text-white p-6 rounded-lg">
            <div className="text-3xl mb-2">🎓</div>
            <h3 className="font-bold mb-2">Multiple Topics</h3>
            <p className="text-sm">Learn and grow</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
