import { Trash2, Power } from "lucide-react"
import type { User } from "@/lib/api"

interface UserTableProps {
  users: User[]
  currentUserId?: number
  onToggleActive: (id: number) => void
  onDelete: (id: number) => void
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function UserTable({ users, currentUserId, onToggleActive, onDelete }: UserTableProps) {
  if (!users.length) {
    return (
      <div className="bg-card border border-border overflow-hidden">
        <div className="px-4 py-6 text-center text-[9px] text-muted-foreground">
          Пользователи не найдены.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border overflow-hidden">
      <table className="w-full">
        <thead className="bg-secondary">
          <tr>
            <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ID</th>
            <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ЛОГИН</th>
            <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">EMAIL</th>
            <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">СТАТУС</th>
            <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">АДМИН</th>
            <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ДАТА</th>
            <th className="px-4 py-3 text-left text-[8px] text-muted-foreground">ДЕЙСТВИЯ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isCurrentUser = currentUserId !== undefined && user.id === currentUserId
            return (
              <tr key={user.id} className="border-t border-border">
                <td className="px-4 py-3 text-[9px] text-muted-foreground">{user.id}</td>
                <td className="px-4 py-3 text-[9px] text-foreground">{user.username}</td>
                <td className="px-4 py-3 text-[9px] text-muted-foreground">{user.email || "—"}</td>
                <td className="px-4 py-3 text-[9px]">
                  <span
                    className={`text-[8px] px-2 py-1 ${user.is_active ? "bg-primary/20 text-primary" : "bg-border text-muted-foreground"}`}
                  >
                    {user.is_active ? "Активен" : "Отключён"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[9px] text-muted-foreground">
                  {user.is_superuser ? "Да" : "—"}
                </td>
                <td className="px-4 py-3 text-[9px] text-muted-foreground">
                  {formatDate(user.created_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleActive(user.id)}
                      disabled={isCurrentUser}
                      title={isCurrentUser ? "Нельзя отключить себя" : user.is_active ? "Отключить" : "Включить"}
                      className="text-muted-foreground hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Power size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      disabled={isCurrentUser}
                      title={isCurrentUser ? "Нельзя удалить себя" : "Удалить"}
                      className="text-muted-foreground hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
