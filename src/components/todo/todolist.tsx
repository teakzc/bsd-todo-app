import type { TodoData } from "@/components/todo/todoitem"
import TodoItem from "@/components/todo/todoitem"
import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"

export interface TodoListProps {
    items: TodoData[]
    onToggle: (index: number, checked: boolean) => void
    onDelete: (index: number) => void
}

export default function TodoList(props: TodoListProps) {
    return (
        <FieldSet>
            <FieldLegend>Todo List</FieldLegend>
            <FieldDescription>Please complete all tasks!</FieldDescription>
            <FieldGroup>
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
