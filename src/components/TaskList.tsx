"use client";

import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { Task } from "@/types/tasks";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md shadow-sm border transition-all"
        >
          <div className="flex flex-col gap-2 flex-grow w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id, !task.completed)}
                className="w-4 h-4 accent-purple-600 mt-1 sm:mt-0"
              />

              {editingId === task.id ? (
                <input
                  className="border rounded px-2 py-1 text-sm text-gray-800 w-full sm:max-w-xs"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onEdit(task.id, editText);
                      setEditingId(null);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span
                  className={`text-lg cursor-pointer break-words ${
                    task.completed ? "line-through text-gray-400" : "text-gray-900"
                  }`}
                  onDoubleClick={() => {
                    setEditingId(task.id);
                    setEditText(task.title);
                  }}
                >
                  {task.title || "Untitled Task"}
                </span>
              )}
            </div>

            {task.dueDate && (
              <div
                className={`text-sm ${
                  new Date(task.dueDate) < new Date() && !task.completed
                    ? "text-red-500 font-medium"
                    : "text-gray-500"
                }`}
              >
                📅 Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto justify-end">
            {editingId === task.id ? (
              <button
                onClick={() => {
                  onEdit(task.id, editText);
                  setEditingId(null);
                }}
                className="text-sm text-purple-600 hover:underline"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingId(task.id);
                  setEditText(task.title);
                }}
                aria-label="Edit"
              >
                <Pencil className="w-4 h-4 text-purple-600" />
              </button>
            )}
            <button onClick={() => onDelete(task.id)} aria-label="Delete">
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
