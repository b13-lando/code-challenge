import React, { useEffect, useState } from "react";
import { Item as ItemType } from "../../types/item";
import { ItemService } from "../../services/item.service";

interface Props {
  editingItem: ItemType | null;
  onSaved: () => void;
}

export const ItemForm: React.FC<Props> = ({ editingItem, onSaved }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDescription(editingItem.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [editingItem]);

  const handleSave = async () => {
    if (!name.trim()) return alert("Name is required");
    try {
      if (editingItem) {
        await ItemService.update(editingItem.id, { name, description });
      } else {
        await ItemService.create({ name, description });
      }
      onSaved();
    } catch (error) {
      console.error("Failed to save item:", error);
      alert("Failed to save item");
    }
  };

  return (
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
      <button onClick={handleSave}>{editingItem ? "Update" : "Create"}</button>
      {editingItem && (
        <button
          onClick={() => {
            setName("");
            setDescription("");
          }}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      )}
    </div>
  );
};
