import React, { useState, useEffect } from "react";
import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import { ColumnContainer } from "./ColumnContainer";
import { getTasks, updateTasks, Task } from "../helper/tasks";
import { TaskModal } from "./TaskModal";

type Column = { id: string; title: string; tasks: Task[] };

const initialColumns: Column[] = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "in-progress", title: "In Progress", tasks: [] },
  { id: "done", title: "Closed", tasks: [] },
];

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    getTasks()
      .then((data) => {
        const processedColumns = initialColumns.map((col) => {
          const columnTasks = data.filter(
            (task: Task) => task && task.status && task.status.toLowerCase() === col.id
          );

          return {
            ...col,
            tasks: columnTasks,
          };
        });
        setColumns(processedColumns);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleTaskSaved = async () => {
    const data = await getTasks();
    setColumns(
      initialColumns.map((col) => ({
        ...col,
        tasks: data.filter((task: Task) => task && task.status === col.id),
      }))
    );
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id.toString();
    const newStatus = over.id.toString();
    const taskBeingDragged = columns.flatMap((col) => col.tasks).find((task) => task.id.toString() === taskId);

    if (!taskBeingDragged) {
      console.error("Task not found:", taskId);
      return;
    }

    const updatedTask = {
      ...taskBeingDragged,
      status: newStatus,
    };

    try {
      await updateTasks(taskId, { status: newStatus });
    } catch (error) {
      console.error("Failed to update task on server:", error);
      return;
    }
    setColumns((prev) => {
      return prev.map((col) => {
        if (col.id === newStatus) {
          return {
            ...col,
            tasks: [...col.tasks.filter((t) => t.id.toString() !== taskId), updatedTask],
          };
        }
        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id.toString() !== taskId),
        };
      });
    });

    console.log("Local state updated, task moved to:", newStatus);
  };

  return (
    <div className="mt-10 px-6 flex flex-col items-center">
      <div className="w-full flex justify-end mb-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Task
        </button>
      </div>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="flex justify-center gap-2">
          {columns.map((col) => (
            <ColumnContainer key={col.id} column={col} />
          ))}
        </div>
      </DndContext>

      {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} onTaskSaved={handleTaskSaved} />}
      {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} onTaskSaved={handleTaskSaved} />}
    </div>
  );
};

export default KanbanBoard;
