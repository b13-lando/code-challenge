import axios from "axios";
import { Item } from "../types/item";

const API_BASE = process.env.REACT_APP_API_BASE + "/items";

export const ItemService = {
  create: (data: Partial<Item>) =>
    axios.post<Item>(API_BASE, data).then(res => res.data),

  // Updated list method to support pagination and sorting
  list: (
    is_active?: boolean,
    page: number = 0,
    pageSize: number = 5,
    sortField?: string,
    sortOrder?: "asc" | "desc"
  ) => {
    const params: any = {
      page,
      pageSize,
    };
    if (is_active !== undefined) params.is_active = is_active;
    if (sortField) {
      params.sortField = sortField;
      params.sortOrder = sortOrder;
    }

    return axios
      .get<{ items: Item[]; total: number }>(API_BASE, { params })
      .then(res => res.data);
  },

  get: (id: string) =>
    axios.get<Item>(`${API_BASE}/${id}`).then(res => res.data),

  update: (id: string, data: Partial<Item>) =>
    axios.put<Item>(`${API_BASE}/${id}`, data).then(res => res.data),

  delete: (id: string) =>
    axios.delete(`${API_BASE}/${id}`).then(res => res.data),
};
