import { Node } from "@xyflow/react";

export enum WorkFlowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export enum TaskInputType {
  STRING = "STRING",
}

export interface InputProps {
  input: ActualTaskInputsType;
  value: string;
  updateNodeInputValue: (newValue: string) => void;
}

export interface ActualTaskInputsType {
  name: string;
  input_type: TaskInputType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  [key: string]: any;
}

// nodes
export interface CustomNodeData {
  task_type: TaskType;
  [key: string]: any;
  inputs: Record<string, string>;
}

/* this is a custom App node implementation 
it resembles the following
type AppNode = {
  id: string;
  data: {
    task_type: TaskType; //e.g LAUNCH_BROWSER;
    [key: string]: string;
    inputs: Record<string, string>;
  };
  position: {
    x: number;
    y: number;
  };
};

*/

export interface CustomNode extends Node {
  data: CustomNodeData;
}
