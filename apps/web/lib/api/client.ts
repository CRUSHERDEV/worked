/**
 * API Client
 * Centralized API client for communicating with the API Gateway
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    // Add auth token if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("supabase.auth.token");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`,
        }));
        throw new Error(error.message || "Request failed");
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Marketplace API
export const marketplaceApi = {
  getProducts: async () => {
    return apiClient.get<any[]>("/marketplace/products");
  },
  getProduct: async (id: string) => {
    return apiClient.get<any>(`/marketplace/products/${id}`);
  },
  searchProducts: async (query: string) => {
    return apiClient.get<any[]>(`/marketplace/products/search?q=${encodeURIComponent(query)}`);
  },
};

// Orders API
export const ordersApi = {
  getOrders: async () => {
    return apiClient.get<any[]>("/orders");
  },
  getOrder: async (id: string) => {
    return apiClient.get<any>(`/orders/${id}`);
  },
  createOrder: async (orderData: any) => {
    return apiClient.post<any>("/orders", orderData);
  },
};

// Wallet API
export const walletApi = {
  getWallet: async () => {
    return apiClient.get<any>("/wallet");
  },
  getTransactions: async () => {
    return apiClient.get<any[]>("/wallet/transactions");
  },
};

