import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getFetcher, postFetcher } from "../../fetcher";

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


export const useProducts = (params: { categoryId?: string | null } = {}, isReady: boolean = true) => {
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
