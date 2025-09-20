import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FilterType } from "./TaskManager";

interface TaskFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TaskFilters = ({ currentFilter, onFilterChange, taskCounts }: TaskFiltersProps) => {
  const filters: Array<{
    key: FilterType;
    label: string;
    count: number;
  }> = [
    { key: "all", label: "All", count: taskCounts.all },
    { key: "active", label: "Active", count: taskCounts.active },
    { key: "completed", label: "Completed", count: taskCounts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ key, label, count }) => (
        <Button
          key={key}
          variant={currentFilter === key ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(key)}
          className={cn(
            "transition-all duration-300 hover:shadow-lg",
            currentFilter === key && "bg-gradient-to-r from-primary to-primary-glow shadow-glow"
          )}
        >
          {label}
          <Badge 
            variant={currentFilter === key ? "secondary" : "outline"}
            className="ml-2 text-xs"
          >
            {count}
          </Badge>
        </Button>
      ))}
    </div>
  );
};