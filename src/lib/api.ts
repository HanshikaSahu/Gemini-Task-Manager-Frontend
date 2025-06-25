const BASE_URL = "http://localhost:3001/tasks";

// ✅ Fetch all tasks for a given user
export async function fetchTasks(userId: string) {
  if (!userId || userId === "YOUR_ID") {
    throw new Error("❌ Invalid userId passed to fetchTasks");
  }

  const res = await fetch(`${BASE_URL}?userId=${userId}`);
  const data = await res.json();

  if (!res.ok) {
    console.error("❌ backend fetchTasks error:", data);
    throw new Error(data.error || "Failed to fetch tasks");
  }

  return Array.isArray(data) ? data : data.tasks || [];
}


// ✅ Create a new task
export async function createTask(task: {
  title: string;
  userId: string;
  dueDate?: string | null;
}) {
  if (!task.userId) {
    console.warn("⚠️ No userId provided in task:", task);
    throw new Error("User ID is required to create a task.");
  }

  console.log("📤 Sending task to backend:", task);

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("❌ Backend returned error on createTask:", data);
    throw new Error("Failed to create task");
  }

  return data;
}

// ✅ Update task (toggle completion, edit title, update dueDate)
export async function updateTask(
  id: number,
  updates: Partial<{
    title: string;
    completed: boolean;
    dueDate: string | null;
  }>
) {
  console.log(`🔧 Updating task #${id} with:`, updates);

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(`❌ Failed to update task #${id}:`, data);
    throw new Error("Failed to update task");
  }

  return data;
}

// ✅ Delete a task
export async function deleteTask(id: number) {
  console.log(`🗑️ Deleting task #${id}`);

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(`❌ Failed to delete task #${id}:`, data);
    throw new Error("Failed to delete task");
  }

  return data;
}
