module.exports = [
"[project]/Documents/code/SpaceVPN/SpaceVpn/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
const API_URL = ("TURBOPACK compile-time value", "http://72.56.92.136:8000") || 'http://localhost:8000';
const API_V1 = ("TURBOPACK compile-time value", "/api/v1") || '/api/v1';
const API_BASE_URL = `${API_URL}${API_V1}`;
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
function getCurrentUser() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const userJson = undefined;
}
function setCurrentUser(user) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function removeCurrentUser() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
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
}),
];

//# sourceMappingURL=Documents_code_SpaceVPN_SpaceVpn_lib_api_ts_b84bc2c9._.js.map