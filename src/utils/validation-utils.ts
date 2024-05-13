import { GraphType, NodeType } from '../types/types';

export function isGraphType(obj: unknown): obj is GraphType {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Provided object is not an object or is null');
  }

  const recordObj = obj as Record<string, NodeType>;
  let startCount = 0;

  for (const key of Object.keys(recordObj)) {
    const node = recordObj[key];

    if (typeof node !== 'object' || node === null) {
      throw new Error(`Node ${key} is not an object or is null`);
    }

    if (node.start) {
      startCount += 1;
    }

    if (typeof node.edges !== 'object' || node.edges === null) {
      throw new Error(`Edges of node ${key} is not an object or is null`);
    }

    for (const edgeKey of Object.keys(node.edges)) {
      const edgeValue: number = node.edges[edgeKey];
      if (typeof edgeKey !== 'string' || typeof edgeValue !== 'number') {
        throw new Error(
          `Edge key ${edgeKey} of node ${key} is not a string or edge value is not a number`,
        );
      }
    }
  }

  if (startCount !== 1) {
    throw new Error('There should be exactly one start node');
  }

  return true;
}

export function isCyclic(adjacencyMap: GraphType): boolean {
  const visited = new Set<string>();
  const departures = new Set<string>();

  function dfs(node: string): boolean {
    visited.add(node);
    for (const neighbor of Object.keys(adjacencyMap[node].edges)) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true; // cycle found
      } else if (!departures.has(neighbor)) {
        // If a node hasn't been marked as "fully explored" (departure not set), it means we're still in the process of exploring it.
        // The timestamp is like a step counter, increasing each time we start exploring a new node or finish exploring a node.
        // If we come across a node that we started exploring but haven't finished (its departure time isn't set),
        // and we're trying to explore it again, it means we've gone in a circle.
        return true; // cycle found
      }
    }
    departures.add(node);
    return false; // no cycle found
  }

  // Call the recursive helper function to detect cycle in different DFS trees
  for (const node of Object.keys(adjacencyMap)) {
    if (!visited.has(node) && dfs(node)) {
      return true;
    }
  }
  return false;
}
