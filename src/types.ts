import { z } from "zod";


export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string().url(),
  description: z.string(),
  price: z.number().int(),
  sku: z.string(),
  stock: z.number().int(),
  categoryId: z.string(),
  discount: z.number().int().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  status: z.enum(["ACTIVE", "NOT_ACTIVE"]).default("ACTIVE"),
})

export type Product = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categorySchema>;

// Search and filter types
export interface ProductSearchParams {
  categoryId?: string | null;
  search?: string | null;
  stockStatus?: string | null;
}

export interface SelectOption {
  label: string;
  value: string;
}

export type StockStatus = "available" | "out_of_stock" | "";

// API parameter types based on the schema you provided
export const listProductsRequestSchema = z.object({
  name: z.string(),
  id: z.number(),
  categoryId: z.string(),
  createdAt: z.string().date(),
  sku: z.string(),
  priceSort: z.enum(["asc", "desc"])
}).partial();

export type ListProductsRequest = z.infer<typeof listProductsRequestSchema>;
