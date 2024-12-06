import { GlobeIcon, LucideProps } from "lucide-react";
import { TaskInputType, TaskType } from "types/types";

export const LaunchBrowserTask = {
    type: TaskType.LAUNCH_BROWSER,
    label: "Launch browser",
    icon: (props: LucideProps) => <GlobeIcon className="stroke-pink-400" {...props} />,
    isEntryPoint: true,
    inputs: [
        {
            name: "Website url",
            input_type: TaskInputType.STRING,
            helperText: "e.g https://www.google.com",
            required: true,
            hideHandle: true,
        }
    ]
}