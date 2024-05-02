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
  D: { edges: { E: 4 } },
  E: { edges: {} },
};

// A (start)
// |
// ├─> B (weight: 5)
// |   |
// |   └─> D (weight: 3)
// |       |
// |       └─> E (weight: 4) -- End Node
// |
// └─> C (weight: 7)
//     |
//     ├─> D (weight: 2)
//     |   |
//     |   └─> E (weight: 4) -- End Node
//     |
//     └─> E (weight: 1) -- End Node

const runWorkflow = (graphJson) => {
  const visitNode = (node, delay) => {
    setTimeout(() => {
      console.log(node);
      for (const [nextNode, nextDelay] of Object.entries(graphJson[node].edges)) {
        visitNode(nextNode, nextDelay * 1000);
      }
    }, delay);
  };

  const startNode = Object.keys(graphJson).find(node => graphJson[node].start);
  visitNode(startNode, 0);
};

runWorkflow({
  "A": {"start": true, "edges": {"B": 5, "C": 7}},
  "B": {"edges": {}},
  "C": {"edges": {}}
});