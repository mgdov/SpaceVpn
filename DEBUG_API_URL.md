# Отладка проблемы с API URL

## Проблема
Фронтенд все еще пытается подключиться к `localhost:8000` вместо `https://space-vpn.tech`.

## Шаги для исправления

### 1. Проверьте API на сервере

```bash
# На сервере
cd ~/SpaceBack
./scripts/testing/test_api_health.sh
```

Или вручную:
```bash
curl https://space-vpn.tech/api/v1/health
```

### 2. Убедитесь, что Next.js перезапущен

**КРИТИЧНО:** Next.js загружает переменные окружения только при запуске!

```bash
cd ~/SpaceVpn

# 1. Остановите Next.js (Ctrl+C в терминале где запущен npm run dev)

# 2. Удалите кэш
rm -rf .next

# 3. Проверьте .env.local
cat .env.local
# Должно быть:
# NEXT_PUBLIC_API_URL=https://space-vpn.tech
# NEXT_PUBLIC_API_V1=/api/v1

# 4. Запустите снова
npm run dev
```

### 3. Проверьте в консоли браузера

Откройте DevTools (F12) → Console и выполните:

```javascript
// Проверьте переменную окружения
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL)

// Проверьте, какой URL используется
// После перезапуска Next.js вы должны увидеть в консоли:
// [API Client] { endpoint: '/auth/register', API_BASE_URL: 'https://space-vpn.tech/api/v1', ... }
```

### 4. Очистите кэш браузера

- **Chrome/Edge:** Ctrl+Shift+Delete → Очистить кэш
- **Или:** Правый клик на кнопке обновления → "Очистить кэш и жесткая перезагрузка"
- **Или:** Ctrl+Shift+R (Windows/Linux) / Cmd+Shift+R (Mac)

### 5. Проверьте Network tab

В DevTools → Network:
- Найдите запрос к `/auth/register`
- Проверьте URL в колонке "Request URL"
- Должно быть: `https://space-vpn.tech/api/v1/auth/register`
- НЕ должно быть: `http://localhost:8000/api/v1/auth/register`

## Если все еще не работает

### Вариант 1: Использовать относительный путь (рекомендуется)

Если фронтенд и бэкенд на одном домене, используйте относительный путь:

В `.env.local`:
```env
# Закомментируйте NEXT_PUBLIC_API_URL
# NEXT_PUBLIC_API_URL=https://space-vpn.tech
NEXT_PUBLIC_API_V1=/api/v1
```

Это заставит использовать относительный путь `/api/v1`, который будет работать через nginx proxy.

### Вариант 2: Проверить, нет ли жестко прописанного localhost

```bash
cd ~/SpaceVpn
grep -r "localhost:8000" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"
```

Если найдете, замените на переменную окружения.

### Вариант 3: Проверить next.config

```bash
cat next.config.mjs
```

Убедитесь, что там нет переопределения переменных окружения.

## Проверка после исправления

После всех шагов, в консоли браузера при попытке регистрации вы должны увидеть:

```
[API Client] {
  endpoint: '/auth/register',
  API_BASE_URL: 'https://space-vpn.tech/api/v1',
  fullUrl: 'https://space-vpn.tech/api/v1/auth/register',
  envUrl: 'https://space-vpn.tech'
}
```

И в Network tab запрос должен идти на `https://space-vpn.tech/api/v1/auth/register`.
