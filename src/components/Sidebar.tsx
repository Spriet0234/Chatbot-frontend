import { useRef, useEffect, useState } from 'react'
import type { Chat } from '../types/types'

interface SidebarProps {
  chats: Chat[]
  activeChatId: string | null
  onSelectChat: (id: string) => void
  onNewChat: () => void
  onLogout: () => void
}

export default function Sidebar({ chats, activeChatId, onSelectChat, onNewChat, onLogout }: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <aside className="w-64 bg-white flex flex-col border-r border-gray-200 shrink-0">

      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-200">
        <span className="text-gray-900 font-semibold text-sm tracking-tight">Chatbot</span>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {chats.length === 0 && (
          <p className="text-xs text-gray-400 px-3 py-2">No chats yet</p>
        )}
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm mb-0.5 transition-colors truncate ${
              activeChatId === chat.id
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
            }`}
          >
            {chat.title}
          </button>
        ))}
      </div>

      {/* User / Logout */}
      <div className="p-3 border-t border-gray-200" ref={menuRef}>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 shrink-0">
              U
            </div>
            <span className="truncate">Account</span>
            <svg className="w-3.5 h-3.5 ml-auto shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-md overflow-hidden shadow-md">
              <button
                onClick={onLogout}
                className="w-full text-left px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

    </aside>
  )
}
