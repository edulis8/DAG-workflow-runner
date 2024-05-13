import { useState } from 'react';
import './App.css';
import {
  EXAMPLE_DAG,
  EXAMPLE_DAG_WITH_CROSS_EDGE,
  DAG_LINK,
  printNodesWithDelays,
  EDGES_EXPLANATION_LINK,
  EXAMPLE_DAG_CROSS_EDGE_FORWARD_EDGE,
  EXAMPLE_DAG_BACK_EDGE,
} from './utils/graph-utils';
import { GraphType } from './types/types';
import { isGraphType } from './utils/validation-utils';
import { GraphExample } from './GraphExample';

function App() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(EXAMPLE_DAG, null, 2),
  );
  const [workflowOutput, setWorkflowOutput] = useState<
    { node: string; startSecond: number }[]
  >([]);

  const [error, setError] = useState<any>('');

  const addNodeToWorkflowOutput = (node: string, startSecond: number) => {
    setWorkflowOutput((prev) => [...prev, { node, startSecond }]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      const parsedJson = JSON.parse(jsonInput);

      if (isGraphType(parsedJson)) {
        const json: GraphType = parsedJson;
        setWorkflowOutput([]);
        printNodesWithDelays(json, addNodeToWorkflowOutput);
      }
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <main className="container">
      <h1>Task Runner</h1>
      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <h4>
              Enter JSON following the{' '}
              <a
                target="_blank"
                href={DAG_LINK}
                rel="noreferrer"
                aria-label="This link will open in a new tab and take you to the DAG graph pattern documentation"
                title="DAG graph pattern documentation"
              >
                DAG
              </a>{' '}
              graph pattern. Use provided JSON examples as a template.
            </h4>
          </div>
          <div className="flex-col-wrapper">
            <div className="explanation card">
              As the task runner traverses the graph, it should display the name
              of each visited node, starting from the start node. Then, for
              every edge emanating from a node, the runner should pause for a
              certain number of seconds before moving to the connected vertex.
              This pause duration corresponds to the number associated with the
              edge.
            </div>
            <details>
              <summary>
                Click to view a example graph JSON templates to use.
              </summary>
              Reference:{' '}
              <a
                target="_blank"
                href={EDGES_EXPLANATION_LINK}
                rel="noreferrer"
                aria-label="This link will open in a new tab and take you to the DAG graph pattern documentation"
                title="DAG edge types documentation"
              >
                Geeks For Geeks: Tree, Back, Edge and Cross Edges in DFS of
                Graph
              </a>
              <div className="flex-row-wrapper">
                <GraphExample
                  description="A simple tree graph"
                  graph={EXAMPLE_DAG}
                  onSetJsonInput={setJsonInput}
                />
                <GraphExample
                  description="A graph with a cross edge"
                  graph={EXAMPLE_DAG_WITH_CROSS_EDGE}
                  onSetJsonInput={setJsonInput}
                />
                <GraphExample
                  description="A graph with a cross edge and a forward edge"
                  graph={EXAMPLE_DAG_CROSS_EDGE_FORWARD_EDGE}
                  onSetJsonInput={setJsonInput}
                />
                <GraphExample
                  description="A graph with a back edge, invalid DAG!"
                  graph={EXAMPLE_DAG_BACK_EDGE}
                  onSetJsonInput={setJsonInput}
                />
              </div>
            </details>
          </div>
          <div className="flex-col-wrapper">
            <label htmlFor="json-input">
              Enter (or modify existing) graph JSON in the below box, then click
              the button below to run it.
            </label>
            <textarea
              rows={30}
              id="json-input"
              value={jsonInput}
              onChange={(event) => setJsonInput(event.target.value)}
            />
            {error && <div className="error-message">Error: {error}</div>}
          </div>
          <button className="button-submit" type="submit">
            Start Task Runner
          </button>
        </form>
      </section>
      <section className="task-display flex-col-wrapper">
        {workflowOutput.map((node, index) => (
          <div key={index} className="card">
            Node {node.node} visited at {node.startSecond} seconds
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
