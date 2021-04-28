import _each from 'lodash.foreach';
import _has from 'lodash.has';
import _size from 'lodash.size';

import type { Graph } from '..';

/**
 * Given a Graph graph this function applies topological sorting to it.
 * If the graph has a cycle it is impossible to generate such a list and CycleException is thrown.
 * Complexity: O(|V| + |E|).
 *
 * @argument graph - graph to apply topological sorting to.
 * @returns an array of nodes such that for each edge u -> v, u appears before v in the array.
 */
export function topsort(g: Graph): string[] {
  const visited = {};
  const stack = {};
  const results: any[] = [];

  function visit(node) {
    if (_has(stack, node)) {
      throw new CycleException();
    }

    if (!_has(visited, node)) {
      stack[node] = true;
      visited[node] = true;
      _each(g.predecessors(node), visit);
      delete stack[node];
      results.push(node);
    }
  }

  _each(g.sinks(), visit);

  if (_size(visited) !== g.nodeCount()) {
    throw new CycleException();
  }

  return results;
}

export class CycleException extends Error {}
