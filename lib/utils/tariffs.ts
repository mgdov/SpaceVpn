/**
 * Утилиты для работы с тарифами
 */

/**
 * Конвертировать дни в месяцы
 */
export function daysToMonths(days: number): number {
  return Math.ceil(days / 30)
}

/**
 * Конвертировать месяцы в дни
 */
export function monthsToDays(months: number): number {
  return months * 30
}

/**
 * Форматировать длительность тарифа
 * @param days количество дней
 */
export function formatDuration(days: number): string {
  if (days < 30) {
    if (days === 1) return '1 день'
    if (days < 5) return `${days} дня`
    return `${days} дней`
  }

  const months = Math.round(days / 30)
  if (months < 12) {
    if (months === 1) return '1 месяц'
    if (months < 5) return `${months} месяца`
    return `${months} месяцев`
  }

  const years = Math.round(months / 12)
  if (years === 1) return '1 год'
  if (years < 5) return `${years} года`
  return `${years} лет`
}

/**
 * Форматировать цену
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(price)
}

/**
 * Форматировать дата-лимит
 */
export function formatDataLimit(gb: number): string {
  if (gb === 0) return 'Безлимит'
  if (gb >= 1000) return `${gb / 1000} ТБ`
  return `${gb} ГБ`
}
