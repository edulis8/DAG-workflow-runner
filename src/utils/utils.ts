export function runWorkflow() {
  printNodesWithDelays(nonTreeDAGJson);
}

const exampleGraphJson = {
  A: { start: true, edges: { B: 5, C: 7 } },
  B: { edges: {} },
  C: { edges: {} },
};

// A (start)
// |
// ├─> B (weight: 5) -- End Node
// |
// └─> C (weight: 7) -- End Node

const nonTreeDAGJson = {
  A: { start: true, edges: { B: 5, C: 7 } },
  B: { edges: { D: 3 } },
  C: { edges: { D: 2, E: 1 } },
  D: { edges: {} },
  E: { edges: { D: 4 } },
};

/*

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

function printNodesWithDelays(adjacencyMap: {
  [key: string]: { start?: boolean; edges: { [key: string]: number } };
}) {
  if (isCyclic(adjacencyMap)) {
    console.error('The graph contains a cycle. Aborting...');
    return;
  }
  console.log('=============');
  // Find the start node
  const startNode = Object.keys(adjacencyMap).find(
    (node) => adjacencyMap[node].start,
  );

  if (startNode) {
    // Call dfs with the start node and a delay of 0
    dfs(startNode, 0);
  } else {
    console.error('No start node found');
  }

  // Function to visit a node in the graph
  const startTime = new Date().getTime();
  function dfs(node: string, delay: number) {
    setTimeout(() => {
      console.log(
        node,
        Math.floor(Number(new Date().getTime() - Number(startTime)) / 1000),
      );
      // For each edge going out of the node
      for (const [neighbor, neighborDelay] of Object.entries(
        adjacencyMap[node].edges,
      )) {
        // recursively DFS on the neighbor, with its delay
        dfs(neighbor, neighborDelay * 1000);
      }
    }, delay);
  }
}

function isCyclic(adjacencyMap: {
  [key: string]: { start?: boolean; edges: { [key: string]: number } };
}): boolean {
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
