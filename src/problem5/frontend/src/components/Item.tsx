import React, { useEffect, useState } from "react";
import { Item as ItemType } from "../types/item";
import { ItemService } from "../services/item.service";

export const Item: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showActive, setShowActive] = useState<boolean | undefined>(undefined);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const data = await ItemService.list(showActive);
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      alert("Failed to fetch items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [showActive]);

  // Create or update item
  const handleCreateOrUpdate = async () => {
    if (!name.trim()) return alert("Name is required");

    try {
      if (editingId) {
        await ItemService.update(editingId, { name, description });
        setEditingId(null);
      } else {
        await ItemService.create({ name, description });
      }
      setName("");
      setDescription("");
      fetchItems();
    } catch (error) {
      console.error("Failed to save item:", error);
      alert("Failed to save item");
    }
  };

  // Edit existing item
  const handleEdit = (item: ItemType) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description || "");
  };

  // Delete item
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await ItemService.delete(id);
      fetchItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Failed to delete item");
    }
  };

  // Toggle is_active status
  const handleToggleActive = async (item: ItemType) => {
    try {
      await ItemService.update(item.id, { is_active: !item.is_active });
      fetchItems();
    } catch (error) {
      console.error("Failed to toggle active status:", error);
      alert("Failed to update item status");
    }
  };

  // Filter items
  const handleFilterChange = (value: boolean | undefined) => {
    setShowActive(value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Item CRUD</h2>

      {/* Create / Update Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleCreateOrUpdate}>
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setName("");
              setDescription("");
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Filter */}
      <div style={{ marginBottom: "10px" }}>
        <strong>Filter: </strong>
        <button onClick={() => handleFilterChange(undefined)}>All</button>
        <button onClick={() => handleFilterChange(true)} style={{ marginLeft: "5px" }}>
          Active
        </button>
        <button onClick={() => handleFilterChange(false)} style={{ marginLeft: "5px" }}>
          Inactive
        </button>
      </div>

      {/* Items List */}
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "5px" }}>
            <strong>{item.name}</strong> - {item.description || "-"} -{" "}
            {item.is_active ? "Active" : "Inactive"}
            <button
              onClick={() => handleToggleActive(item)}
              style={{ marginLeft: "10px" }}
            >
              {item.is_active ? "Disable" : "Activate"}
            </button>
            <button onClick={() => handleEdit(item)} style={{ marginLeft: "5px" }}>
              Edit
            </button>
            <button onClick={() => handleDelete(item.id)} style={{ marginLeft: "5px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
