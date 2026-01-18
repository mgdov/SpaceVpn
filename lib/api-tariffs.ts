import { API_BASE_URL } from './api'

export interface Tariff {
  id: number
  name: string
  description: string | null
  tagline: string | null
  price: number
  duration_months: number
  data_limit_gb: number
  devices_count: number
  is_active: boolean
  is_featured: boolean
  features: string | null
}

export interface ApiResponse<T = any> {
  data?: T
  error?: string
}

/**
 * Get all active tariffs (PUBLIC endpoint)
 */
export async function getTariffs(): Promise<ApiResponse<Tariff[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/tariffs/`)

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

/**
 * Get single tariff by ID
 */
export async function getTariff(tariffId: number): Promise<ApiResponse<Tariff>> {
  try {
    const response = await fetch(`${API_BASE_URL}/tariffs/${tariffId}`)

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

