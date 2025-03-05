
import React, { useState, useEffect } from "react";
import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import { ColumnContainer } from "./ColumnContainer";
import { getTasks, updateTasks, Task } from "../helper/tasks";
import { TaskModal } from "./TaskModal";

type Column = { id: string; title: string; tasks: Task[] };

const initialColumns: Column[] = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "in-progress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
];

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    getTasks().then((data) => {
      setColumns(initialColumns.map(col => ({
        ...col,
        tasks: data.filter((task:any) => task.status === col.id),
      })));
    });
  }, []);

  const handleTaskSaved = async () => {
    const data = await getTasks();
    setColumns(initialColumns.map(col => ({
      ...col,
      tasks: data.filter((task:any) => task.status === col.id),
    })));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id.toString();
    const newStatus = over.id.toString();

    await updateTasks(taskId, { status: newStatus });

    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.id === newStatus
          ? [...col.tasks, prev.flatMap((c) => c.tasks).find((t) => t.id === taskId)!]
          : col.tasks.filter((task) => task.id !== taskId),
      }))
    );
  };

  return (
    <div>
      <button className="bg-green-500 text-white px-4 py-2 mb-4" onClick={() => setIsModalOpen(true)}>
        Add Task
      </button>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer key={col.id} column={col} onEdit={setSelectedTask} onTaskSaved={handleTaskSaved} />
          ))}
        </div>
      </DndContext>

      {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} onTaskSaved={handleTaskSaved} />}
      {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} onTaskSaved={handleTaskSaved} />}
    </div>
  );
};

export default KanbanBoard;
