import { useState } from 'react';
import './App.css';
import { runWorkflow } from './utils/utils';

function App() {
  // const [count, setCount] = useState(0);

  function handleTaskRunnerStart() {
    runWorkflow();
  }

  return (
    <>
      <h1>Task Runner</h1>
      <p className="">Click the button to start the task runner.</p>
      <button type="button" onClick={handleTaskRunnerStart}>
        Start Task Runner
      </button>
    </>
  );
}

export default App;
