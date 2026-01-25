/**
 * @deprecated Используйте lib/api/public-api.ts вместо этого файла
 */
import { getPublicTariffs } from './api/public-api'
import type { ApiResponse, PublicTariff } from '@/types/api'

export interface Tariff extends PublicTariff { }

/**
 * @deprecated Используйте getPublicTariffs из lib/api/public-api.ts
 */
export async function getTariffs(): Promise<ApiResponse<Tariff[]>> {
  const response = await getPublicTariffs()
  return {
    data: response.data?.tariffs,
    error: response.error,
  }
}

/**
 * @deprecated Используйте getPublicTariffs из lib/api/public-api.ts
 */
export async function getTariff(tariffId: number): Promise<ApiResponse<Tariff>> {
  const response = await getPublicTariffs()
  if (response.data?.tariffs) {
    const tariff = response.data.tariffs.find(t => t.id === tariffId)
    if (tariff) {
      return { data: tariff }
    }
  }
  return { error: response.error || 'Тариф не найден' }
}

if (!response.ok) {
  const errorData = await response.json().catch(() => ({}))
  return {
    error: errorData.detail || errorData.message || `HTTP ${response.status}`,
  }
}

const data = await response.json()
return { data }
  } catch (error) {
  return {
    error: error instanceof Error ? error.message : 'Network error',
  }
}
}
