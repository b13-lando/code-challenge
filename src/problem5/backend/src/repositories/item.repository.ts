import { pool } from "../db";
import { CreateItemDto, UpdateItemDto } from "../models/item.model";
import { v4 as uuidv4 } from "uuid";

export class ItemRepository {
  // Create a new item
  async create(data: CreateItemDto) {
    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO items (id, name, description, is_active)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id, data.name, data.description ?? null, true] // default active
    );
    return result.rows[0];
  }

  // List items with optional filters
  async findAll(filters?: { is_active?: boolean }) {
    const conditions: string[] = [];
    const values: any[] = [];

    if (filters?.is_active !== undefined) {
      values.push(filters.is_active);
      conditions.push(`is_active = $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const result = await pool.query(
      `SELECT * FROM items ${whereClause}`,
      values
    );

    return result.rows;
  }

  // Get a single item by ID
  async findById(id: string) {
    const result = await pool.query(
      `SELECT * FROM items WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }

  // Update an item
  async update(id: string, data: UpdateItemDto) {
    const fields: string[] = [];
    const values: any[] = [];

    // Map DTO to database columns
    if (data.name !== undefined) {
      values.push(data.name);
      fields.push(`name = $${values.length}`);
    }
    if (data.description !== undefined) {
      values.push(data.description);
      fields.push(`description = $${values.length}`);
    }
    if (data.is_active !== undefined) {
      values.push(data.is_active);
      fields.push(`is_active = $${values.length}`);
    }

    console.log("Updating item with fields:", fields, "and values:", values);
    if (fields.length === 0) {
      // Nothing to update
      return await this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE items
       SET ${fields.join(", ")}, updated_at = NOW()
       WHERE id = $${values.length}
       RETURNING *`,
      values
    );

    return result.rows[0];
  }

  // Delete an item
  async delete(id: string) {
    await pool.query(`DELETE FROM items WHERE id = $1`, [id]);
  }
}
