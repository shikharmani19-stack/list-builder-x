import { useState, useEffect } from "react";
import { Plus, Search, Moon, Sun, Filter, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TaskItem } from "./TaskItem";
import { TaskFilters } from "./TaskFilters";
import { DragDropTaskList } from "./DragDropTaskList";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

export type FilterType = "all" | "active" | "completed";

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [newTaskPriority, setNewTaskPriority] = useState<Task["priority"]>("medium");
  const { toast } = useToast();

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskManager_tasks");
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        setTasks(parsed.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        })));
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    }

    const savedDarkMode = localStorage.getItem("taskManager_darkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("taskManager_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("taskManager_darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Filter tasks based on current filter and search
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === "all" ? true :
      filter === "active" ? !task.completed :
      filter === "completed" ? task.completed : true;
    
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const addTask = () => {
    if (!newTask.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task description",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: crypto.randomUUID(),
      text: newTask.trim(),
      completed: false,
      priority: newTaskPriority,
      createdAt: new Date(),
    };

    setTasks(prev => [task, ...prev]);
    setNewTask("");
    
    toast({
      title: "Task Added",
      description: "Your task has been added successfully",
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "Task Deleted",
      description: "Task has been removed",
    });
  };

  const editTask = (id: string, newText: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const updateTaskPriority = (id: string, priority: Task["priority"]) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, priority } : task
    ));
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    setTasks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const clearCompleted = () => {
    const completedCount = tasks.filter(task => task.completed).length;
    if (completedCount === 0) {
      toast({
        title: "No Tasks",
        description: "No completed tasks to clear",
        variant: "destructive",
      });
      return;
    }

    setTasks(prev => prev.filter(task => !task.completed));
    toast({
      title: "Tasks Cleared",
      description: `Removed ${completedCount} completed tasks`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
            Task Manager
          </h1>
          <p className="text-muted-foreground text-lg">
            Organize your tasks with style and efficiency
          </p>
        </div>

        {/* Controls */}
        <div className="glass-card rounded-xl p-6 mb-8 backdrop-blur-lg">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </div>
            <div className="flex items-center gap-3">
              <Sun className="w-4 h-4" />
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className="w-4 h-4" />
            </div>
          </div>

          {/* Add Task Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            <div className="md:col-span-7">
              <Input
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 text-lg"
              />
            </div>
            <div className="md:col-span-3">
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as Task["priority"])}
                className="w-full h-12 px-3 bg-input border border-border rounded-md text-foreground"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Button
                onClick={addTask}
                className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Filters and Stats */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <TaskFilters
              currentFilter={filter}
              onFilterChange={setFilter}
              taskCounts={{
                all: tasks.length,
                active: activeCount,
                completed: completedCount,
              }}
            />
            
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Badge variant="secondary">
                  Active: {activeCount}
                </Badge>
                <Badge variant="outline">
                  Completed: {completedCount}
                </Badge>
              </div>
              
              {completedCount > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearCompleted}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Completed
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Task List */}
        <div>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                <Filter className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {searchQuery ? "No matching tasks" : "No tasks yet"}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Try adjusting your search or filter criteria"
                  : "Add your first task to get started!"
                }
              </p>
            </div>
          ) : (
            <>
              {filter === "all" && !searchQuery && filteredTasks.length > 1 && (
                <div className="text-center mb-4 p-3 bg-accent/20 rounded-lg border border-accent">
                  <p className="text-sm text-muted-foreground">
                    💡 Drag and drop tasks to reorder them
                  </p>
                </div>
              )}
              <DragDropTaskList
                tasks={filteredTasks}
                onReorder={(startIndex, endIndex) => {
                  // Only allow reordering if not filtering/searching
                  if (filter === "all" && !searchQuery) {
                    reorderTasks(startIndex, endIndex);
                  }
                }}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
                onPriorityChange={updateTaskPriority}
              />
            </>
          )}
        </div>

        {/* Footer */}
        {tasks.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground">
              You have {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
            </p>
          </div>
        )}
      </div>
    </div>
  );
};