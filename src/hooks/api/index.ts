import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { deleteFetcher, getFetcher, postFetcher, putFetcher, postMultipartFetcher, putMultipartFetcher } from "../../fetcher";
import { ListProductsRequest } from "../../types";

export function buildQueryParams(params: Record<string, unknown>): string {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;
    if (value instanceof Date) {
      queryParams.append(key, value.toISOString());
    } else if (typeof value === "object" && value !== null) {
      queryParams.append(key, JSON.stringify(value));
    } else {
      queryParams.append(key, String(value));
    }
  }

  return queryParams.toString();
}


export const useProducts = (params: Partial<ListProductsRequest> = {}, isReady: boolean = true) => {
  return useSWR(isReady ? `products/list?${buildQueryParams(params)}` : null, getFetcher);
}

export const useProduct = (productId: number) => {
  return useSWR(`products/${productId}`, getFetcher);
}

export const useCategories = () => {
  return useSWR("categories/list", getFetcher);
}

export const useOrders = () => {
  return {
    getOrder: (orderId: string) => useSWR(`orders/${orderId}`, getFetcher),
    createOrder: () => useSWRMutation("orders", postFetcher)
  }
}

export const useLogin = () => {
  return useSWRMutation("auth/login", postFetcher);
}

export const useRegister = () => {
  return useSWRMutation("auth/register", postFetcher)
}

export const useUser = () => {
  return useSWR(`users/me`, getFetcher);
}

export const useLogout = () => {
  return useSWRMutation("auth/logout", deleteFetcher);
}

export const useAddress = () => {
  return {
    createAddress: () => useSWRMutation("addresses/", postFetcher),
    getAddresses: (isReady: boolean) => useSWR(isReady ? "addresses/list" : null, getFetcher)
  }
}

// Nuevos hooks para usuarios
export const useUsersList = (params: {
  role?: string | null,
  active?: string | null,
  search?: string | null,
} = {}) => {
  return useSWR(`users/list?${buildQueryParams(params)}`, getFetcher);
}

export const useUpdateUser = (userId: number) => {
  return useSWRMutation("users", (url, { arg }: { arg: Record<string, unknown> }) => {
    return putFetcher(url, {
      arg: {
        userId,
        fields: arg
      }
    });
  });
}

export const useDeleteUser = (userId: number) => {
  return useSWRMutation(`users/${userId}`, deleteFetcher);
}

export const useGetUser = (userId: number, isReady: boolean = true) => {
  return useSWR(isReady ? `users/${userId}` : null, getFetcher);
}

// Product management hooks
interface ProductsListParams {
  categoryId?: string | null;
  name?: string | null;
  search?: string | null;
  sku?: string | null;
  priceSort?: "asc" | "desc" | null;
}

export const useProductsList = (params: ProductsListParams = {}) => {
  // Filter out null values and convert to API format
  const apiParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== null && value !== undefined)
  );

  return useSWR(`products/list?${buildQueryParams(apiParams)}`, getFetcher);
}

export const useUpdateProduct = (productId: number) => {
  return useSWRMutation("products", (url, { arg }: { arg: Record<string, unknown> }) => {
    return putFetcher(url, {
      arg: {
        productId,
        fields: arg
      }
    });
  });
}

export const useDeleteProduct = (productId: number) => {
  return useSWRMutation(`products/${productId}`, deleteFetcher);
}

export const useCreateProduct = () => {
  return useSWRMutation("products", postFetcher);
}

// Hook for creating products with multipart form data (for future use)
export const useCreateProductMultipart = () => {
  return useSWRMutation("products/upload", postMultipartFetcher);
}

// Hook for updating products with multipart form data (for future use)
export const useUpdateProductMultipart = (productId: number) => {
  return useSWRMutation(`products/${productId}/upload`, putMultipartFetcher);
}

export const useGetProduct = (productId: number, isReady: boolean = true) => {
  return useSWR(isReady ? `products/${productId}` : null, getFetcher);
}

