/**
 * Утилиты для работы с датами и временем
 */

/**
 * Форматировать дату
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Не указана'

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Некорректная дата'

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Форматировать дату кратко
 */
export function formatDateShort(dateString: string | null | undefined): string {
  if (!dateString) return 'Не указана'

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Некорректная дата'

  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/**
 * Получить время до истечения
 */
export function getTimeRemaining(expiresAt: string | null | undefined): string {
  if (!expiresAt) return 'Не указано'

  const now = new Date().getTime()
  const expiry = new Date(expiresAt).getTime()
  const diff = expiry - now

  if (diff <= 0) return 'Истёк'

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} д.`
  }
  if (hours > 0) {
    return `${hours} ч.`
  }
  if (minutes > 0) {
    return `${minutes} мин.`
  }
  return `${seconds} сек.`
}

/**
 * Проверить, истек ли срок
 */
export function isExpired(expiresAt: string | null | undefined): boolean {
  if (!expiresAt) return false
  return new Date(expiresAt).getTime() < Date.now()
}

/**
 * Проверить, скоро ли истечет (меньше 24 часов)
 */
export function isExpiringSoon(expiresAt: string | null | undefined): boolean {
  if (!expiresAt) return false
  const diff = new Date(expiresAt).getTime() - Date.now()
  return diff > 0 && diff < 24 * 60 * 60 * 1000
}

/**
 * Форматировать относительное время
 */
export function formatRelativeTime(dateString: string | null | undefined): string {
  if (!dateString) return 'Никогда'

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Некорректная дата'

  const now = Date.now()
  const diff = now - date.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} дней назад`
  if (hours > 0) return `${hours} часов назад`
  if (minutes > 0) return `${minutes} минут назад`
  return 'Только что'
}
