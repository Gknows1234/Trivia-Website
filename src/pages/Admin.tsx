import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Quiz } from '../types'
import { apiClient } from '../lib/api'

export function Admin() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const [formData, setFormData] = useState<Partial<Quiz>>({
    title: '',
    description: '',
    timeLimit: 300,
    scorePerQuestion: 10,
    questions: [],
  })

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      setLoading(true)
      const data = await apiClient.get<Quiz[]>('/quizzes')
      setQuizzes(data)
    } catch (err) {
      showToast('Failed to load quizzes', 'error')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title?.trim() || !formData.description?.trim()) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    try {
      if (editingId) {
        await apiClient.put(`/quizzes/${editingId}`, formData)
        showToast('Quiz updated successfully', 'success')
      } else {
        await apiClient.post('/quizzes', formData)
        showToast('Quiz created successfully', 'success')
      }

      setFormData({
        title: '',
        description: '',
        timeLimit: 300,
        scorePerQuestion: 10,
        questions: [],
      })
      setEditingId(null)
      setShowForm(false)
      fetchQuizzes()
    } catch (err) {
      showToast('Failed to save quiz', 'error')
      console.error(err)
    }
  }

  const handleEdit = (quiz: Quiz) => {
    setFormData(quiz)
    setEditingId(quiz.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/quizzes/${id}`)
      showToast('Quiz deleted successfully', 'success')
      setDeleteConfirm(null)
      fetchQuizzes()
    } catch (err) {
      showToast('Failed to delete quiz', 'error')
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            TriviaTrek
          </Link>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/quizzes" className="text-gray-700 hover:text-blue-600">
              Quizzes
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setFormData({
                title: '',
                description: '',
                timeLimit: 300,
                scorePerQuestion: 10,
                questions: [],
              })
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Cancel' : '+ New Quiz'}
          </button>
        </div>

        {toast && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              toast.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {toast.message}
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit Quiz' : 'Create New Quiz'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quiz title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter quiz description"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Limit (seconds)
                  </label>
                  <input
                    type="number"
                    value={formData.timeLimit || 300}
                    onChange={e =>
                      setFormData({ ...formData, timeLimit: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="30"
                    max="3600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Points per Question
                  </label>
                  <input
                    type="number"
                    value={formData.scorePerQuestion || 10}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        scorePerQuestion: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="100"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  {editingId ? 'Update Quiz' : 'Create Quiz'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No quizzes yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map(quiz => (
              <div key={quiz.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-800">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>

                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>📝 {quiz.questions.length} questions</p>
                  <p>⏱️ {Math.floor(quiz.timeLimit / 60)} min</p>
                  <p>⭐ {quiz.scorePerQuestion} pts/q</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(quiz)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(quiz.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>

                {deleteConfirm === quiz.id && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-800 mb-3">Are you sure? This cannot be undone.</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(quiz.id)}
                        className="flex-1 bg-red-600 text-white py-1 rounded text-sm font-semibold hover:bg-red-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="flex-1 bg-gray-300 text-gray-800 py-1 rounded text-sm font-semibold hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
