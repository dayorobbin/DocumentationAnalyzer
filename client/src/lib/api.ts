import { apiRequest } from "./queryClient";
import type { Task, InsertTask, Category, InsertCategory } from "@shared/schema";

export const api = {
  tasks: {
    getAll: async (): Promise<Task[]> => {
      const response = await apiRequest("GET", "/api/tasks");
      return response.json();
    },
    
    get: async (id: number): Promise<Task> => {
      const response = await apiRequest("GET", `/api/tasks/${id}`);
      return response.json();
    },
    
    create: async (task: InsertTask): Promise<Task> => {
      const response = await apiRequest("POST", "/api/tasks", task);
      return response.json();
    },
    
    update: async (id: number, updates: Partial<InsertTask>): Promise<Task> => {
      const response = await apiRequest("PUT", `/api/tasks/${id}`, updates);
      return response.json();
    },
    
    delete: async (id: number): Promise<void> => {
      await apiRequest("DELETE", `/api/tasks/${id}`);
    },
  },
  
  categories: {
    getAll: async (): Promise<Category[]> => {
      const response = await apiRequest("GET", "/api/categories");
      return response.json();
    },
    
    create: async (category: InsertCategory): Promise<Category> => {
      const response = await apiRequest("POST", "/api/categories", category);
      return response.json();
    },
  },
};
