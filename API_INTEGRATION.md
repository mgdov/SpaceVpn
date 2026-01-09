# API Integration Guide

## Обзор

Этот документ описывает интеграцию фронтенда с бэкенд API Space VPN.

## API Base URL

Все запросы проксируются через nginx:

```
/api/v1/* → Backend server
```

## Аутентификация

### JWT Токены

После успешного логина токен сохраняется в localStorage и автоматически добавляется к запросам:

```typescript
// Автоматически добавляется к защищенным запросам
Authorization: Bearer<token>;
```

### Доступные функции

#### Регистрация

```typescript
import { registerUser } from '@/lib/api'

const response = await registerUser(username, email, password, fullName?)
```

#### Вход

```typescript
import { loginUser } from "@/lib/api";

const response = await loginUser(username, password);
// Токен автоматически сохраняется
```

#### Использование AuthContext

```typescript
import { useAuth } from "@/lib/auth-context";

const { user, loading, login, logout, register, refreshUser } = useAuth();

// Автоматически:
// - Сохраняет токен
// - Загружает данные пользователя
// - Обновляет UI
```

## Основные Endpoints

### 1. Пользователь

#### GET /users/me

Получить данные текущего пользователя

```typescript
import { getCurrentUserInfo } from "@/lib/api";

const response = await getCurrentUserInfo();
// response.data: User
```

#### GET /users/me/vpn ⭐ ГЛАВНЫЙ ENDPOINT

Получить VPN статус и ключ (используется на странице /account)

```typescript
import { getUserVPNStatus } from "@/lib/api";

const response = await getUserVPNStatus();
// response.data: VPNStatus
// {
//   status: 'none' | 'active' | 'expired' | 'cancelled',
//   expires_at: string | null,
//   traffic_used: number | null,
//   traffic_limit: number | null,
//   traffic_used_gb: number | null,
//   traffic_limit_gb: number | null,
//   traffic_percentage: number | null,
//   vless_uri: string | null,
//   qr_code: string | null,
//   subscription_id: number | null,
//   tariff_name: string | null
// }
```

#### PUT /users/me

Обновить профиль

```typescript
import { updateCurrentUser } from "@/lib/api";

const response = await updateCurrentUser({
  email: "new@example.com",
  full_name: "Новое Имя",
  password: "newpass123",
});
```

### 2. Тарифы

#### GET /tariffs/

Получить все активные тарифы (публичный endpoint)

```typescript
import { getPublicTariffs } from "@/lib/api";

const response = await getPublicTariffs();
// response.data: Tariff[]
```

#### GET /tariffs/{id}

Получить один тариф

```typescript
import { getPublicTariffById } from "@/lib/api";

const response = await getPublicTariffById("1");
```

### 3. Подписки

#### POST /subscriptions/purchase-free

Купить/активировать бесплатный тариф

```typescript
import { purchaseFreeTariff } from "@/lib/api";

const response = await purchaseFreeTariff({
  tariff_id: 1,
  bypass_preset: "chrome", // optional
});
// response.data: {
//   subscription_id: number,
//   vpn_client_id: number,
//   vless_uri: string,
//   qr_code: string,
//   expire_date: string,
//   message: string
// }
```

#### GET /subscriptions/my

Получить мои подписки

```typescript
import { getMySubscriptions } from "@/lib/api";

const response = await getMySubscriptions();
// response.data: { subscriptions: Subscription[] }
```

### 4. VPN Клиенты

#### GET /vpn-clients/

Список всех клиентов пользователя

```typescript
import { listUserVPNClients } from "@/lib/api";

const response = await listUserVPNClients();
// response.data: VPNClient[]
```

#### POST /vpn-clients/

Создать новый VPN клиент

```typescript
import { createUserVPNClient } from "@/lib/api";

const response = await createUserVPNClient({
  subscription_id: 1,
  name: "My iPhone",
  device_info: "iPhone 14 Pro", // optional
});
// response.data: {
//   id: number,
//   client_uuid: string,
//   subscription_url: string,
//   qr_code: string,
//   ...
// }
```

#### GET /vpn-clients/{id}/config

Получить полную конфигурацию клиента

```typescript
import { getUserVPNClientConfig } from "@/lib/api";

const response = await getUserVPNClientConfig("1");
// response.data: VPNConfig
// {
//   client_uuid: string,
//   name: string,
//   xray_config: object,
//   subscription_url: string,
//   qr_code: string
// }
```

#### POST /vpn-clients/{id}/regenerate

Перегенерировать конфигурацию с новыми параметрами обхода

