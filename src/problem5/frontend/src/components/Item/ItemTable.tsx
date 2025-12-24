import React from "react";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { Item as ItemType } from "../../types/item";
import { ItemService } from "../../services/item.service";

interface Props {
  items: ItemType[];
  total: number; 
  loading: boolean;
  page: number;
  pageSize: number;
  sortModel: GridSortModel;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSortModelChange: (model: GridSortModel) => void;
  onEdit: (item: ItemType) => void;
  onDeleted: () => void;
  onToggleActive: () => void;
}

export const ItemTable: React.FC<Props> = ({
  items,
  total,
  loading,
  page,
  pageSize,
  sortModel,
  onPageChange,
  onPageSizeChange,
  onSortModelChange,
  onEdit,
  onDeleted,
  onToggleActive,
}) => {
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await ItemService.delete(id);
      onDeleted();
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Failed to delete item");
    }
  };

  const handleToggleActive = async (item: ItemType) => {
    try {
      await ItemService.update(item.id, { is_active: !item.is_active });
      onToggleActive();
    } catch (error) {
      console.error("Failed to toggle active status:", error);
      alert("Failed to update item status");
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, sortable: true },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      sortable: true,
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (params.value ? "Active" : "Inactive"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      sortable: false,
      renderCell: (params) => {
        const item = params.row as ItemType;
        return (
          <>
            <button onClick={() => handleToggleActive(item)}>
              {item.is_active ? "Disable" : "Activate"}
            </button>
            <button onClick={() => onEdit(item)} style={{ marginLeft: 5 }}>
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              style={{ marginLeft: 5 }}
            >
              Delete
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={items}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={total}
        paginationModel={{ page, pageSize }} 
        onPaginationModelChange={(model) => {
          onPageChange(model.page);
          onPageSizeChange(model.pageSize);
        }}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        pageSizeOptions={[5, 10, 20]}
        loading={loading}
        disableRowSelectionOnClick
      />
    </div>
  );
};
