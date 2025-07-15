import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { Task, InsertTask, Category } from "@shared/schema";

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: ["/api/tasks"],
    queryFn: api.tasks.getAll,
  });
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["/api/categories"],
    queryFn: api.categories.getAll,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: api.tasks.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<InsertTask> }) =>
      api.tasks.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: api.tasks.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    },
  });
}
