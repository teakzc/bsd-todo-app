import { Trash2Icon } from "lucide-react"
import { useId } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

export interface TodoData {
    name: string
    status: "unfinished" | "completed"
}

export interface TasksProps extends TodoData {
    onCheckedChange: (checked: boolean) => void
    onDelete: () => void
}

export default function Tasks(props: TasksProps) {
    const id = useId()

    return (
        <Field orientation="horizontal">
            <Checkbox
                checked={props.status === "completed"}
                onCheckedChange={props.onCheckedChange}
                id={id}
            />
            <FieldLabel htmlFor={id}>{props.name}</FieldLabel>
            <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${props.name}`}
                className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                onClick={props.onDelete}
            >
                <Trash2Icon />
            </Button>
        </Field>
    )
}
