import React from "react";
import { Button } from "@/components/ui/button";

interface TaskItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export function TaskItem({ id, text, completed, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(text);

  const handleSave = () => {
    onEdit(id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 border rounded mb-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id, !completed)}
        className="mr-2"
      />
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-grow border rounded px-2 py-1 mr-2"
        />
      ) : (
        <span className={`flex-grow ${completed ? "line-through text-gray-500" : ""}`}>{text}</span>
      )}
      {isEditing ? (
        <Button size="sm" variant="secondary" onClick={handleSave}>
          Save
        </Button>
      ) : (
        <>
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </>
      )}
    </div>
  );
}
