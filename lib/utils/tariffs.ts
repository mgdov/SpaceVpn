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
 */
export function formatDuration(months: number): string {
  if (months === 1) return '1 месяц'
  if (months < 5) return `${months} месяца`
  if (months === 12) return '1 год'
  return `${months} месяцев`
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
