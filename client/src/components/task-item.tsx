import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Edit2, Trash2, CheckCircle } from "lucide-react";
import { useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import { format } from "date-fns";
import type { Task } from "@shared/schema";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onEdit }: TaskItemProps) {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleToggleComplete = () => {
    updateTask.mutate({
      id: task.id,
      updates: { completed: !task.completed },
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask.mutate(task.id);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work":
        return "bg-blue-100 text-blue-800";
      case "Personal":
        return "bg-green-100 text-green-800";
      case "Shopping":
        return "bg-yellow-100 text-yellow-800";
      case "Health":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggleComplete}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-medium truncate ${
              task.completed ? 'text-slate-500 line-through' : 'text-slate-900'
            }`}>
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="text-slate-400 hover:text-slate-600"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-slate-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p className={`text-sm mt-1 ${
              task.completed ? 'text-slate-400 line-through' : 'text-slate-500'
            }`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center space-x-4 mt-3">
            {task.category && (
              <Badge className={getCategoryColor(task.category)}>
                {task.category}
              </Badge>
            )}
            
            {task.dueDate && (
              <span className={`text-xs flex items-center ${
                task.completed ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <Calendar className="w-3 h-3 mr-1" />
                Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </span>
            )}
            
            {task.completed && (
              <span className="text-xs text-slate-400 flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
