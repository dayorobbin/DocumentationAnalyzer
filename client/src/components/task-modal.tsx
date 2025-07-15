import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTaskSchema } from "@shared/schema";
import { useCreateTask, useUpdateTask, useCategories } from "@/hooks/use-tasks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Task, InsertTask } from "@shared/schema";
import { z } from "zod";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
}

const formSchema = insertTaskSchema.extend({
  dueDate: z.string().optional(),
});

export function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const { data: categories = [] } = useCategories();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      priority: "medium",
      dueDate: "",
      completed: false,
    },
  });

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description || "",
        category: task.category || "",
        priority: task.priority,
        dueDate: task.dueDate || "",
        completed: task.completed,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        category: "",
        priority: "medium",
        dueDate: "",
        completed: false,
      });
    }
  }, [task, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const taskData: InsertTask = {
      ...data,
      dueDate: data.dueDate || undefined,
    };

    if (task) {
      updateTask.mutate(
        { id: task.id, updates: taskData },
        {
          onSuccess: () => {
            onClose();
            form.reset();
          },
        }
      );
    } else {
      createTask.mutate(taskData, {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      });
    }
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter task description" 
                      rows={3} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createTask.isPending || updateTask.isPending}
              >
                {task ? "Update Task" : "Add Task"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
