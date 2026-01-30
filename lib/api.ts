/**
 * API Client for SpaceVPN Backend
 *
 * Единая точка входа: реэкспорт из lib/api/* и types/api.
 * Базовый URL и fetch — в client.ts.
 */

// Base URL (для Next.js routes и пр.)
export { API_BASE_URL, getAuthToken, setAuthToken, removeAuthToken, fetchAPI, withQuery } from './api/client'

// Types — из единого источника
export type {
  ApiResponse,
  ApiError,
  User,
  TokenResponse,
  OAuthProvider,
  OAuthProvidersResponse,
  GoogleAuthResponse,
  TelegramAuthInfo,
  TelegramAuthData,
  SendVerificationCodeRequest,
  VerifyCodeRequest,
  VerifyEmailRequest,
  ResetPasswordRequest,
  Subscription,
  MySubscriptionsResponse,
  AdminSubscription,
  PurchaseFreeTariffRequest,
  PurchaseFreeTariffResponse,
  ExtendPayload,
  Plan,
  ApplyPlanRequest,
  Tariff,
  PublicTariff,
  PublicTariffsResponse,
  VPNKeyStatus,
  VPNKeyListResponse,
  VPNClient,
  VPNConfig,
  ExtendKeyRequest,
  ExtendKeyResponse,
  CreateVPNClientPayload,
  RegenerateVPNClientPayload,
  UpdateVPNClientPayload,
  BypassPreset,
  BypassPresetsResponse,
  HappDeeplinkResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  Payment,
  KeySearchRequest,
  KeySearchResult,
  CreateKeyRequest,
  CreateKeyResult,
  RenewKeyRequest,
  RenewKeyResult,
  KeyByPaymentResponse,
  AdminVPNClient,
  AdminFinanceStats,
  AdminFinanceChartData,
  AdminFinanceSummary,
  AdminPayment,
  AdminPaymentDetail,
  PaymentListResponse,
  TransactionQueryParams,
  AdminCreateSubscriptionPayload,
  CreateTariffPayload,
  UpdateTariffPayload,
  UpdateProfilePayload,
  PaginationParams,
  PaymentQueryParams,
  VPNStatus,
  HealthResponse,
  ApiInfoResponse,
} from '@/types/api'

// Auth
export {
  registerUser,
  loginUser,
  logoutUser,
  isAuthenticated,
  getOAuthProviders,
  getGoogleAuthUrl,
  getTelegramAuthInfo,
  telegramAuthCallback,
  sendVerificationCode,
  verifyCode,
  verifyEmail,
  resetPassword,
} from './api/auth'

// Users
export {
  getCurrentUser,
  getStoredUser,
  setCurrentUser,
  removeCurrentUser,
  getCurrentUserInfo,
  updateCurrentUser,
  getUserVPNStatus,
} from './api/users'

// Subscriptions
export { getMySubscriptions, purchaseFreeTariff } from './api/subscriptions'

// Tariffs
export { getPublicTariffs, getPublicTariffById } from './api/tariffs'

// Plans
export { getPlans } from './api/plans'

// Public API (без авторизации)
export {
  getPublicTariffs as getPublicTariffsNoAuth,
  searchKey as searchKeyPublic,
  createKeyPublic,
  renewKey as renewKeyPublic,
  getKeyByPayment,
  pollKeyByPayment,
} from './api/public-api'

// Payments
export {
  createPayment,
  getPaymentStatus,
  initiatePayment,
  createYookassaPayment,
  confirmYookassaPayment,
} from './api/payments'
export type {
  CreateYookassaPaymentPayload,
  CreateYookassaPaymentResponse,
  ConfirmYookassaPaymentResponse,
} from './api/payments'

// VPN Keys & Clients
export {
  getUserVPNKeys,
  getVPNKeyStatus,
  extendVPNKey,
  getHappDeeplink,
  getUserVPNClients,
  getUserVPNClients as listUserVPNClients,
  getUserVPNClient,
  updateUserVPNClient,
  deleteUserVPNClient,
  getUserVPNClientConfig,
  regenerateUserVPNClient,
  syncUserVPNClient,
  getBypassPresets,
  createUserVPNClient,
} from './api/vpn-keys'

// Admin
export {
  adminListUsers,
  adminGetUser,
  adminDeleteUser,
  adminToggleUserActive,
  adminMakeSuperuser,
  adminApplyPlan,
  adminListSubscriptions,
  adminGetSubscription,
  adminCreateSubscription,
  adminDeleteSubscription,
  adminExtendSubscription,
  adminToggleSubscription,
  adminListVPNClients,
  adminGetVPNClient,
  adminCreateVPNClient,
  adminUpdateVPNClient,
  adminDeleteVPNClient,
  adminExtendVPNClient,
  adminToggleVPNClient,
  adminListTariffs,
  adminCreateTariff,
  adminUpdateTariff,
  adminDeleteTariff,
  adminToggleTariff,
  getAdminFinanceStats,
  getAdminFinanceChart,
  getAdminPayments,
  getAdminPaymentDetails,
  getAdminTransactions,
  getAdminFinanceSummary,
} from './api/admin'

// Internal (superuser)
export { syncMarzban } from './api/internal'
export type { MarzbanSyncResponse } from './api/internal'

// Health
export { getHealthStatus, getApiInfo } from './api/health'
