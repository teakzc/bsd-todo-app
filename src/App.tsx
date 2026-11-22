import { useState } from "react"

import type { TodoData } from "@/components/todo/todoitem"
import TodoList from "@/components/todo/todolist"

export function App() {
    const [items, setItems] = useState<TodoData[]>([
        { name: "Eat dinner", status: "unfinished" },
        { name: "Play game", status: "unfinished" },
        { name: "Homework", status: "unfinished" },
        { name: "test", status: "unfinished" },
    ])

    function handleToggle(index: number, checked: boolean) {
        setItems((prev) =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, status: checked ? "completed" : "unfinished" }
                    : item
            )
        )
    }

    function handleDelete(index: number) {
        setItems((prev) => prev.filter((_, i) => i !== index))
    }

    function handleAdd(name: string) {
        setItems((prev) => [...prev, { name, status: "unfinished" }])
    }

    return (
        <main className="flex min-h-svh justify-center bg-background px-4 py-12 sm:py-20">
            <div className="flex w-full max-w-md flex-col gap-8">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    Todo App
                </h1>

                <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
                    <TodoList
                        items={items}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onAdd={handleAdd}
                    />
                </div>
            </div>
        </main>
    )
}

export default App
