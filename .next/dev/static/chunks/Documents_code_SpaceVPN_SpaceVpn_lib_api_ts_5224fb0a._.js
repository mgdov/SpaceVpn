(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/code/SpaceVPN/SpaceVpn/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Client for SpaceVPN Backend
 */ __turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "createSubscription",
    ()=>createSubscription,
    "createVPNClient",
    ()=>createVPNClient,
    "getAuthToken",
    ()=>getAuthToken,
    "getCurrentUser",
    ()=>getCurrentUser,
    "getCurrentUserInfo",
    ()=>getCurrentUserInfo,
    "getUserSubscriptions",
    ()=>getUserSubscriptions,
    "getVPNConfig",
    ()=>getVPNConfig,
    "isAuthenticated",
    ()=>isAuthenticated,
    "loginUser",
    ()=>loginUser,
    "logoutUser",
    ()=>logoutUser,
    "registerUser",
    ()=>registerUser,
    "removeAuthToken",
    ()=>removeAuthToken,
    "removeCurrentUser",
    ()=>removeCurrentUser,
    "setAuthToken",
    ()=>setAuthToken,
    "setCurrentUser",
    ()=>setCurrentUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$code$2f$SpaceVPN$2f$SpaceVpn$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/code/SpaceVPN/SpaceVpn/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_URL = ("TURBOPACK compile-time value", "http://72.56.92.136:8000") || 'http://localhost:8000';
const API_V1 = ("TURBOPACK compile-time value", "/api/v1") || '/api/v1';
const API_BASE_URL = `${API_URL}${API_V1}`;
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
/**
 * Make authenticated API request
 */ async function apiRequest(endpoint, options = {}) {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            return {
                error: errorData.detail || errorData.message || `HTTP ${response.status}`
            };
        }
        const data = await response.json();
        return {
            data
        };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Network error'
        };
    }
}
async function registerUser(username, email, password) {
    return apiRequest('/register', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        })
    });
}
async function loginUser(username, password) {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    const response = await apiRequest('/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    });
    // If successful, save token
    if (response.data?.access_token) {
        setAuthToken(response.data.access_token);
    }
    return response;
}
async function getCurrentUserInfo() {
    const response = await apiRequest('/users/me');
    // Save user info
    if (response.data) {
        setCurrentUser(response.data);
    }
    return response;
}
function logoutUser() {
    removeAuthToken();
    removeCurrentUser();
}
async function createVPNClient() {
    return apiRequest('/vpn-clients/', {
        method: 'POST'
    });
}
async function getVPNConfig() {
    return apiRequest('/vpn-clients/me/config');
}
async function getUserSubscriptions() {
    return apiRequest('/subscriptions/');
}
async function createSubscription(userId, endDate, dataLimitGB = 0) {
    return apiRequest('/subscriptions/', {
        method: 'POST',
        body: JSON.stringify({
            user_id: userId,
            end_date: endDate,
            data_limit_gb: dataLimitGB
        })
    });
}
function isAuthenticated() {
    return getAuthToken() !== null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_code_SpaceVPN_SpaceVpn_lib_api_ts_5224fb0a._.js.map