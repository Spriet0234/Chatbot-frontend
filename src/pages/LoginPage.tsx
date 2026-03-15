import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { apiRequest } from '../api/apiClient'

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/app" replace />

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      const { token } = await apiRequest<{ token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: fd.get('email'),
          password: fd.get('password'),
        }),
      })
      login(token)
      navigate('/app', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-gray-900 font-semibold text-base tracking-tight hover:text-gray-600 transition-colors">
            Chatbot
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 mt-6 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          {error && (
            <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 text-sm font-medium bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-600 transition-colors">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}
