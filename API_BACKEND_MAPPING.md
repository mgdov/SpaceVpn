# Соответствие API: фронт ↔ бэкенд (SpaceBack)

Базовый URL API: `NEXT_PUBLIC_API_URL + NEXT_PUBLIC_API_V1` (по умолчанию `/api/v1`).

---

## Auth (`/auth`)

| Фронт (lib/api/auth.ts) | Бэкенд (app/api/auth.py) | Примечание |
|-------------------------|---------------------------|------------|
| `POST /auth/register` body: `{ username?, email, password, full_name? }` | `POST /auth/register` body: **UserRegister** `{ email, password }` | Бэк генерирует username из email; лишние поля игнорируются |
| `POST /auth/login` form: `username`, `password` | `POST /auth/login` OAuth2 form | ✓ |
| `POST /auth/verify-email` body: `{ email, code }` | `POST /auth/verify-email` **VerifyEmailRequest** | ✓ |
| `POST /auth/send-verification-code` body: `{ email, purpose }` | `POST /auth/send-verification-code` **SendVerificationCodeRequest** | purpose: `register` \| `reset_password` \| `login` |
| `POST /auth/verify-code` body: `{ email, code, purpose }` | `POST /auth/verify-code` **VerifyCodeRequest** | ✓ |
| `POST /auth/reset-password` body: `{ email, code, new_password }` | `POST /auth/reset-password` **ResetPasswordRequest** | ✓ |

Ответ логина/verify-email: `{ access_token, token_type: "bearer" }`. Фронт сохраняет `access_token` в localStorage и подставляет в `Authorization: Bearer <token>`.

---

## Users (`/users`)

| Фронт (lib/api/users.ts) | Бэкенд (app/api/users.py) |
|--------------------------|----------------------------|
| `GET /users/me` | `GET /users/me` **UserResponse** |
| `PUT /users/me` | `PUT /users/me` обновление профиля |
| `GET /users/{user_id}/vpn` | `GET /users/{user_id}/vpn` VPNStatusResponse (legacy) |

---

## Tariffs (`/tariffs`) — публичные, без авторизации

| Фронт (lib/api/tariffs.ts) | Бэкенд (app/api/tariffs.py) |
|----------------------------|------------------------------|
| `GET /tariffs/` → **Tariff[]** | `GET /tariffs/` **List[TariffPublic]** |
| `GET /tariffs/{id}` | `GET /tariffs/{tariff_id}` **TariffPublic** |

**TariffPublic**: `id`, `name`, `description`, `tagline`, `price`, `duration_days`, `data_limit_gb`, `devices_count`, `is_active`, `is_featured`, `features`. Фронт тип **Tariff** совместим (доп. поля опциональны).

---

## Subscriptions (`/subscriptions`) — требуется JWT

| Фронт (lib/api/subscriptions.ts) | Бэкенд (app/api/subscriptions.py) |
|----------------------------------|-----------------------------------|
| `GET /subscriptions/my` → **MySubscriptionsResponse** | `GET /subscriptions/my` → `{ subscriptions: [...] }` |
| `POST /subscriptions/purchase-free` body: `{ tariff_id, bypass_preset? }` | `POST /subscriptions/purchase-free` **PurchaseRequest** `tariff_id`, `bypass_preset` (default "chrome") |

---

## Payments (`/payments`) — требуется JWT

| Фронт (lib/api/payments.ts) | Бэкенд (app/api/payments.py) |
|-----------------------------|------------------------------|
| `POST /payments/create` body: `{ tariff_id, return_url? }` | `POST /payments/create` **CreatePaymentRequest** | **Только для авторизованных.** При активной подписке бэк возвращает 400 «У вас уже есть активная подписка». |
| `GET /payments/{payment_id}` | `GET /payments/{payment_id}` **PaymentResponse** (свой платёж или админ) |

Важно: создание платежа (ЮKassa) возможно только с авторизацией. Кнопка «Купить без регистрации» для платного тарифа без логина приведёт к 401; для такого сценария нужен либо редирект на регистрацию/логин, либо отдельный бэкенд-эндпоинт анонимной оплаты.

---

## VPN Keys (`/vpn-clients`) — требуется JWT

| Фронт (lib/api/vpn-keys.ts) | Бэкенд (app/api/vpn_clients.py) |
|-----------------------------|----------------------------------|
| `GET /vpn-clients/keys` → **VPNKeyListResponse** `{ keys, total }` | `GET /vpn-clients/keys` **VPNKeyListResponse** |
| `GET /vpn-clients/keys/{key_id}` | `GET /vpn-clients/keys/{key_id}` **VPNKeyStatus** |
| `GET /vpn-clients/keys/{key_id}/happ-link` → `{ happ_link, vless_url?, qr_code? }` | `GET /vpn-clients/keys/{key_id}/happ-link` то же |
| `POST /vpn-clients/keys/{key_id}/extend` body: `{ tariff_id?, days? }` | `POST /vpn-clients/keys/{key_id}/extend` **ExtendKeyRequest**; продление только при `can_extend` (активен или в grace period 30 дней) |
| `GET /vpn-clients/{id}/config` | `GET /vpn-clients/{client_id}/config` **VPNClientConfig** (subscription_url, xray_config, qr_code) |
| `GET /vpn-clients/bypass-presets` | `GET /vpn-clients/bypass-presets` **BypassPresetResponse** |

**VPNKeyStatus** (бэк → фронт): `id`, `key_id`, `name`, `status`, `expire_date` (ISO), `time_remaining`, `time_remaining_seconds`, `time_remaining_days`, `time_remaining_hours`, `is_expired`, `within_grace_period`, трафик, `subscription_url`, `qr_code`, `happ_deeplink`, `can_extend`, `can_delete`. Поле `name` добавлено на бэке для отображения имени ключа в карточке.

---

## Public API (`/public`) — без авторизации

Используется для сценариев «без регистрации» (поиск/создание/продление ключа по идентификатору).

| Фронт (lib/api/public-api.ts) | Бэкенд (app/api/public.py) |
|-------------------------------|----------------------------|
| `GET /public/tariffs` | `GET /public/tariffs` список тарифов |
| `POST /public/key/search` | `POST /public/key/search` поиск ключа |
| `POST /public/key/create` | `POST /public/key/create` создание ключа без пользователя |
| `POST /public/key/renew` | `POST /public/key/renew` продление по key_identifier |
| `GET /public/key/by-payment/{payment_id}` | `GET /public/key/by-payment/{payment_id}` |

Для оплаты через ЮKassa с фронта используется только `POST /payments/create` (с JWT); публичные эндпоинты не создают платежи.

---

## Health

| Фронт | Бэкенд |
|-------|--------|
| `GET /health` (опционально) | `GET /api/v1/health` и `GET /health` (корень приложения) |

---

## Итог

- Регистрация, логин, верификация email, тарифы (GET), подписки (my, purchase-free), платежи (create, get), VPN ключи (keys, status, happ-link, extend, config), bypass-presets — пути и контракты согласованы.
- Поле **name** в **VPNKeyStatus** добавлено на бэкенде и отдаётся в списке ключей.
- «Купить без регистрации» для платного тарифа: сейчас возможен только после входа; при необходимости — отдельный сценарий анонимной оплаты на бэкенде.
