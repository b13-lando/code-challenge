import React, { useEffect, useState } from "react";
import { Item as ItemType } from "../../types/item";
import { ItemService } from "../../services/item.service";
import { ItemForm } from "./ItemForm";
import { ItemFilter } from "./ItemFilter";
import { ItemTable } from "./ItemTable";
import { GridSortModel } from "@mui/x-data-grid";

export const Item: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemType | null>(null);
  const [showActive, setShowActive] = useState<boolean | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const sortField = sortModel[0]?.field;
      const sortOrder = sortModel[0]?.sort ?? undefined; // convert null to undefined
      const response = await ItemService.list(
        showActive,
        page,
        pageSize,
        sortField,
        sortOrder as "asc" | "desc" | undefined
      );
      setItems(response.items);
      setTotal(response.total);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      alert("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [showActive, page, pageSize, sortModel]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Item CRUD</h2>
      <ItemForm
        editingItem={editingItem}
        onSaved={() => {
          setEditingItem(null);
          fetchItems();
        }}
      />
      <ItemFilter showActive={showActive} onChange={setShowActive} />
      <ItemTable
        items={items}
        total={total}
        loading={loading}
        page={page}
        pageSize={pageSize}
        sortModel={sortModel}
        onPageChange={(p) => setPage(p)}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(0); // reset page when page size changes
        }}
        onSortModelChange={(model) => setSortModel(model)}
        onEdit={setEditingItem}
        onDeleted={fetchItems}
        onToggleActive={fetchItems}
      />
    </div>
  );
};
