import { useId, useState } from "react";
import { InputProps } from "types/types";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";



export default function StringInput({ input, updateNodeInputValue, value }: InputProps) {
    const id = useId();
    const [internalValue, setInternalValue] = useState(value)
    return (
        <div className="space-y-1 p-1 w-full">
            <Label htmlFor={id} className="text-xl flex">
                {input.name}
                {input.required && (
                    <p className="text-red-400 px-2">*</p>
                )}
            </Label>
            <Input id={id}
            className="text-xs"
            value={internalValue} onChange={(e) => setInternalValue(e.target.value)}
                onBlur={(e) => updateNodeInputValue(e.target.value)}
            />
            {input.helperText && (
                <p className="text-muted-foreground px-2">
                    {input.helperText}
                </p>
            )}
        </div>
    )
}
