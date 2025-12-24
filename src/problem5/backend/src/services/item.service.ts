import { ItemRepository } from "../repositories/item.repository";
import { CreateItemDto, UpdateItemDto } from "../models/item.model";

export class ItemService {
  private repo = new ItemRepository();

  // Create a new item
  async create(data: CreateItemDto) {
    return this.repo.create(data);
  }

  // List items with optional filters
  async list(
    filters?: { is_active?: boolean },
    page: number = 0,
    pageSize: number = 5,
    sortField?: string,
    sortOrder?: "asc" | "desc"
  ) {
    return this.repo.findAll(filters, page, pageSize, sortField, sortOrder);
  }

  // Get a single item by ID
  async get(id: string) {
    return this.repo.findById(id);
  }

  // Update an item by ID
  async update(id: string, data: UpdateItemDto) {
    return this.repo.update(id, data);
  }

  // Delete an item by ID
  async delete(id: string) {
    return this.repo.delete(id);
  }
}
