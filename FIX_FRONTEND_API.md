# Исправление фронтенда - ERR_CONNECTION_REFUSED

## Проблема
Фронтенд пытается подключиться к `localhost:8000` вместо `https://space-vpn.tech`.

## Причина
В `.env.local` переменная `NEXT_PUBLIC_API_URL` была закомментирована, поэтому использовался fallback `http://localhost:8000` из `lib/api/client.ts`.

## Исправления

### 1. Обновлен `lib/api/client.ts`
- Fallback изменен с `'http://localhost:8000'` на `''` (пустая строка)
- Теперь используется относительный путь `/api/v1` если переменная не установлена

### 2. Обновлен `.env.local`
- Раскомментирован `NEXT_PUBLIC_API_URL=https://space-vpn.tech`

## Что нужно сделать

### 1. Перезапустите Next.js dev server

**КРИТИЧНО:** Next.js загружает переменные окружения только при запуске!

```bash
cd ~/SpaceVpn

# Остановите Next.js (Ctrl+C в терминале где запущен npm run dev)

# Удалите кэш
rm -rf .next

# Запустите снова
npm run dev
```

### 2. Очистите кэш браузера

- Откройте DevTools (F12)
- Правый клик на кнопке обновления → "Очистить кэш и жесткая перезагрузка"
- Или `Ctrl+Shift+R` / `Cmd+Shift+R`

### 3. Проверьте в консоли браузера

После перезапуска Next.js, откройте консоль (F12) и выполните:

```javascript
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
// Должно вывести: https://space-vpn.tech
```

### 4. Проверьте Network tab

В DevTools → Network:
- Найдите запрос к `/auth/register`
- Request URL должен быть: `https://space-vpn.tech/api/v1/auth/register`
- НЕ должно быть: `http://localhost:8000/api/v1/auth/register`

## Если все еще не работает

### Проверьте, что изменения применены

```bash
# Проверьте .env.local
cat .env.local
# Должно быть: NEXT_PUBLIC_API_URL=https://space-vpn.tech

# Проверьте client.ts
grep "API_URL" lib/api/client.ts
# Должно быть: const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
```

### Убедитесь, что Next.js перезапущен

Next.js загружает переменные окружения только при запуске. Если вы не перезапустили после изменения `.env.local`, переменные не загрузятся.

### Проверьте, нет ли других API клиентов

```bash
grep -r "localhost:8000" --include="*.ts" --include="*.tsx" lib/
```

Если найдете, замените на переменную окружения.
