# Резюме исправлений фронтенда для совместимости с бэкендом

## ✅ Исправленные файлы

### 1. `lib/api.ts` - Интерфейсы TypeScript

**VPNClient интерфейс:**
- ✅ `id: string` → `id: number`
- ✅ `uuid: string` → `client_uuid: string`
- ✅ Добавлено `pasarguard_username?: string | null`
- ✅ Добавлено `subscription_url?: string | null`
- ✅ Добавлено `last_connected_at?: string | null`
- ✅ Убрано: `email`, `data_limit_gb`, `data_used_gb`, `expiry_date`, `is_active` (нет в бэке)

**Tariff интерфейс:**
- ✅ `id: string` → `id: number`
- ✅ `duration_days: number` → `duration_months: number`
- ✅ `data_limit_gb: number | null` → `data_limit_gb: number`
- ✅ Добавлено: `tagline`, `devices_count`, `is_featured`, `features`
- ✅ Убрано: `created_at`, `updated_at` (нет в TariffPublic)

**Subscription интерфейс:**
- ✅ `id: string` → `id: number`
- ✅ `user_id: string` → `user_id: number`
- ✅ Убрано: `tariff_id`, `plan_name`, `end_date`
- ✅ Добавлено: `plan`, `status`, `expire_date`, `pasarguard_username`
- ✅ Изменено: `data_limit_gb` → `data_limit` (в bytes), `data_used_gb` → `used_traffic`

**User интерфейс:**
- ✅ `id: string` → `id: number`

**VPNConfig интерфейс:**
- ✅ `config_json: string` → `xray_config: any`
- ✅ `qr_code_base64: string` → `qr_code: string`
- ✅ `share_link: string` → `subscription_url: string`

### 2. `components/pricing-section.tsx`

- ✅ `duration_days` → `duration_months`
- ✅ Исправлены вычисления (не делим на 30, так как уже в месяцах)
- ✅ Обновлен fallbackTariffs
- ✅ Исправлен `formatDuration` для работы с месяцами

### 3. `app/account/tariffs/page.tsx`

- ✅ `duration_days` → `duration_months`
- ✅ Обновлен fallbackTariffs
- ✅ Исправлено создание подписки (использует `plan` вместо `tariff_id`)
- ✅ Исправлено использование `subscription.expire_date` вместо `end_date`
- ✅ Исправлено использование `subscription.plan` вместо `plan_name`

### 4. `app/account/keys/page.tsx`

- ✅ `selectedClientId: string` → `selectedClientId: number`
- ✅ `uuid` → `client_uuid`
- ✅ `config_json` → `xray_config` (с JSON.stringify)
- ✅ `qr_code_base64` → `qr_code`
- ✅ `share_link` → `subscription_url`
- ✅ Убрана секция статистики (использовала несуществующие поля)
- ✅ Добавлена логика получения активной подписки перед созданием VPN клиента

### 5. `components/admin/tariffs/tariff-table.tsx`

- ✅ `duration_days` → `duration_months`
- ✅ `id: string` → `id: number` в параметрах функций

### 6. `components/admin/keys/key-table.tsx`

- ✅ `uuid` → `client_uuid`
- ✅ Убрано использование: `email`, `expiry_date`, `data_limit_gb`, `data_used_gb`, `is_active`
- ✅ `id: string` → `id: number` в параметрах функций
- ✅ Убрана кнопка toggle (нет в новой модели)

### 7. `app/admin/page.tsx`

- ✅ `duration_days` → `duration_months` во всех местах
- ✅ Исправлена работа с tariff.id (number вместо string)
- ✅ Обновлена логика создания/обновления тарифов
- ✅ Исправлена работа с subscription.tariff_id

## 📝 Важные изменения

### Эндпоинты остались прежними:
- ✅ `GET /api/v1/vpn-clients`
- ✅ `PUT /api/v1/vpn-clients/{id}`
- ✅ `DELETE /api/v1/vpn-clients/{id}`
- ✅ `GET /api/v1/tariffs`

### Что теперь работает корректно:

1. **VPN Clients:**
   - Создание требует `subscription_id` (number)
   - Все поля соответствуют бэкенду
   - UUID теперь называется `client_uuid`

2. **Tariffs:**
   - Используется `duration_months` вместо `duration_days`
   - Все вычисления работают с месяцами напрямую
   - ID теперь number

3. **Subscriptions:**
   - Используется `plan` (строка enum) вместо `tariff_id`
   - Используется `expire_date` вместо `end_date`
   - Все ID теперь number

## ⚠️ Что нужно проверить после деплоя:

1. Создание VPN клиента требует активной подписки - убедитесь что пользователи могут создавать подписки
2. Определение плана при покупке тарифа - сейчас определяется по имени тарифа (basic/premium/unlimited/free)
3. Админские эндпоинты VPN клиентов используют старую структуру - если нужны, их нужно обновить отдельно

## ✅ Готово к деплою

Все изменения совместимы с бэкендом. Код компилируется без ошибок.
