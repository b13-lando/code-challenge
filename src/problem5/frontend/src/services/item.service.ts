import axios from "axios";
import { Item } from "../types/item";

const API_BASE = process.env.REACT_APP_API_BASE + "/items";

export const ItemService = {
  create: (data: Partial<Item>) =>
    axios.post<Item>(API_BASE, data).then(res => res.data),

  list: (is_active?: boolean) =>
    axios
      .get<Item[]>(API_BASE, { params: is_active !== undefined ? { is_active } : {} })
      .then(res => res.data),
 
  get: (id: string) =>
    axios.get<Item>(`${API_BASE}/${id}`).then(res => res.data),

  update: (id: string, data: Partial<Item>) =>
    axios.put<Item>(`${API_BASE}/${id}`, data).then(res => res.data),

  delete: (id: string) => 
    axios.delete(`${API_BASE}/${id}`).then(res => res.data),
};
