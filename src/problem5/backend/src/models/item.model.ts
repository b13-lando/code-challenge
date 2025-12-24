import { Item } from "../types/item.types";

export type CreateItemDto = Pick<Item, "name" | "description">;
export type UpdateItemDto = Partial<CreateItemDto & { is_active: boolean }>;
