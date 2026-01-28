# Исправление ошибки ERR_CONNECTION_REFUSED

## Проблема
Фронтенд пытается подключиться к `localhost:8000`, но бэкенд не запущен локально.

## Решение

### 1. Проверьте `.env.local`

Убедитесь, что файл содержит:
```env
NEXT_PUBLIC_API_URL=https://space-vpn.tech
NEXT_PUBLIC_API_V1=/api/v1
```

### 2. Перезапустите Next.js dev server

**ВАЖНО:** Next.js загружает переменные окружения только при запуске!

```bash
cd ~/SpaceVpn

# Остановите текущий процесс (Ctrl+C в терминале где запущен npm run dev)

# Удалите кэш Next.js
rm -rf .next

# Запустите снова
npm run dev
```

### 3. Очистите кэш браузера

- Откройте DevTools (F12)
- Правый клик на кнопке обновления → "Очистить кэш и жесткая перезагрузка"
- Или используйте Ctrl+Shift+R (Windows/Linux) / Cmd+Shift+R (Mac)

### 4. Проверьте, что бэкенд запущен на сервере

```bash
# На сервере
cd ~/SpaceBack
./scripts/deployment/tmux_control.sh status
```

Если не запущен:
```bash
./scripts/deployment/tmux_control.sh restart
```

### 5. Проверьте в браузере

Откройте DevTools → Network и проверьте:
- Запросы должны идти на `https://space-vpn.tech/api/v1/...`
- НЕ на `localhost:8000`

## Альтернатива: Локальная разработка

Если хотите запустить бэкенд локально:

### На сервере (в другом терминале):
```bash
cd ~/SpaceBack
source venv/bin/activate
python main.py
```

### В `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_V1=/api/v1
```

### Перезапустите Next.js:
```bash
rm -rf .next
npm run dev
```

## Проверка

После перезапуска Next.js, откройте консоль браузера и проверьте:
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
// Должно вывести: https://space-vpn.tech
```

Если выводит `undefined`, значит переменные окружения не загрузились - перезапустите Next.js.
