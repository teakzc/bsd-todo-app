import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import type { TodoData } from "@/components/todo/todoitem"
import TodoItem from "@/components/todo/todoitem"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Todo can't be empty.")
        .max(100, "Todo must be 100 characters or less."),
})

export interface TodoListProps {
    items: TodoData[]
    onToggle: (index: number, checked: boolean) => void
    onDelete: (index: number) => void
    onAdd: (name: string) => void
}

export default function TodoList(props: TodoListProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "" },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        props.onAdd(data.name)
        form.reset()
    }

    return (
        <FieldSet>
            <FieldLegend>Todo List</FieldLegend>
            <FieldDescription>Please complete all tasks!</FieldDescription>

            <FieldGroup>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <div className="flex gap-2">
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        aria-label="New todo"
                                        placeholder="What needs doing?"
                                        autoComplete="off"
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        aria-label="Add todo"
                                    >
                                        <Plus />
                                    </Button>
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </form>

                {props.items.map((item, i) => (
                    <TodoItem
                        key={i}
                        name={item.name}
                        status={item.status}
                        onCheckedChange={(checked) =>
                            props.onToggle(i, checked)
                        }
                        onDelete={() => {
                            props.onDelete(i)
                        }}
                    />
                ))}
            </FieldGroup>
        </FieldSet>
    )
}
