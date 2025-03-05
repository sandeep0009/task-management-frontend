import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { deleteTask, Task } from "../helper/tasks";

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onTaskDeleted: () => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onTaskDeleted }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: task.id });

  const handleDelete = async () => {
    await deleteTask(task.id);
    onTaskDeleted();
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className="p-2 mb-2 bg-white shadow rounded cursor-grab">
      <h3 className="text-md font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex justify-between mt-2">
        <button className="text-blue-500" onClick={() => onEdit(task)}>Edit</button>
        <button className="text-red-500" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};
