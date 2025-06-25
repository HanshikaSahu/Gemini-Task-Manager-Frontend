export type Task = {
  id: string; // ✅ string to match your database/Clerk IDs
  title: string;
  completed: boolean;
  dueDate?: string | null;
};
