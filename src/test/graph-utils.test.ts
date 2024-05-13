import { afterEach, beforeEach, test } from 'vitest';
import { expect } from 'expect';
import sinon, { SinonFakeTimers } from 'sinon';
import {
  printNodesWithDelays,
  EXAMPLE_DAG,
  EXAMPLE_DAG_WITH_CROSS_EDGE,
  EXAMPLE_DAG_CROSS_EDGE_FORWARD_EDGE,
  EXAMPLE_DAG_BACK_EDGE,
} from '../utils/graph-utils';

// EXAMPLE_DAG = {
//   A: { start: true, edges: { B: 5, C: 7 } },
//   B: { edges: {} },
//   C: { edges: {} },
// };

// EXAMPLE_DAG_WITH_CROSS_EDGE = {
//   A: { start: true, edges: { B: 5, C: 7 } },
//   B: { edges: { D: 3 } },
//   C: { edges: { D: 2, E: 1 } },
//   D: { edges: {} },
//   E: { edges: { D: 4 } }, // cross edge
// };

// EXAMPLE_DAG_CROSS_EDGE_FORWARD_EDGE = {
//   A: { start: true, edges: { B: 6, C: 7, E: 1 } }, // forward edge to E
//   B: { edges: { D: 3 } },
//   C: { edges: { D: 2, E: 1 } },
//   D: { edges: {} },
//   E: { edges: { D: 4 } }, // cross edge to D
// };

// EXAMPLE_DAG_BACK_EDGE = {
//   A: { start: true, edges: { B: 5, C: 7 } },
//   B: { edges: { D: 3 } },
//   C: { edges: { D: 2, E: 1 } },
//   D: { edges: { B: 1 } }, // back edge to B, invalid DAG!
//   E: { edges: { D: 4 } },
// };

let clock: SinonFakeTimers;

beforeEach(() => {
  clock = sinon.useFakeTimers();
});

afterEach(() => {
  clock.restore();
});

test('printNodesWithDelays calls callback at correct times when operating on simple tree-like graph', () => {
  const callback = sinon.fake();
  printNodesWithDelays(EXAMPLE_DAG, callback);

  clock.tick(10000);

  expect(callback.getCall(0).args).toEqual(['A', 0]);
  expect(callback.getCall(1).args).toEqual(['B', 5]);
  expect(callback.getCall(2).args).toEqual(['C', 7]);
});

test('printNodesWithDelays calls callback at correct times when operating on flat tree graph', () => {
  const FLAT_TREE_GRAPH = {
    A: { start: true, edges: { B: 1, C: 1, D: 1, E: 1, F: 1 } },
    B: { edges: {} },
    C: { edges: {} },
    D: { edges: {} },
    E: { edges: {} },
    F: { edges: {} },
  };

  const callback = sinon.fake();
  printNodesWithDelays(FLAT_TREE_GRAPH, callback);

  clock.tick(15000);

  expect(callback.getCall(0).args).toEqual(['A', 0]);
  expect(callback.getCall(1).args).toEqual(['B', 1]);
  expect(callback.getCall(2).args).toEqual(['C', 1]);
  expect(callback.getCall(3).args).toEqual(['D', 1]);
  expect(callback.getCall(4).args).toEqual(['E', 1]);
  expect(callback.getCall(5).args).toEqual(['F', 1]);
});

test('printNodesWithDelays calls callback at correct times when operating on more complex graph with cross edges', () => {
  const callback = sinon.fake();
  printNodesWithDelays(EXAMPLE_DAG_WITH_CROSS_EDGE, callback);

  clock.tick(15000);

  expect(callback.getCall(0).args).toEqual(['A', 0]);
  expect(callback.getCall(1).args).toEqual(['B', 5]);
  expect(callback.getCall(2).args).toEqual(['C', 7]);
  expect(callback.getCall(3).args).toEqual(['D', 8]);
  expect(callback.getCall(4).args).toEqual(['E', 8]);
  expect(callback.getCall(5).args).toEqual(['D', 9]);
  expect(callback.getCall(6).args).toEqual(['D', 12]);
});

test('printNodesWithDelays calls callback at correct times when operating on more complex graph with cross edges and forward edges', () => {
  const callback = sinon.fake();

  printNodesWithDelays(EXAMPLE_DAG_CROSS_EDGE_FORWARD_EDGE, callback);

  clock.tick(15000);

  expect(callback.getCall(0).args).toEqual(['A', 0]);
  expect(callback.getCall(1).args).toEqual(['E', 1]);
  expect(callback.getCall(2).args).toEqual(['D', 5]);
  expect(callback.getCall(3).args).toEqual(['B', 6]);
  expect(callback.getCall(4).args).toEqual(['C', 7]);
  expect(callback.getCall(5).args).toEqual(['E', 8]);
  expect(callback.getCall(6).args).toEqual(['D', 9]);
  expect(callback.getCall(7).args).toEqual(['D', 9]);
  expect(callback.getCall(8).args).toEqual(['D', 12]);
});

test('printNodesWithDelays throws error when there is a back edge (a cycle in the graph)', () => {
  const callback = sinon.fake();

  clock.tick(15000);

  expect(() => printNodesWithDelays(EXAMPLE_DAG_BACK_EDGE, callback)).toThrow(
    'The graph contains a cycle.',
  );
});
