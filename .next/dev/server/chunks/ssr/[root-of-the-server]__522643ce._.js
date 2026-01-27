module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/programming/pixel-space-vpn/lib/api/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Базовый API клиент с авторизацией
 */ __turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "fetchAPI",
    ()=>fetchAPI,
    "getAuthToken",
    ()=>getAuthToken,
    "removeAuthToken",
    ()=>removeAuthToken,
    "setAuthToken",
    ()=>setAuthToken,
    "withQuery",
    ()=>withQuery
]);
// Use environment variable for API URL, fallback to relative path
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_PATH = ("TURBOPACK compile-time value", "/api/v1") || '/api/v1';
const API_BASE_URL = `${API_URL}${API_PATH}`;
function getAuthToken() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function setAuthToken(token) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function removeAuthToken() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
/**
 * Безопасный парсинг JSON
 */ function safeParseJson(payload) {
    try {
        return JSON.parse(payload);
    } catch  {
        return payload;
    }
}
async function fetchAPI(endpoint, options = {}) {
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
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url, {
            ...options,
            headers
        });
        const status = response.status;
        const raw = await response.text();
        const payload = raw ? safeParseJson(raw) : undefined;
        if (!response.ok) {
            // Handle validation errors (422)
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
}),
"[project]/Documents/programming/pixel-space-vpn/lib/api/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Auth API endpoints
 */ __turbopack_context__.s([
    "getGoogleAuthUrl",
    ()=>getGoogleAuthUrl,
    "getOAuthProviders",
    ()=>getOAuthProviders,
    "getTelegramAuthInfo",
    ()=>getTelegramAuthInfo,
    "isAuthenticated",
    ()=>isAuthenticated,
    "loginUser",
    ()=>loginUser,
    "logoutUser",
    ()=>logoutUser,
    "registerUser",
    ()=>registerUser,
    "telegramAuthCallback",
    ()=>telegramAuthCallback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api/client.ts [app-ssr] (ecmascript)");
;
async function registerUser(username, email, password, fullName) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/register', {
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    });
    if (response.data?.access_token) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthToken"])(response.data.access_token);
    }
    return response;
}
function logoutUser() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeAuthToken"])();
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
function isAuthenticated() {
    return ("TURBOPACK compile-time value", "undefined") !== 'undefined' && localStorage.getItem('auth_token') !== null;
}
async function getOAuthProviders() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/oauth-providers');
}
async function getGoogleAuthUrl() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/google');
}
async function getTelegramAuthInfo() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/telegram');
}
async function telegramAuthCallback(data) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/telegram/callback', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    if (response.data?.access_token) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthToken"])(response.data.access_token);
    }
    return response;
}
}),
"[project]/Documents/programming/pixel-space-vpn/lib/api/users.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * User API endpoints
 */ __turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "getStoredUser",
    ()=>getStoredUser,
    "getUserVPNStatus",
    ()=>getUserVPNStatus,
    "updateCurrentUser",
    ()=>updateCurrentUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api/client.ts [app-ssr] (ecmascript)");
;
async function getCurrentUser() {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAPI"])('/users/me');
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return response;
}
function getStoredUser() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const userJson = undefined;
}
async function updateCurrentUser(payload) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAPI"])('/users/me', {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return response;
}
async function getUserVPNStatus() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAPI"])('/users/me/vpn');
}
}),
"[project]/Documents/programming/pixel-space-vpn/lib/auth-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth,
    "withAuth",
    ()=>withAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api/users.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Load user on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadUser = async ()=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAuthenticated"])()) {
                // Try to load from localStorage first
                const storedUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStoredUser"])();
                if (storedUser) {
                    setUser(storedUser);
                }
                // Then refresh from API
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])();
                if (response.data) {
                    setUser(response.data);
                } else if (response.status === 401 || response.status === 403) {
                    // Token expired or invalid — очищаем
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logoutUser"])();
                    setUser(null);
                } else {
                    // Бэкенд недоступен/ошибка — оставляем локальное состояние
                    if (!storedUser) {
                        setUser(null);
                    }
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);
    const login = async (username, password)=>{
        setLoading(true);
        // Offline fallback for demo credentials
        if (username === 'test' && password === 'test123') {
            const now = new Date().toISOString();
            const demoUser = {
                id: 0,
                username: 'test',
                email: 'test@example.com',
                full_name: 'Test User',
                is_active: true,
                is_superuser: false,
                created_at: now,
                updated_at: now
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthToken"])('test_token_12345');
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            setUser(demoUser);
            setLoading(false);
            return {
                success: true
            };
        }
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginUser"])(username, password);
            if (response.data) {
                // Get user info after login
                const userResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])();
                if (userResponse.data) {
                    setUser(userResponse.data);
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logoutUser"])();
        setUser(null);
        router.push('/login');
    };
    const register = async (username, email, password, fullName)=>{
        setLoading(true);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerUser"])(username, email, password, fullName);
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
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAuthenticated"])()) {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])();
            if (response.data) {
                setUser(response.data);
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
            } else if (response.status === 401 || response.status === 403) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logoutUser"])();
                setUser(null);
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
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
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
function withAuth(Component) {
    return function ProtectedRoute(props) {
        const { user, loading } = useAuth();
        const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            if (!loading && !user) {
                router.push('/login');
            }
        }, [
            user,
            loading,
            router
        ]);
        if (loading) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-muted-foreground",
                    children: "Загрузка..."
                }, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/lib/auth-context.tsx",
                    lineNumber: 185,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/lib/auth-context.tsx",
                lineNumber: 184,
                columnNumber: 9
            }, this);
        }
        if (!user) {
            return null;
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
            ...props
        }, void 0, false, {
            fileName: "[project]/Documents/programming/pixel-space-vpn/lib/auth-context.tsx",
            lineNumber: 194,
            columnNumber: 12
        }, this);
    };
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__522643ce._.js.map