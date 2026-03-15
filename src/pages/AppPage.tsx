import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { apiRequest } from '../api/apiClient'
import type { Chat } from '../types/types'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'

export default function AppPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)

  useEffect(() => {
    apiRequest<Chat[]>('/chats').then(setChats).catch(console.error)
  }, [])

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  async function handleNewChat() {
    try {
      const newChat = await apiRequest<Chat>('/chats', {
        method: 'POST',
        body: JSON.stringify({ title: 'New Chat' }),
      })
      setChats((prev) => [newChat, ...prev])
      setActiveChatId(newChat.id)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
        onLogout={handleLogout}
      />
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {activeChatId ? (
          <ChatWindow key={activeChatId} chatId={activeChatId} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <p className="text-gray-400 text-sm">Select a chat or start a new one</p>
            <button
              onClick={handleNewChat}
              className="mt-1 px-4 py-2 text-sm text-blue-500 hover:text-blue-600 border border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-md transition-colors"
            >
              New Chat
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
