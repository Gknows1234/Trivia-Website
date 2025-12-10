import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center gap-4">
                <span
                    onClick={() => navigate('/')}
                    className="text-xl font-bold text-blue-600 cursor-pointer hover:text-blue-700"
                >
                    🎯 TriviaTrek
                </span>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="text-gray-700">
                            Welcome, <span className="font-semibold text-purple-600">{user.name}</span>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
