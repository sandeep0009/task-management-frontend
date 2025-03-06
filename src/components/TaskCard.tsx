
import { useDraggable } from "@dnd-kit/core";
import { Task } from "../helper/tasks";

export const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id.toString(),
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-2 mb-2 bg-white shadow rounded cursor-grab"
    >
      <h3 className="text-md font-semibold">{task.title}</h3>
    </div>
  );
};

