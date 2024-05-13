// types.ts
export type NodeType = {
  start?: boolean;
  edges: { [key: string]: number };
};

export type GraphType = { [key: string]: NodeType };
