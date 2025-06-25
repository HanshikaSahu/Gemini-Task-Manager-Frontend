'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

export default function GenerateTasksPage() {
  const [topic, setTopic] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setTasks([]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generateTasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
      } else {
        setTasks(data.tasks);
      }
    } catch (err) {
      setError('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-24 pb-10">
      <Card className="shadow-xl border border-muted p-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-purple-700">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Generate Gemini Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Input and Button */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Enter a topic (e.g. JavaScript, Fitness, AI)..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-grow"
              />
              <Button
                onClick={handleGenerate}
                disabled={loading || !topic}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate'}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-sm text-red-600 bg-red-100 p-2 rounded">
                ⚠️ {error}
              </div>
            )}

            {/* Results */}
            {tasks.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner space-y-2 border">
                <h3 className="font-semibold text-gray-800">Generated Tasks:</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
