'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Sparkles } from 'lucide-react'

export default function HomePage() {
  const [topic, setTopic] = useState('')
  const [tasks, setTasks] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generateTasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setTasks(data.tasks || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto pt-28 px-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-purple-700 tracking-tight">
          Gemini Task Generator
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Type a topic and instantly get task suggestions using AI.
        </p>
      </div>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="e.g. JavaScript, Machine Learning..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-grow text-sm sm:text-base"
        />
        <Button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate'}
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-100 p-3 rounded-lg border border-red-300">
          ⚠️ {error}
        </div>
      )}

      {/* Generated Tasks */}
      {tasks.length > 0 && (
        <Card className="shadow-xl border border-muted">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2 text-purple-800">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Tasks for “{topic}”
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
              {tasks.map((task, i) => (
                <li
                  key={i}
                  className="bg-purple-50 p-3 rounded-md shadow-sm border border-purple-100"
                >
                  {task}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
