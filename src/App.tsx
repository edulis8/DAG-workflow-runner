import { useState } from 'react';
import './App.css';
import { runWorkflow } from './utils/utils';

function App() {
  // const [count, setCount] = useState(0);

  function handleButtonClick() {
    runWorkflow();
  }

  return (
    <>
      <div>hi </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button type="button" onClick={handleButtonClick}>
        click me
      </button>
    </>
  );
}

export default App;
