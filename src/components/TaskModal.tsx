
import React, { useState } from "react";
import { createTask, updateTasks, Task } from "../helper/tasks";

type TaskModalProps = {
  task?: Task;
  onClose: () => void;
  onTaskSaved: () => void;
};

export const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onTaskSaved }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "todo");

  const handleSubmit = async () => {
    task ? await updateTasks(task.id, { title, description, status }) : await createTask( title, description, status );
    onTaskSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-96">
        <input className="w-full border p-2 mt-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea className="w-full border p-2 mt-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={handleSubmit}>{task ? "Update" : "Create"}</button>
      </div>
    </div>
  );
};
