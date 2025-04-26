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


