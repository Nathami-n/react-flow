import { CustomNode, TaskType } from "types/types";

export function CreateFlowNode(
  task_type: TaskType,
  position?: { x: number; y: number }
): CustomNode {
  return {
    id: crypto.randomUUID(),
    type: "Node",
    dragHandle: ".drag-handle",
    data: {
      task_type,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };   
}


/**
type AppNode = {
  id: string;
  type: "custom defined type"
  dragHandle: "class value e.g .customClassName"
  data: {
    task_type: TaskType; //e.g LAUNCH_BROWSER;
    [key: string]: string;
    inputs: Record<string, string>;
  };
  position: {
    x: number;
    y: number;
  };
 */
