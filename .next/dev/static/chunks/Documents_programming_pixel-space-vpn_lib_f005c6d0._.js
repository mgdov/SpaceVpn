(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/programming/pixel-space-vpn/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Client for SpaceVPN Backend
 *
 * IMPORTANT: Always use relative paths for API requests
 * to work correctly behind the nginx reverse proxy
 */ // nginx proxies /api/v1/* to the backend
__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "adminCreateSubscription",
    ()=>adminCreateSubscription,
    "adminCreateTariff",
    ()=>adminCreateTariff,
    "adminCreateVPNClient",
    ()=>adminCreateVPNClient,
    "adminDeleteSubscription",
    ()=>adminDeleteSubscription,
    "adminDeleteTariff",
    ()=>adminDeleteTariff,
    "adminDeleteUser",
    ()=>adminDeleteUser,
    "adminDeleteVPNClient",
    ()=>adminDeleteVPNClient,
    "adminExtendSubscription",
    ()=>adminExtendSubscription,
    "adminExtendVPNClient",
    ()=>adminExtendVPNClient,
    "adminGetSubscription",
    ()=>adminGetSubscription,
    "adminGetUser",
    ()=>adminGetUser,
    "adminGetVPNClient",
    ()=>adminGetVPNClient,
    "adminListSubscriptions",
    ()=>adminListSubscriptions,
    "adminListTariffs",
    ()=>adminListTariffs,
    "adminListUsers",
    ()=>adminListUsers,
    "adminListVPNClients",
    ()=>adminListVPNClients,
    "adminMakeSuperuser",
    ()=>adminMakeSuperuser,
    "adminToggleSubscription",
    ()=>adminToggleSubscription,
    "adminToggleTariff",
    ()=>adminToggleTariff,
    "adminToggleUserActive",
    ()=>adminToggleUserActive,
    "adminToggleVPNClient",
    ()=>adminToggleVPNClient,
    "adminUpdateTariff",
    ()=>adminUpdateTariff,
    "adminUpdateVPNClient",
    ()=>adminUpdateVPNClient,
    "createSubscription",
    ()=>createSubscription,
    "createUserVPNClient",
    ()=>createUserVPNClient,
    "deleteSubscription",
    ()=>deleteSubscription,
    "deleteUserById",
    ()=>deleteUserById,
    "deleteUserVPNClient",
    ()=>deleteUserVPNClient,
    "getAdminFinanceChart",
    ()=>getAdminFinanceChart,
    "getAdminFinanceStats",
    ()=>getAdminFinanceStats,
    "getAdminPayments",
    ()=>getAdminPayments,
    "getApiInfo",
    ()=>getApiInfo,
    "getAuthToken",
    ()=>getAuthToken,
    "getBypassPresets",
    ()=>getBypassPresets,
    "getCurrentUser",
    ()=>getCurrentUser,
    "getCurrentUserInfo",
    ()=>getCurrentUserInfo,
    "getHealthStatus",
    ()=>getHealthStatus,
    "getMySubscriptions",
    ()=>getMySubscriptions,
    "getPublicTariffById",
    ()=>getPublicTariffById,
    "getPublicTariffs",
    ()=>getPublicTariffs,
    "getSubscriptionById",
    ()=>getSubscriptionById,
    "getUserById",
    ()=>getUserById,
    "getUserSubscriptions",
    ()=>getUserSubscriptions,
    "getUserVPNClient",
    ()=>getUserVPNClient,
    "getUserVPNClientConfig",
    ()=>getUserVPNClientConfig,
    "isAuthenticated",
    ()=>isAuthenticated,
    "listUserVPNClients",
    ()=>listUserVPNClients,
    "loginUser",
    ()=>loginUser,
    "logoutUser",
    ()=>logoutUser,
    "purchaseFreeTariff",
    ()=>purchaseFreeTariff,
    "regenerateUserVPNClient",
    ()=>regenerateUserVPNClient,
    "registerUser",
    ()=>registerUser,
    "removeAuthToken",
    ()=>removeAuthToken,
    "removeCurrentUser",
    ()=>removeCurrentUser,
    "setAuthToken",
    ()=>setAuthToken,
    "setCurrentUser",
    ()=>setCurrentUser,
    "syncAllVpnClients",
    ()=>syncAllVpnClients,
    "syncUserVPNClient",
    ()=>syncUserVPNClient,
    "updateCurrentUser",
    ()=>updateCurrentUser,
    "updateSubscription",
    ()=>updateSubscription,
    "updateUserVPNClient",
    ()=>updateUserVPNClient
]);
const API_BASE_URL = '/api/v1';
function buildEndpoint(endpoint) {
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    if (!endpoint || endpoint === '/') {
        return `${base}/`;
    }
    const normalized = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${base}${normalized}`;
}
function withQuery(endpoint, params) {
    if (!params) return endpoint;
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value])=>{
        if (value === undefined || value === null) return;
        search.append(key, String(value));
    });
    const query = search.toString();
    return query ? `${endpoint}?${query}` : endpoint;
}
function getAuthToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem('auth_token');
}
function setAuthToken(token) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem('auth_token', token);
}
function removeAuthToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem('auth_token');
}
function getCurrentUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const userJson = localStorage.getItem('current_user');
    return userJson ? JSON.parse(userJson) : null;
}
function setCurrentUser(user) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem('current_user', JSON.stringify(user));
}
function removeCurrentUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem('current_user');
}
function safeParseJson(payload) {
    try {
        return JSON.parse(payload);
    } catch  {
        return payload;
    }
}
/**
 * Make authenticated API request
 */ async function apiRequest(endpoint, options = {}) {
    const token = getAuthToken();
    const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
    const headers = new Headers(options.headers || {});
    if (!headers.has('Accept')) {
        headers.set('Accept', 'application/json');
    }
    const hasBody = options.body !== undefined && options.body !== null && options.body !== '';
    if (!isFormData && hasBody && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }
    if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    try {
        const response = await fetch(buildEndpoint(endpoint), {
            ...options,
            headers
        });
        const status = response.status;
        const raw = await response.text();
        const payload = raw ? safeParseJson(raw) : undefined;
        if (!response.ok) {
            if (status === 422 && Array.isArray(payload?.detail)) {
                const errors = payload.detail.map((err)=>`${err.loc?.join(' → ') || 'Field'}: ${err.msg}`).join(', ');
                return {
                    error: errors,
                    status
                };
            }
            const detail = payload?.detail || payload?.message || (Array.isArray(payload?.errors) ? payload?.errors.join(', ') : undefined);
            return {
                error: typeof detail === 'string' ? detail : `HTTP ${status}`,
                status
            };
        }
        return {
            data: payload,
            status
        };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Network error'
        };
    }
}
async function registerUser(username, email, password, fullName) {
    return apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password,
            full_name: fullName
        })
    });
}
async function loginUser(username, password) {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    const response = await apiRequest('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    });
    if (response.data?.access_token) {
        setAuthToken(response.data.access_token);
    }
    return response;
}
function logoutUser() {
    removeAuthToken();
    removeCurrentUser();
}
function isAuthenticated() {
    return getAuthToken() !== null;
}
async function getCurrentUserInfo() {
    const response = await apiRequest('/users/me');
    if (response.data) {
        setCurrentUser(response.data);
    }
    return response;
}
async function updateCurrentUser(payload) {
    const response = await apiRequest('/users/me', {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
    if (response.data) {
        setCurrentUser(response.data);
    }
    return response;
}
async function getUserById(userId) {
    return apiRequest(`/users/${userId}`);
}
async function deleteUserById(userId) {
    return apiRequest(`/users/${userId}`, {
        method: 'DELETE'
    });
}
async function adminListUsers(params) {
    return apiRequest(withQuery('/admin/users/', params)) // Add trailing slash
    ;
}
async function adminGetUser(userId) {
    return apiRequest(`/admin/users/${userId}`);
}
async function adminDeleteUser(userId) {
    return apiRequest(`/admin/users/${userId}`, {
        method: 'DELETE'
    });
}
async function adminToggleUserActive(userId) {
    return apiRequest(`/admin/users/${userId}/toggle-active`, {
        method: 'POST'
    });
}
async function adminMakeSuperuser(userId) {
    return apiRequest(`/admin/users/${userId}/make-superuser`, {
        method: 'POST'
    });
}
async function getUserSubscriptions() {
    return apiRequest('/subscriptions/my');
}
async function getMySubscriptions() {
    return apiRequest('/subscriptions/my');
}
async function getSubscriptionById(id) {
    return apiRequest(`/subscriptions/${id}`);
}
async function createSubscription(payload) {
    return apiRequest('/subscriptions/', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}
async function updateSubscription(id, payload) {
    return apiRequest(`/subscriptions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
}
async function deleteSubscription(id) {
    return apiRequest(`/subscriptions/${id}`, {
        method: 'DELETE'
    });
}
async function adminListSubscriptions() {
    return apiRequest('/admin/subscriptions/') // Add trailing slash
    ;
}
async function adminGetSubscription(id) {
    return apiRequest(`/admin/subscriptions/${id}`);
}
async function adminCreateSubscription(payload) {
    return apiRequest('/admin/subscriptions/', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}
async function adminDeleteSubscription(id) {
    return apiRequest(`/admin/subscriptions/${id}`, {
        method: 'DELETE'
    });
}
async function adminExtendSubscription(id, payload) {
    return apiRequest(`/admin/subscriptions/${id}/extend`, {
        method: 'POST',
        body: payload ? JSON.stringify(payload) : undefined
    });
}
async function adminToggleSubscription(id) {
    return apiRequest(`/admin/subscriptions/${id}/toggle`, {
        method: 'POST'
    });
}
async function getPublicTariffs() {
    return apiRequest('/tariffs/') // Add trailing slash
    ;
}
async function getPublicTariffById(id) {
    return apiRequest(`/tariffs/${id}`);
}
async function adminListTariffs() {
    return apiRequest('/admin/tariffs/') // Add trailing slash
    ;
}
async function adminCreateTariff(payload) {
    return apiRequest('/admin/tariffs/', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}
async function adminUpdateTariff(id, payload) {
    return apiRequest(`/admin/tariffs/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload)
    });
}
async function adminDeleteTariff(id) {
    return apiRequest(`/admin/tariffs/${id}`, {
        method: 'DELETE'
    });
}
async function adminToggleTariff(id) {
    return apiRequest(`/admin/tariffs/${id}/toggle`, {
        method: 'POST'
    });
}
async function purchaseFreeTariff(data) {
    return apiRequest('/subscriptions/purchase-free', {
        method: 'POST',
        body: JSON.stringify(data)
    });
}
async function createUserVPNClient(payload) {
    return apiRequest('/vpn-clients', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}
async function listUserVPNClients() {
    return apiRequest('/vpn-clients');
}
async function getUserVPNClient(id) {
    return apiRequest(`/vpn-clients/${id}`);
}
async function updateUserVPNClient(id, payload) {
    return apiRequest(`/vpn-clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
}
async function deleteUserVPNClient(id) {
    return apiRequest(`/vpn-clients/${id}`, {
        method: 'DELETE'
    });
}
async function getUserVPNClientConfig(id) {
    return apiRequest(`/vpn-clients/${id}/config`);
}
async function regenerateUserVPNClient(id, payload) {
    return apiRequest(`/vpn-clients/${id}/regenerate`, {
        method: 'POST',
        body: payload ? JSON.stringify(payload) : undefined
    });
}
async function getBypassPresets() {
    return apiRequest('/vpn-clients/bypass-presets');
}
async function syncUserVPNClient(id) {
    return apiRequest(`/vpn-clients/${id}/sync`, {
        method: 'POST'
    });
}
async function adminListVPNClients() {
    return apiRequest('/admin/vpn/clients/') // Add trailing slash
    ;
}
async function adminGetVPNClient(id) {
    return apiRequest(`/admin/vpn/clients/${id}`);
}
async function adminCreateVPNClient(payload) {
    return apiRequest('/admin/vpn/clients/', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}
async function adminUpdateVPNClient(id, payload) {
    return apiRequest(`/admin/vpn/clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
}
async function adminDeleteVPNClient(id) {
    return apiRequest(`/admin/vpn/clients/${id}`, {
        method: 'DELETE'
    });
}
async function adminExtendVPNClient(id, payload) {
    return apiRequest(`/admin/vpn/clients/${id}/extend`, {
        method: 'POST',
        body: payload ? JSON.stringify(payload) : undefined
    });
}
async function adminToggleVPNClient(id) {
    return apiRequest(`/admin/vpn/clients/${id}/toggle`, {
        method: 'POST'
    });
}
async function syncAllVpnClients() {
    return apiRequest('/internal/pasarguard/sync', {
        method: 'POST'
    });
}
async function getAdminFinanceStats() {
    return apiRequest('/admin/finance/stats');
}
async function getAdminFinanceChart(period) {
    return apiRequest(`/admin/finance/chart/${period}`);
}
async function getAdminPayments(params) {
    return apiRequest(withQuery('/admin/finance/payments', params));
}
async function getHealthStatus() {
    return apiRequest('/health');
}
async function getApiInfo() {
    return apiRequest('/');
} // ВРЕМЕННО ОТКЛЮЧЕНО: YooKassa endpoints не реализованы на backend
 // Будет добавлено позже при интеграции платежного шлюза
 /*
export interface CreateYookassaPaymentPayload {
  tariffId: number
  plan: string
  price: number
  description?: string
}

export interface CreateYookassaPaymentResponse {
  payment_id: string
  confirmation_url: string
  status?: string
}

export interface ConfirmYookassaPaymentResponse {
  success: boolean
  plan?: string
  subscription?: Subscription
  message?: string
}

export async function createYookassaPayment(
  payload: CreateYookassaPaymentPayload
): Promise<ApiResponse<CreateYookassaPaymentResponse>> {
  const token = getAuthToken()
  if (!token) {
    return { error: 'Требуется авторизация для оплаты' }
  }

  try {
    const response = await fetch('/api/yookassa/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      return { error: data?.error || data?.message || `HTTP ${response.status}` }
    }

    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Network error' }
  }
}

export async function confirmYookassaPayment(
  paymentId: string
): Promise<ApiResponse<ConfirmYookassaPaymentResponse>> {
  const token = getAuthToken()
  if (!token) {
    return { error: 'Требуется авторизация для оплаты' }
  }

  try {
    const response = await fetch('/api/yookassa/confirm-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentId }),
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      return { error: data?.error || data?.message || `HTTP ${response.status}` }
    }

    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Network error' }
  }
}
*/ 
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/lib/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth,
    "withAuth",
    ()=>withAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Load user on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const loadUser = {
                "AuthProvider.useEffect.loadUser": async ()=>{
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])()) {
                        // Try to load from localStorage first
                        const storedUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
                        if (storedUser) {
                            setUser(storedUser);
                        }
                        // Then refresh from API
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUserInfo"])();
                        if (response.data) {
                            setUser(response.data);
                        } else if (response.error) {
                            // Token expired or invalid
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])();
                            setUser(null);
                        }
                    }
                    setLoading(false);
                }
            }["AuthProvider.useEffect.loadUser"];
            loadUser();
        }
    }["AuthProvider.useEffect"], []);
    const login = async (username, password)=>{
        setLoading(true);
        try {
            // Тестовый пользователь для локальной разработки
            if (username === 'test' && password === 'test123') {
                const testUser = {
                    id: 999,
                    username: 'test',
                    email: 'test@spacevpn.com',
                    full_name: 'Тестовый Пользователь',
                    is_active: true,
                    is_superuser: false,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                // Сохраняем тестовый токен и пользователя
                localStorage.setItem('auth_token', 'test_token_12345');
                localStorage.setItem('current_user', JSON.stringify(testUser));
                setUser(testUser);
                setLoading(false);
                return {
                    success: true
                };
            }
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginUser"])(username, password);
            if (response.data) {
                // Get user info after login
                const userResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUserInfo"])();
                if (userResponse.data) {
                    setUser(userResponse.data);
                    setLoading(false);
                    return {
                        success: true
                    };
                }
            }
            setLoading(false);
            return {
                success: false,
                error: response.error || 'Login failed'
            };
        } catch (error) {
            setLoading(false);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Login failed'
            };
        }
    };
    const logout = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])();
        setUser(null);
        router.push('/login');
    };
    const register = async (username, email, password, fullName)=>{
        setLoading(true);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerUser"])(username, email, password, fullName);
            if (response.data) {
                // Auto-login after registration
                const loginResult = await login(username, password);
                return loginResult;
            }
            setLoading(false);
            return {
                success: false,
                error: response.error || 'Registration failed'
            };
        } catch (error) {
            setLoading(false);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Registration failed'
            };
        }
    };
    const refreshUser = async ()=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])()) {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUserInfo"])();
            if (response.data) {
                setUser(response.data);
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            loading,
            login,
            logout,
            register,
            refreshUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/lib/auth-context.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "J17Kp8z+0ojgAqGoY5o3BCjwWms=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function withAuth(Component) {
    var _s = __turbopack_context__.k.signature();
    return _s(function ProtectedRoute(props) {
        _s();
        const { user, loading } = useAuth();
        const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
            "withAuth.ProtectedRoute.useEffect": ()=>{
                if (!loading && !user) {
                    router.push('/login');
                }
            }
        }["withAuth.ProtectedRoute.useEffect"], [
            user,
            loading,
            router
        ]);
        if (loading) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-muted-foreground",
                    children: "Загрузка..."
                }, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/lib/auth-context.tsx",
                    lineNumber: 166,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/lib/auth-context.tsx",
                lineNumber: 165,
                columnNumber: 9
            }, this);
        }
        if (!user) {
            return null;
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
            ...props
        }, void 0, false, {
            fileName: "[project]/Documents/programming/pixel-space-vpn/lib/auth-context.tsx",
            lineNumber: 175,
            columnNumber: 12
        }, this);
    }, "Zr2WDa/YWeMetzDhcnOimt0LiKE=", false, function() {
        return [
            useAuth,
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
        ];
    });
}
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_programming_pixel-space-vpn_lib_f005c6d0._.js.map