import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { TaskFilters } from "@/components/task-filters";
import { TaskItem } from "@/components/task-item";
import { TaskModal } from "@/components/task-modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import type { Task } from "@shared/schema";

export default function Home() {
  const { data: tasks = [], isLoading } = useTasks();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by status
    if (activeFilter === "active") {
      filtered = filtered.filter(task => !task.completed);
    } else if (activeFilter === "completed") {
      filtered = filtered.filter(task => task.completed);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(task => 
        task.category && selectedCategories.includes(task.category)
      );
    }

    return filtered;
  }, [tasks, activeFilter, searchQuery, selectedCategories]);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddTask={handleAddTask}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <TaskFilters
              tasks={tasks}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Tasks</h2>
              <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500">No tasks found</p>
                <Button
                  onClick={handleAddTask}
                  variant="outline"
                  className="mt-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add your first task
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={editingTask}
      />
    </div>
  );
}