```typescript
import { regenerateUserVPNClient } from "@/lib/api";

const response = await regenerateUserVPNClient("1", {
  bypass_preset: "google",
  // или
  fingerprint: "chrome",
  server_name: "www.google.com",
});
```

#### DELETE /vpn-clients/{id}

Удалить клиент

```typescript
import { deleteUserVPNClient } from "@/lib/api";

const response = await deleteUserVPNClient("1");
```

### 5. Bypass Presets

#### GET /vpn-clients/bypass-presets

Получить доступные пресеты обхода (публичный)

```typescript
import { getBypassPresets } from "@/lib/api";

const response = await getBypassPresets();
// response.data: {
//   presets: [
//     {
//       id: 'yandex',
//       name: 'Яндекс (по умолчанию)',
//       description: 'Оптимальный вариант',
//       fingerprint: 'qq',
//       server_name: 'api-maps.yandex.ru',
//       region: 'ru',
//       risk: 'low'
//     },
//     ...
//   ]
// }
```

## Использование на страницах

### Главная страница (/)

- `GET /tariffs/` - отображение тарифов в PricingSection

### Страница Pricing (/pricing)

- `GET /tariffs/` - список всех тарифов

### Страница Account (/account)

- `GET /users/me` - данные пользователя
- `GET /users/me/vpn` ⭐ - VPN статус и ключ

### Страница Tariffs (/account/tariffs)

- `GET /tariffs/` - список тарифов
- `POST /subscriptions/purchase-free` - покупка тарифа

### Страница Keys (/account/keys)

- `GET /vpn-clients/` - список ключей
- `GET /vpn-clients/{id}/config` - конфигурация ключа
- `POST /vpn-clients/` - создание нового ключа
- `POST /vpn-clients/{id}/regenerate` - перегенерация ключа
- `DELETE /vpn-clients/{id}` - удаление ключа

### Страницы Login/Register

- `POST /auth/login` - вход
- `POST /auth/register` - регистрация

## Обработка ошибок

Все функции API возвращают `ApiResponse<T>`:

```typescript
interface ApiResponse<T> {
  data?: T;
  error?: string;
  status?: number;
}

// Пример использования
const response = await getUserVPNStatus();
if (response.data) {
  // Успех
  console.log(response.data);
} else if (response.error) {
  // Ошибка
  console.error(response.error);
}
```

## Важные замечания

1. **API_BASE_URL** = `/api/v1` - все запросы проксируются через nginx
2. **JWT токены** автоматически управляются через localStorage
3. **Endpoint /users/me/vpn** - основной для отображения VPN статуса
4. **duration_months: 0** означает тестовый тариф на 1 день
5. **data_limit_gb: 0** означает безлимитный трафик
6. **Reality НЕ скрывает IP сервера**, только обходит DPI
7. **VLESS URI** можно вставить в любой VPN клиент
8. **QR код** - base64 PNG изображение

## Примеры интеграции

### Полный flow регистрации и покупки

```typescript
// 1. Регистрация
const registerResponse = await registerUser(
  "newuser",
  "new@example.com",
  "secure123"
);

// 2. Вход (автоматический после register в AuthContext)
const loginResponse = await loginUser("newuser", "secure123");

// 3. Получить тарифы
const tariffsResponse = await getPublicTariffs();
const tariff = tariffsResponse.data?.[0];

// 4. Купить тариф
const purchaseResponse = await purchaseFreeTariff({
  tariff_id: tariff.id,
  bypass_preset: "chrome",
});

// 5. Получить VLESS URI
console.log("VLESS:", purchaseResponse.data?.vless_uri);
console.log("QR:", purchaseResponse.data?.qr_code);

// 6. Проверить VPN статус
const vpnStatusResponse = await getUserVPNStatus();
console.log("Status:", vpnStatusResponse.data?.status);
```

### Работа с VPN клиентами

```typescript
// Список клиентов
const clientsResponse = await listUserVPNClients();
const clients = clientsResponse.data || [];

// Получить конфигурацию первого клиента
if (clients.length > 0) {
  const configResponse = await getUserVPNClientConfig(clients[0].id.toString());
  console.log("Config:", configResponse.data);
}

// Создать новый клиент
const newClientResponse = await createUserVPNClient({
  subscription_id: 1,
  name: "My Laptop",
});

// Перегенерировать с другим пресетом
const regenerateResponse = await regenerateUserVPNClient(
  newClientResponse.data?.id.toString()!,
  {
    bypass_preset: "google",
  }
);
```
