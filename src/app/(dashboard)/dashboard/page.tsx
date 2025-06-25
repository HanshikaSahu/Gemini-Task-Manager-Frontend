'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { fetchTasks } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FaClipboardCheck,
  FaClipboardList,
  FaClipboard,
} from 'react-icons/fa';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
};

export default function DashboardPage() {
  const { user } = useUser();
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    if (!user) return;
    fetchTasks(user.id).then((tasks: Task[]) => {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter((t) => t.completed).length;
      const pendingTasks = totalTasks - completedTasks;

      setTotal(totalTasks);
      setCompleted(completedTasks);
      setPending(pendingTasks);
    });
  }, [user]);

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-extrabold text-purple-700 drop-shadow-sm">
          🎯 Welcome to Your Dashboard
        </h2>
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          Track your tasks, generate ideas, and stay productive with Gemini ✨
        </p>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-6 mt-10">
          <StatCard
            title="Total Tasks"
            icon={<FaClipboardList />}
            count={total}
            color="text-blue-600"
          />
          <StatCard
            title="Completed"
            icon={<FaClipboardCheck />}
            count={completed}
            color="text-green-600"
          />
          <StatCard
            title="Pending"
            icon={<FaClipboard />}
            count={pending}
            color="text-yellow-600"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  icon,
  count,
  color,
}: {
  title: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}) {
  return (
    <Card className="shadow-md border border-purple-200 rounded-lg hover:shadow-xl transition">
      <CardHeader className="flex items-center gap-3 pb-2">
        <div className={`text-3xl ${color}`}>{icon}</div>
        <CardTitle className="text-lg font-semibold text-gray-700">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold text-gray-900">{count}</p>
      </CardContent>
    </Card>
  );
}
