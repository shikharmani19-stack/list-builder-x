import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { TaskItem } from "./TaskItem";
import { Task } from "./TaskManager";

interface DragDropTaskListProps {
  tasks: Task[];
  onReorder: (startIndex: number, endIndex: number) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onPriorityChange: (id: string, priority: Task["priority"]) => void;
}

export const DragDropTaskList = ({ 
  tasks, 
  onReorder, 
  onToggle, 
  onDelete, 
  onEdit, 
  onPriorityChange 
}: DragDropTaskListProps) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    if (source.index === destination.index) return;
    
    onReorder(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-accent/20 rounded-lg p-2' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable 
                key={task.id} 
                draggableId={task.id} 
                index={index}
                isDragDisabled={task.completed}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-transform duration-200 ${
                      snapshot.isDragging ? 'rotate-3 scale-105 shadow-2xl' : ''
                    }`}
                    style={{
                      ...provided.draggableProps.style,
                      cursor: task.completed ? 'default' : 'grab',
                    }}
                  >
                    <TaskItem
                      task={task}
                      onToggle={onToggle}
                      onDelete={onDelete}
                      onEdit={onEdit}
                      onPriorityChange={onPriorityChange}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};