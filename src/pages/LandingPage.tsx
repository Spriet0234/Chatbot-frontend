import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

const features = [
  {
    title: 'Fast Conversations',
    description: 'Instant responses with a clean, distraction-free interface.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Secure Accounts',
    description: 'JWT-based authentication keeps your sessions and data private.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: 'Persistent History',
    description: 'Every conversation is saved so you can pick up where you left off.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function LandingPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return <Navigate to="/app" replace />

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white">
        <span className="text-gray-900 font-semibold text-base tracking-tight">Chatbot</span>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-8 pt-24 pb-20">
        <h1 className="text-4xl font-bold text-gray-900 max-w-xl leading-tight mb-4">
          Your AI Assistant for Smarter Conversations
        </h1>
        <p className="text-gray-500 text-lg max-w-md mb-10">
          A simple and powerful chat interface powered by AI.
        </p>
        <div className="flex items-center gap-3">
          <Link
            to="/signup"
            className="px-6 py-2.5 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            Start Chatting
          </Link>
          <Link
            to="/login"
            className="px-6 py-2.5 text-sm font-medium border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-md transition-colors"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-8 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <div className="text-blue-500 mb-3">{f.icon}</div>
            <h3 className="text-gray-900 font-medium text-sm mb-1.5">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
          </div>
        ))}
      </section>

    </div>
  )
}
