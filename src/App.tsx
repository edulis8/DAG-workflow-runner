import { useState } from 'react';
import './App.css';
import { runWorkflow } from './utils/utils';

function App() {
  const [workflowOutput, setWorkflowOutput] = useState<
    { node: string; startSecond: number }[]
  >([]);

  function handleTaskRunnerStart() {
    setWorkflowOutput([]);
    const addNodeToWorkflowOutput = (node: string, startSecond: number) => {
      setWorkflowOutput((prevOutput) => [...prevOutput, { node, startSecond }]);
    };
    runWorkflow(addNodeToWorkflowOutput);
  }

  return (
    <>
      <h1>Task Runner</h1>
      <p className="">Click the button to start the task runner.</p>
      <button type="button" onClick={handleTaskRunnerStart}>
        Start Task Runner
      </button>
      <section className="task-display">
        {workflowOutput.map((node, index) => (
          <div key={index}>
            Node {node.node} visited at {node.startSecond} seconds
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
