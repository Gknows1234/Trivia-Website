import { Link } from 'react-router-dom'

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
          🎯 TriviaTrek
        </h1>
        <p className="text-xl text-white mb-8 drop-shadow-md">
          Challenge yourself with exciting quizzes across multiple topics. Test your knowledge,
          compete with others, and become a trivia master!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/quizzes"
            className="tt-btn-primary inline-block text-center transform hover:scale-105 transition-transform"
          >
            Start Quiz
          </Link>
          <Link
            to="/admin"
            className="tt-btn-ghost inline-block text-center transform hover:scale-105 transition-transform"
          >
            Admin Panel
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="tt-card">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-xl font-bold mb-2">Multiple Topics</h3>
            <p className="text-gray-600">
              Quizzes covering General Knowledge, Science, Movies, and more.
            </p>
          </div>

          <div className="tt-card">
            <div className="text-4xl mb-3">⏱️</div>
            <h3 className="text-xl font-bold mb-2">Timed Challenges</h3>
            <p className="text-gray-600">
              Race against the clock and test your quick thinking abilities.
            </p>
          </div>

          <div className="tt-card">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              View your results and see how you improve over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
