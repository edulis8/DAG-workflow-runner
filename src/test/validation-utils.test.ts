import { describe, test } from 'vitest';
import { expect } from 'expect';
import { validateGraph, isCyclic } from '../utils/validation-utils';

describe('validateGraph', () => {
  test('should throw an error if the provided object is not an object or is null', () => {
    expect(() => validateGraph(null)).toThrow(
      'Provided object is not an object or is null',
    );
    expect(() => validateGraph('not an object')).toThrow(
      'Provided object is not an object or is null',
    );
  });

  test('should throw an error if a node is not an object or is null', () => {
    const invalidGraph = { node1: null };
    expect(() => validateGraph(invalidGraph)).toThrow(
      'Node node1 is not an object or is null',
    );
  });

  test('should throw an error if edges of a node is not an object or is null', () => {
    const invalidGraph = { node1: { start: true, edges: null } };
    expect(() => validateGraph(invalidGraph)).toThrow(
      'Edges of node node1 is not an object or is null',
    );
  });

  test('should throw an error if there is not exactly one start node', () => {
    const invalidGraph = {
      node1: { start: true, edges: {} },
      node2: { start: true, edges: {} },
    };
    expect(() => validateGraph(invalidGraph)).toThrow(
      'There should be exactly one start node',
    );
  });

  test('should return true for a valid graph', () => {
    const validGraph = {
      node1: { start: true, edges: { node2: 1 } },
      node2: { edges: {} },
    };
    expect(validateGraph(validGraph)).toBe(true);
  });

  test('should throw an error if an edge key does not exist in the parent object', () => {
    const invalidGraph = {
      node1: { start: true, edges: { node2: 1 } },
      node2: { edges: { node3: 1 } },
    };
    expect(() => validateGraph(invalidGraph)).toThrowError(
      'Edge key node3 of node node2 does not exist in the parent object',
    );
  });
});

describe('isCyclic', () => {
  test('should return false for a graph with no cycles', () => {
    const acyclicGraph = {
      node1: { start: true, edges: { node2: 1 } },
      node2: { edges: { node3: 1 } },
      node3: { edges: {} },
    };
    expect(isCyclic(acyclicGraph)).toBe(false);
  });

  test('should return true for a graph with a cycle', () => {
    const cyclicGraph = {
      node1: { start: true, edges: { node2: 1 } },
      node2: { edges: { node3: 1 } },
      node3: { edges: { node1: 1 } },
    };
    expect(isCyclic(cyclicGraph)).toBe(true);
  });

  test('should return true for a graph with a self-loop', () => {
    const selfLoopGraph = {
      node1: { start: true, edges: { node1: 1 } },
    };
    expect(isCyclic(selfLoopGraph)).toBe(true);
  });

  test('should return true for a graph with a cycle in a non-start node', () => {
    const cyclicGraph = {
      node1: { start: true, edges: { node2: 1 } },
      node2: { edges: { node3: 1, node4: 1 } },
      node3: { edges: { node2: 1 } },
      node4: { edges: {} },
    };
    expect(isCyclic(cyclicGraph)).toBe(true);
  });
});
