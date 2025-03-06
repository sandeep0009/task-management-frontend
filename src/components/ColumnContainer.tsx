
import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Task } from "../helper/tasks";

type ColumnProps = {
  column: { id: string; title: string; tasks: Task[] };
};

const columnStyles: Record<string, string> = {
  todo: "bg-gray-700",
  "in-progress": "bg-purple-500",
  done: "bg-green-500",
};

export const ColumnContainer: React.FC<ColumnProps> = ({ column }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div ref={setNodeRef} className="w-64 p-2">
      {/* Column Header */}
      <h2
        className={`text-white text-center py-2 rounded-md font-semibold shadow-md ${
          columnStyles[column.id] || "bg-gray-500"
        }`}
      >
        {column.title}
      </h2>

      {/* Task Container */}
      <div className="bg-white rounded-md shadow-md p-3 mt-2 min-h-[120px]">
        {column.tasks && column.tasks.length > 0 ? (
          column.tasks.map((task) => task && <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="text-gray-400 text-center py-6">No tasks</div>
        )}
      </div>
    </div>
  );
};
