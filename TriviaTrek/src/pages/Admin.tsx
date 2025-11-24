import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Quiz, Question, Option } from '../types'
import { apiClient } from '../lib/api'

export const Admin: React.FC = () => {
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const [formData, setFormData] = useState<Omit<Quiz, 'id'>>({
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

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      showToast('Title is required', 'error')
      return false
    }
    if (formData.questions.length === 0) {
      showToast('At least one question is required', 'error')
      return false
    }
    for (const q of formData.questions) {
      if (!q.text.trim()) {
        showToast('All questions must have text', 'error')
        return false
      }
      if (q.options.length < 2) {
        showToast('Each question must have at least 2 options', 'error')
        return false
      }
      for (const opt of q.options) {
        if (!opt.text.trim()) {
          showToast('All options must have text', 'error')
          return false
        }
      }
    }
    return true
  }

  const handleSave = async () => {
    if (!validateForm()) return

    try {
      if (editingId) {
        await apiClient.put(`/quizzes/${editingId}`, formData)
        showToast('Quiz updated successfully', 'success')
      } else {
        await apiClient.post('/quizzes', formData)
        showToast('Quiz created successfully', 'success')
      }
      resetForm()
      fetchQuizzes()
    } catch (err) {
      showToast('Failed to save quiz', 'error')
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return

    try {
      await apiClient.delete(`/quizzes/${id}`)
      showToast('Quiz deleted successfully', 'success')
      fetchQuizzes()
    } catch (err) {
      showToast('Failed to delete quiz', 'error')
      console.error(err)
    }
  }

  const handleEdit = (quiz: Quiz) => {
    setFormData({
      title: quiz.title,
      description: quiz.description,
      timeLimit: quiz.timeLimit,
      scorePerQuestion: quiz.scorePerQuestion,
      questions: quiz.questions,
    })
    setEditingId(quiz.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      timeLimit: 300,
      scorePerQuestion: 10,
      questions: [],
    })
    setEditingId(null)
    setShowForm(false)
  }

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: Date.now().toString(),
          text: '',
          options: [
            { id: '1', text: '' },
            { id: '2', text: '' },
          ],
          correctOptionIndex: 0,
        },
      ],
    }))
  }

  const updateQuestion = (index: number, field: string, value: unknown) => {
    setFormData((prev) => {
      const newQuestions = [...prev.questions]
      newQuestions[index] = { ...newQuestions[index], [field]: value }
      return { ...prev, questions: newQuestions }
    })
  }

  const updateOption = (qIndex: number, oIndex: number, text: string) => {
    setFormData((prev) => {
      const newQuestions = [...prev.questions]
      newQuestions[qIndex].options[oIndex] = {
        ...newQuestions[qIndex].options[oIndex],
        text,
      }
      return { ...prev, questions: newQuestions }
    })
  }

  const removeQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }))
  }

  const addOption = (qIndex: number) => {
    setFormData((prev) => {
      const newQuestions = [...prev.questions]
      newQuestions[qIndex].options.push({
        id: Date.now().toString(),
        text: '',
      })
      return { ...prev, questions: newQuestions }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="tt-loading">
          <svg
            className="animate-spin h-12 w-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Admin Panel</h1>
          <button
            onClick={() => navigate('/')}
            className="tt-btn-ghost"
          >
            ← Back Home
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`mb-4 p-4 rounded-lg text-white ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {toast.message}
          </div>
        )}

        {/* Add Quiz Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="tt-btn-primary mb-8"
          >
            + Add New Quiz
          </button>
        )}

        {/* Quiz Form */}
        {showForm && (
          <div className="tt-card mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Quiz' : 'Create New Quiz'}</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Quiz title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Quiz description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Time Limit (seconds)</label>
                  <input
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, timeLimit: parseInt(e.target.value) }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Points per Question</label>
                  <input
                    type="number"
                    value={formData.scorePerQuestion}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, scorePerQuestion: parseInt(e.target.value) }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4">Questions</h3>
              {formData.questions.map((question, qIndex) => (
                <div key={question.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                      placeholder="Question text"
                    />
                    <button
                      onClick={() => removeQuestion(qIndex)}
                      className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, oIndex) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={question.correctOptionIndex === oIndex}
                          onChange={() => updateQuestion(qIndex, 'correctOptionIndex', oIndex)}
                          className="w-4 h-4"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-lg"
                          placeholder={`Option ${oIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => addOption(qIndex)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    + Add Option
                  </button>
                </div>
              ))}

              <button
                onClick={addQuestion}
                className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600"
              >
                + Add Question
              </button>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="tt-btn-primary flex-1"
              >
                {editingId ? 'Update Quiz' : 'Create Quiz'}
              </button>
              <button
                onClick={resetForm}
                className="tt-btn-ghost flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Quizzes List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Existing Quizzes</h2>
          {quizzes.length === 0 ? (
            <p className="text-white">No quizzes yet. Create one to get started!</p>
          ) : (
            quizzes.map((quiz) => (
              <div key={quiz.id} className="tt-card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
                    <p className="text-gray-600 mb-3">{quiz.description}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>📝 {quiz.questions.length} questions</span>
                      <span>⏱️ {Math.floor(quiz.timeLimit / 60)} min</span>
                      <span>⭐ {quiz.scorePerQuestion} pts/q</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(quiz)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
