import { GraphType } from './types/types';

export function GraphExample({
  description,
  graph,
  onSetJsonInput,
}: {
  description: string;
  graph: GraphType;
  onSetJsonInput: (json: string) => void;
}) {
  return (
    <div className="example">
      {description}
      <pre>{JSON.stringify(graph, null, 2)}</pre>
      <button
        type="button"
        onClick={() => onSetJsonInput(JSON.stringify(graph, null, 2))}
        className="button-submit"
      >
        Use this example
      </button>
    </div>
  );
}
