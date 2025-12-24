import { Request, Response } from "express";
import { ItemService } from "../services/item.service";

const service = new ItemService();

export class ItemController {
  // Create an item
  static async create(req: Request, res: Response) {
    try {
      const item = await service.create(req.body);
      res.status(201).json(item);
    } catch (error: any) {
      console.error("Error creating item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // List items with optional filter ?is_active=true/false
  static async list(req: Request, res: Response) {
    try {
      const is_active =
        req.query.is_active !== undefined
          ? req.query.is_active === "true"
          : undefined;

      const items = await service.list({ is_active });
      res.json(items);
    } catch (error: any) {
      console.error("Error listing items:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get single item by ID
  static async get(req: Request, res: Response) {
    try {
      const item = await service.get(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (error: any) {
      console.error("Error fetching item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update an item
  static async update(req: Request, res: Response) {
    try {
      const item = await service.update(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (error: any) {
      console.error("Error updating item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete an item
  static async delete(req: Request, res: Response) {
    try {
      await service.delete(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      console.error("Error deleting item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
