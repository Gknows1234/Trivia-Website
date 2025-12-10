import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

const API_URL = 'http://localhost:4000'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('triviatrek_user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const response = await axios.get(`${API_URL}/users?email=${email}`)
        const users = response.data

        if (users.length === 0) {
            throw new Error('User not found')
        }

        const foundUser = users[0]
        if (foundUser.password !== password) {
            throw new Error('Invalid password')
        }

        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem('triviatrek_user', JSON.stringify(userWithoutPassword))
        return userWithoutPassword
    }

    const register = async (name, email, password) => {
        // Check if user already exists
        const existing = await axios.get(`${API_URL}/users?email=${email}`)
        if (existing.data.length > 0) {
            throw new Error('Email already registered')
        }

        const newUser = {
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        }

        const response = await axios.post(`${API_URL}/users`, newUser)
        const { password: _, ...userWithoutPassword } = response.data
        setUser(userWithoutPassword)
        localStorage.setItem('triviatrek_user', JSON.stringify(userWithoutPassword))
        return userWithoutPassword
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('triviatrek_user')
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
