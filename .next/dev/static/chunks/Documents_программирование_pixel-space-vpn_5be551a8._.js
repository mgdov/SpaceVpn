(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/программирование/pixel-space-vpn/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    "getApiInfo",
    ()=>getApiInfo,
    "getAuthToken",
    ()=>getAuthToken,
    "getCurrentUser",
    ()=>getCurrentUser,
    "getCurrentUserInfo",
    ()=>getCurrentUserInfo,
    "getHealthStatus",
    ()=>getHealthStatus,
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
    const response = await apiRequest('/auth/token', {
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
    return apiRequest(withQuery('/admin/users', params));
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
    return apiRequest('/subscriptions');
}
async function getSubscriptionById(id) {
    return apiRequest(`/subscriptions/${id}`);
}
async function createSubscription(payload) {
    return apiRequest('/subscriptions', {
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
    return apiRequest('/admin/subscriptions');
}
async function adminGetSubscription(id) {
    return apiRequest(`/admin/subscriptions/${id}`);
}
async function adminCreateSubscription(payload) {
    return apiRequest('/admin/subscriptions', {
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
    return apiRequest('/tariffs');
}
async function getPublicTariffById(id) {
    return apiRequest(`/tariffs/${id}`);
}
async function adminListTariffs() {
    return apiRequest('/admin/tariffs');
}
async function adminCreateTariff(payload) {
    return apiRequest('/admin/tariffs', {
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
async function listUserVPNClients() {
    return apiRequest('/vpn-clients');
}
async function getUserVPNClient(id) {
    return apiRequest(`/vpn-clients/${id}`);
}
async function createUserVPNClient(payload) {
    return apiRequest('/vpn-clients', {
        method: 'POST',
        body: payload ? JSON.stringify(payload) : undefined
    });
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
async function regenerateUserVPNClient(id) {
    return apiRequest(`/vpn-clients/${id}/regenerate`, {
        method: 'POST'
    });
}
async function syncUserVPNClient(id) {
    return apiRequest(`/vpn-clients/${id}/sync`, {
        method: 'POST'
    });
}
async function adminListVPNClients() {
    return apiRequest('/admin/vpn/clients');
}
async function adminGetVPNClient(id) {
    return apiRequest(`/admin/vpn/clients/${id}`);
}
async function adminCreateVPNClient(payload) {
    return apiRequest('/admin/vpn/clients', {
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
async function getHealthStatus() {
    return apiRequest('/health');
}
async function getApiInfo() {
    return apiRequest('/');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/программирование/pixel-space-vpn/lib/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth,
    "withAuth",
    ()=>withAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/программирование/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/программирование/pixel-space-vpn/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/программирование/pixel-space-vpn/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/программирование/pixel-space-vpn/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Load user on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const loadUser = {
                "AuthProvider.useEffect.loadUser": async ()=>{
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])()) {
                        // Try to load from localStorage first
                        const storedUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
                        if (storedUser) {
                            setUser(storedUser);
                        }
                        // Then refresh from API
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUserInfo"])();
                        if (response.data) {
                            setUser(response.data);
                        } else if (response.error) {
                            // Token expired or invalid
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])();
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
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginUser"])(username, password);
        if (response.data) {
            // Get user info after login
            const userResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUserInfo"])();
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
    };
    const logout = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])();
        setUser(null);
        router.push('/login');
    };
    const register = async (username, email, password, fullName)=>{
        setLoading(true);
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerUser"])(username, email, password, fullName);
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
    };
    const refreshUser = async ()=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])()) {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUserInfo"])();
            if (response.data) {
                setUser(response.data);
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
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
        fileName: "[project]/Documents/программирование/pixel-space-vpn/lib/auth-context.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "J17Kp8z+0ojgAqGoY5o3BCjwWms=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
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
        const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-muted-foreground",
                    children: "Загрузка..."
                }, void 0, false, {
                    fileName: "[project]/Documents/программирование/pixel-space-vpn/lib/auth-context.tsx",
                    lineNumber: 135,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/программирование/pixel-space-vpn/lib/auth-context.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this);
        }
        if (!user) {
            return null;
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
            ...props
        }, void 0, false, {
            fileName: "[project]/Documents/программирование/pixel-space-vpn/lib/auth-context.tsx",
            lineNumber: 144,
            columnNumber: 12
        }, this);
    }, "Zr2WDa/YWeMetzDhcnOimt0LiKE=", false, function() {
        return [
            useAuth,
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
        ];
    });
}
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/программирование/pixel-space-vpn/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Documents/программирование/pixel-space-vpn/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/Documents/программирование/pixel-space-vpn/node_modules/@vercel/analytics/dist/next/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Analytics",
    ()=>Analytics2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/программирование/pixel-space-vpn/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/nextjs/index.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/программирование/pixel-space-vpn/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// src/nextjs/utils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/программирование/pixel-space-vpn/node_modules/next/navigation.js [app-client] (ecmascript)");
"use client";
;
;
// package.json
var name = "@vercel/analytics";
var version = "1.3.1";
// src/queue.ts
var initQueue = ()=>{
    if (window.va) return;
    window.va = function a(...params) {
        (window.vaq = window.vaq || []).push(params);
    };
};
// src/utils.ts
function isBrowser() {
    return typeof window !== "undefined";
}
function detectEnvironment() {
    try {
        const env = ("TURBOPACK compile-time value", "development");
        if ("TURBOPACK compile-time truthy", 1) {
            return "development";
        }
    } catch (e) {}
    return "production";
}
function setMode(mode = "auto") {
    if (mode === "auto") {
        window.vam = detectEnvironment();
        return;
    }
    window.vam = mode;
}
function getMode() {
    const mode = isBrowser() ? window.vam : detectEnvironment();
    return mode || "production";
}
function isDevelopment() {
    return getMode() === "development";
}
function computeRoute(pathname, pathParams) {
    if (!pathname || !pathParams) {
        return pathname;
    }
    let result = pathname;
    try {
        const entries = Object.entries(pathParams);
        for (const [key, value] of entries){
            if (!Array.isArray(value)) {
                const matcher = turnValueToRegExp(value);
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[${key}]`);
                }
            }
        }
        for (const [key, value] of entries){
            if (Array.isArray(value)) {
                const matcher = turnValueToRegExp(value.join("/"));
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[...${key}]`);
                }
            }
        }
        return result;
    } catch (e) {
        return pathname;
    }
}
function turnValueToRegExp(value) {
    return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// src/generic.ts
var DEV_SCRIPT_URL = "https://va.vercel-scripts.com/v1/script.debug.js";
var PROD_SCRIPT_URL = "/_vercel/insights/script.js";
function inject(props = {
    debug: true
}) {
    var _a;
    if (!isBrowser()) return;
    setMode(props.mode);
    initQueue();
    if (props.beforeSend) {
        (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
    }
    const src = props.scriptSrc || (isDevelopment() ? DEV_SCRIPT_URL : PROD_SCRIPT_URL);
    if (document.head.querySelector(`script[src*="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
    script.dataset.sdkv = version;
    if (props.disableAutoTrack) {
        script.dataset.disableAutoTrack = "1";
    }
    if (props.endpoint) {
        script.dataset.endpoint = props.endpoint;
    }
    if (props.dsn) {
        script.dataset.dsn = props.dsn;
    }
    script.onerror = ()=>{
        const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
        console.log(`[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`);
    };
    if (isDevelopment() && props.debug === false) {
        script.dataset.debug = "false";
    }
    document.head.appendChild(script);
}
function pageview({ route, path }) {
    var _a;
    (_a = window.va) == null ? void 0 : _a.call(window, "pageview", {
        route,
        path
    });
}
// src/react.tsx
function Analytics(props) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            inject({
                framework: props.framework || "react",
                ...props.route !== void 0 && {
                    disableAutoTrack: true
                },
                ...props
            });
        }
    }["Analytics.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            if (props.route && props.path) {
                pageview({
                    route: props.route,
                    path: props.path
                });
            }
        }
    }["Analytics.useEffect"], [
        props.route,
        props.path
    ]);
    return null;
}
;
var useRoute = ()=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const finalParams = {
        ...Object.fromEntries(searchParams.entries()),
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- can be empty in pages router
        ...params || {}
    };
    return {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- can be empty in pages router
        route: params ? computeRoute(path, finalParams) : null,
        path
    };
};
// src/nextjs/index.tsx
function AnalyticsComponent(props) {
    const { route, path } = useRoute();
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(Analytics, {
        path,
        route,
        ...props,
        framework: "next"
    });
}
function Analytics2(props) {
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: null
    }, /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(AnalyticsComponent, {
        ...props
    }));
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Documents/программирование/pixel-space-vpn/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/программирование/pixel-space-vpn/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/Documents/программирование/pixel-space-vpn/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Documents/программирование/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f_43f$$_440$$_43e$$_433$$_440$$_430$$_43c$$_43c$$_438$$_440$$_43e$$_432$$_430$$_43d$$_438$$_435$$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/программирование/pixel-space-vpn/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Documents/программирование/pixel-space-vpn/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=Documents_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_pixel-space-vpn_5be551a8._.js.map