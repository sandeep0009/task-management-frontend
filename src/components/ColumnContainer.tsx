import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Task } from "../helper/tasks";

type ColumnProps = {
  column: { id: string; title: string; tasks: Task[] };
  onEdit: (task: Task) => void;
  onTaskSaved: () => void;
};

export const ColumnContainer: React.FC<ColumnProps> = ({ 
  column, 
  onEdit, 
  onTaskSaved 
}) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div 
      ref={setNodeRef} 
      className="p-4 w-64 bg-gray-100 rounded-lg"
    >
      <h2 className="text-xl font-bold mb-2">{column.title}</h2>
      {column.tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onEdit={onEdit} 
          onTaskDeleted={onTaskSaved} 
        />
      ))}
    </div>
  );
};