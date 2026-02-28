import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { apiRequest } from "../api/apiClient";
import type { Chat } from "../types/types";
import ChatWindow from "../components/ChatWindow";

function AccountDropdown({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="account-dropdown">
      <button onClick={() => setOpen((v) => !v)}>Account ▲</button>
      {open && (
        <div className="dropdown-menu">
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default function AppPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    apiRequest<Chat[]>("/chats").then(setChats).catch(console.error);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-chats">
          <button className="new-chat-btn">+ New Chat</button>
          {chats.map((c) => (
            <div
              key={c.id}
              className={`chat-item ${c.id === activeChatId ? "active" : ""}`}
              onClick={() => setActiveChatId(c.id)}
            >
              {c.title}
            </div>
          ))}
        </div>
        <AccountDropdown onLogout={handleLogout} />
      </aside>
      <main className="chat-main">
        {activeChatId ? (
          <ChatWindow chatId={activeChatId} />
        ) : (
          <div className="empty-state">Select or start a chat</div>
        )}
      </main>
    </div>
  );
}
