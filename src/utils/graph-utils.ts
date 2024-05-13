import { GraphType } from '../types/types';
import { isCyclic } from './validation-utils';

export const DAG_LINK = 'https://en.wikipedia.org/wiki/Directed_acyclic_graph';
export const EDGES_EXPLANATION_LINK = 'https://www.geeksforgeeks.org/tree-back-edge-and-cross-edges-in-dfs-of-graph/';
export const EXAMPLE_DAG = {
  A: { start: true, edges: { B: 5, C: 7 } },
  B: { edges: {} },
  C: { edges: {} },
};

// EXAMPLE_DAG
// A (start)
// |
// ├─> B (weight: 5) -- End Node
// |
// └─> C (weight: 7) -- End Node

export const EXAMPLE_DAG_WITH_CROSS_EDGE = {
  A: { start: true, edges: { B: 5, C: 7 } },
  B: { edges: { D: 3 } },
  C: { edges: { D: 2, E: 1 } },
  D: { edges: {} },
  E: { edges: { D: 4 } },
};

/*
EXAMPLE_NON_TREE_DAG

     A (start)
       |   \
      (5)   (7)
       |    \
       B     C
       |    / \
      (3) (2) (1)
       | /      \
       D <- (4) <- E

       "D" should be printed 3 times at 8, 9, 12 seconds
*/

export const EXAMPLE_DAG_CROSS_EDGE_FORWARD_EDGE = {
  A: { start: true, edges: { B: 6, C: 7, E: 1 } }, // forward edge to E
  B: { edges: { D: 3 } },
  C: { edges: { D: 2, E: 1 } },
  D: { edges: {} },
  E: { edges: { D: 4 } }, // cross edge to D
};

export const EXAMPLE_DAG_BACK_EDGE = {
  A: { start: true, edges: { B: 5, C: 7 } },
  B: { edges: { D: 3 } },
  C: { edges: { D: 2, E: 1 } },
  D: { edges: { B: 1 } }, // back edge to B, invalid DAG!
  E: { edges: { D: 4 } },
};

export function printNodesWithDelays(
  adjacencyMap: GraphType,
  callback: (node: string, startSecond: number) => void,
) {
  if (isCyclic(adjacencyMap)) {
    throw new Error('The graph contains a cycle.');
  }

  const startNode = Object.keys(adjacencyMap).find(
    (node) => adjacencyMap[node].start,
  );

  if (!startNode) {
    console.error('No start node found.');
    return;
  }

  const startTime = new Date().getTime();

  function dfs(node: string, delay: number) {
    setTimeout(() => {
      const startSecond = Math.floor(
        Number(new Date().getTime() - Number(startTime)) / 1000,
      );
      console.log(`Node ${node} visited at ${startSecond} seconds`);
      callback(node, startSecond);
      for (const [neighbor, neighborDelay] of Object.entries(
        adjacencyMap[node].edges,
      )) {
        dfs(neighbor, neighborDelay * 1000);
      }
    }, delay);
  }

  dfs(startNode, 0);
}
