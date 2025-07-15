import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCategories } from "@/hooks/use-tasks";
import type { Task } from "@shared/schema";

interface TaskFiltersProps {
  tasks: Task[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export function TaskFilters({ 
  tasks, 
  activeFilter, 
  onFilterChange, 
  selectedCategories, 
  onCategoryChange 
}: TaskFiltersProps) {
  const { data: categories = [] } = useCategories();

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || "blue";
  };

  const getCategoryCount = (categoryName: string) => {
    return tasks.filter(task => task.category === categoryName).length;
  };

  const handleCategoryToggle = (categoryName: string, checked: boolean) => {
    if (checked) {
      onCategoryChange([...selectedCategories, categoryName]);
    } else {
      onCategoryChange(selectedCategories.filter(cat => cat !== categoryName));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Filters</h2>
      
      <div className="space-y-2 mb-6">
        <Button
          variant={activeFilter === "all" ? "default" : "ghost"}
          className="w-full justify-between text-left"
          onClick={() => onFilterChange("all")}
        >
          All Tasks
          <Badge variant="secondary" className="ml-2">
            {totalTasks}
          </Badge>
        </Button>
        
        <Button
          variant={activeFilter === "active" ? "default" : "ghost"}
          className="w-full justify-between text-left"
          onClick={() => onFilterChange("active")}
        >
          Active
          <Badge variant="secondary" className="ml-2">
            {activeTasks}
          </Badge>
        </Button>
        
        <Button
          variant={activeFilter === "completed" ? "default" : "ghost"}
          className="w-full justify-between text-left"
          onClick={() => onFilterChange("completed")}
        >
          Completed
          <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
            {completedTasks}
          </Badge>
        </Button>
      </div>
      
      <h3 className="text-sm font-medium text-slate-900 mb-3">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.name}
              checked={selectedCategories.includes(category.name)}
              onCheckedChange={(checked) => 
                handleCategoryToggle(category.name, checked as boolean)
              }
            />
            <label 
              htmlFor={category.name} 
              className="text-sm text-slate-700 cursor-pointer flex-1"
            >
              {category.name}
            </label>
            <span className="text-xs text-slate-500">
              ({getCategoryCount(category.name)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
