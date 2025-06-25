"use client";

import React, { useEffect, useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/lib/api";
import { TaskList } from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function TasksPage() {
  const { user, isSignedIn } = useUser();
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSignedIn || !user?.id) return;

    const loadTasks = async () => {
      try {
        setLoading(true);
        console.log("🔄 Fetching tasks for user:", user.id);
        const fetched = await fetchTasks(user.id);
        setTasks(fetched);
      } catch (err) {
        console.error("❌ Failed to fetch tasks", err);
        toast.error("❌ Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [isSignedIn, user?.id]);

  const addTask = async () => {
    if (!newTaskText.trim()) return;
    if (!user?.id) {
      console.warn("⚠️ User ID is undefined when creating task");
      toast.error("❌ User not available");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: newTaskText.trim(),
        userId: user.id,
        dueDate: dueDate || null,
      };
      console.log("🛠️ Creating task with payload:", payload);
      const created = await createTask(payload);
      setTasks((prev) => [...prev, created]);
      setNewTaskText("");
      setDueDate("");
      toast.success("✅ Task created!");
    } catch (err) {
      console.error("❌ Create task error:", err);
      toast.error("❌ Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      setLoading(true);
      await updateTask(id, { completed });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed } : t))
      );
      toast.success(`Task marked as ${completed ? "completed" : "incomplete"}`);
    } catch (err) {
      console.error("Update task error:", err);
      toast.error("❌ Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (id, title) => {
    try {
      setLoading(true);
      await updateTask(id, { title });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title } : t))
      );
      toast.success("✏️ Task updated!");
    } catch (err) {
      console.error("Edit task error:", err);
      toast.error("❌ Failed to edit task");
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id) => {
    try {
      setLoading(true);
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("🗑️ Task deleted");
    } catch (err) {
      console.error("Delete task error:", err);
      toast.error("❌ Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 px-4">
        <h2 className="text-3xl font-bold text-purple-700">
          🚫 You're not signed in
        </h2>
        <p className="text-gray-600 text-lg max-w-md">
          Sign in to access your personal task manager and stay organized.
        </p>
        <SignInButton mode="modal">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-lg rounded-md shadow">
            Sign In to Continue
          </Button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 mt-24 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 flex items-center gap-2">
        <PlusCircle className="w-6 h-6 text-purple-500" /> Your Tasks
      </h1>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <Input
          placeholder="Add new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          disabled={loading}
          className="w-full"
        />
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={loading}
          className="w-full sm:w-40"
        />
        <Button
          onClick={addTask}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-400 italic">
          No tasks yet. Start by adding one above! ✨
        </p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={removeTask}
          onEdit={editTask}
        />
      )}
    </div>
  );
}
