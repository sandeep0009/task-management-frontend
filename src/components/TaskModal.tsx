import React, { useState } from "react";
import { createTask, updateTasks, Task } from "../helper/tasks";

type TaskModalProps = {
  task?: Task;
  onClose: () => void;
  onTaskSaved: () => void;
};

export const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onTaskSaved }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [status, setStatus] = useState(task?.status || "todo");

  const handleSubmit = async () => {
    task ? await updateTasks(task.id, { title, status }) : await createTask(title, status);
    onTaskSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-96">
        <input
          className="w-full border p-2 mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            {task ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};