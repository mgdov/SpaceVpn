(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/programming/pixel-space-vpn/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Use environment variable for API URL, fallback to relative path
const API_URL = ("TURBOPACK compile-time value", "http://72.56.92.136:8000") || 'http://localhost:8000';
const API_PATH = ("TURBOPACK compile-time value", "/api/v1") || '/api/v1';
const API_BASE_URL = `${API_URL}${API_PATH}`;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/lib/api/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api/client.ts [app-client] (ecmascript)");
;
async function registerUser(username, email, password, fullName) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/register', {
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    });
    if (response.data?.access_token) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthToken"])(response.data.access_token);
    }
    return response;
}
function logoutUser() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeAuthToken"])();
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.removeItem('current_user');
    }
}
function isAuthenticated() {
    return ("TURBOPACK compile-time value", "object") !== 'undefined' && localStorage.getItem('auth_token') !== null;
}
async function getOAuthProviders() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/oauth-providers');
}
async function getGoogleAuthUrl() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/google');
}
async function getTelegramAuthInfo() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/telegram');
}
async function telegramAuthCallback(data) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAPI"])('/auth/telegram/callback', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    if (response.data?.access_token) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthToken"])(response.data.access_token);
    }
    return response;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/lib/api/users.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api/client.ts [app-client] (ecmascript)");
;
async function getCurrentUser() {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAPI"])('/users/me');
    if (response.data && ("TURBOPACK compile-time value", "object") !== 'undefined') {
        localStorage.setItem('current_user', JSON.stringify(response.data));
    }
    return response;
}
function getStoredUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const userJson = localStorage.getItem('current_user');
    return userJson ? JSON.parse(userJson) : null;
}
async function updateCurrentUser(payload) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAPI"])('/users/me', {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
    if (response.data && ("TURBOPACK compile-time value", "object") !== 'undefined') {
        localStorage.setItem('current_user', JSON.stringify(response.data));
    }
    return response;
}
async function getUserVPNStatus() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAPI"])('/users/me/vpn');
}
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api/users.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
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
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])()) {
                        // Try to load from localStorage first
                        const storedUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredUser"])();
                        if (storedUser) {
                            setUser(storedUser);
                        }
                        // Then refresh from API
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
                        if (response.data) {
                            setUser(response.data);
                        } else if (response.error) {
                            // Token expired or invalid
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])();
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
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginUser"])(username, password);
            if (response.data) {
                // Get user info after login
                const userResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])();
        setUser(null);
        router.push('/login');
    };
    const register = async (username, email, password, fullName)=>{
        setLoading(true);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerUser"])(username, email, password, fullName);
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
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])()) {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
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
        lineNumber: 117,
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
                    lineNumber: 146,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/lib/auth-context.tsx",
                lineNumber: 145,
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
            lineNumber: 155,
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

//# sourceMappingURL=Documents_programming_pixel-space-vpn_lib_05b63fc6._.js.map