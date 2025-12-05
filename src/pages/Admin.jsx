import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Admin() {
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    timeLimit: 300,
    questions: [],
  })

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/quizzes')
      setQuizzes(response.data)
      setLoading(false)
    } catch (err) {
      console.error('Failed to load quizzes:', err)
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'timeLimit' ? parseInt(value) : value,
    })
  }

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
        },
      ],
    })
  }

  const handleQuestionChange = (qIndex, field, value) => {
    const newQuestions = [...formData.questions]
    newQuestions[qIndex] = { ...newQuestions[qIndex], [field]: value }
    setFormData({ ...formData, questions: newQuestions })
  }

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...formData.questions]
    newQuestions[qIndex].options[oIndex] = value
    setFormData({ ...formData, questions: newQuestions })
  }

  const handleRemoveQuestion = (qIndex) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== qIndex),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      alert('Please enter a quiz title')
      return
    }

    if (formData.questions.length === 0) {
      alert('Please add at least one question')
      return
    }

    for (let i = 0; i < formData.questions.length; i++) {
      const q = formData.questions[i]
      if (!q.question.trim()) {
        alert(`Question ${i + 1}: Please enter question text`)
        return
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          alert(`Question ${i + 1}: Please fill in all options`)
          return
        }
      }
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:4000/quizzes/${editingId}`, formData)
        alert('Quiz updated successfully!')
      } else {
        await axios.post('http://localhost:4000/quizzes', formData)
        alert('Quiz created successfully!')
      }

      resetForm()
      fetchQuizzes()
    } catch (err) {
      console.error('Failed to save quiz:', err)
      alert(`Failed to save quiz: ${err.response?.data?.message || err.message}`)
    }
  }

  const handleEdit = (quiz) => {
    setEditingId(quiz.id)
    setFormData(quiz)
    window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await axios.delete(`http://localhost:4000/quizzes/${id}`)
        fetchQuizzes()
      } catch (err) {
        console.error('Failed to delete quiz:', err)
        alert('Failed to delete quiz')
      }
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      category: '',
      timeLimit: 300,
      questions: [],
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 font-semibold">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">⚙️ Admin Panel</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back Home
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingId ? 'Edit Quiz' : 'Create New Quiz'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Quiz Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                      rows="3"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Time Limit (seconds)</label>
                      <input
                        type="number"
                        name="timeLimit"
                        value={formData.timeLimit}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Questions *</h3>

                  {formData.questions.map((question, qIndex) => (
                    <div key={qIndex} className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-gray-700">Question {qIndex + 1}</h4>
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(qIndex)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-3">
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                          placeholder="Question text"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        />

                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                              placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <select
                              value={question.correctAnswer === oIndex ? 'correct' : ''}
                              onChange={(e) => {
                                if (e.target.value === 'correct') {
                                  handleQuestionChange(qIndex, 'correctAnswer', oIndex)
                                }
                              }}
                              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                              <option value="">Mark answer</option>
                              <option value="correct">✓ Correct</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                  >
                    + Add Question
                  </button>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {editingId ? 'Update Quiz' : 'Create Quiz'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Existing Quizzes</h2>

              {quizzes.length === 0 ? (
                <p className="text-gray-600">No quizzes yet</p>
              ) : (
                <div className="space-y-3">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-gray-800 mb-2">{quiz.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{quiz.questions.length} questions</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(quiz)}
                          className="flex-1 bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(quiz.id)}
                          className="flex-1 bg-red-600 text-white py-1 rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
