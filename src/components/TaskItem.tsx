import { useState } from "react";
import { Check, Edit2, Trash2, X, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Task } from "./TaskManager";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onPriorityChange: (id: string, priority: Task["priority"]) => void;
}

const priorityColors = {
  low: "priority-low",
  medium: "priority-medium", 
  high: "priority-high",
};

export const TaskItem = ({ task, onToggle, onDelete, onEdit, onPriorityChange }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    } else {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={cn(
      "task-card group animate-bounce-in",
      task.completed && "completed"
    )}>
      <div className="flex items-center gap-4">
        {/* Completion Toggle */}
        <button
          onClick={() => onToggle(task.id)}
          className="flex-shrink-0 transition-all duration-300 hover:scale-110"
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-success" />
          ) : (
            <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleEdit}
                className="flex-1"
                autoFocus
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={handleEdit}
                className="h-8 w-8 p-0"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditText(task.text);
                  setIsEditing(false);
                }}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "font-medium transition-all duration-300",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.text}
                </span>
                <Badge 
                  className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    priorityColors[task.priority]
                  )}
                >
                  {task.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Created {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {!task.completed && !isEditing && (
            <>
              {/* Priority Selector */}
              <select
                value={task.priority}
                onChange={(e) => onPriorityChange(task.id, e.target.value as Task["priority"])}
                className="text-xs bg-secondary border border-border rounded px-2 py-1"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0 hover:bg-accent"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </>
          )}
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(task.id)}
            className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground transition-colors duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};