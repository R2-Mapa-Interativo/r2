import { GraphEdge, GraphNode } from "../models/types";

export const calculateDijkstra = (
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  endId: string
): GraphNode[] => {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const unvisited = new Set<string>();

  nodes.forEach((n) => {
    distances[n.id] = Infinity;
    previous[n.id] = null;
    unvisited.add(n.id);
  });

  distances[startId] = 0;

  while (unvisited.size > 0) {
    let currentId: string | null = null;
    let minDistance = Infinity;

    unvisited.forEach((id) => {
      const isSmaller = distances[id] < minDistance;
      isSmaller && (currentId = id);
      isSmaller && (minDistance = distances[id]);
    });

    const notFound = !currentId || minDistance === Infinity;
    if (notFound) break;

    const isEnd = currentId === endId;
    if (isEnd) break;

    const activeNodeId = currentId as string;
    unvisited.delete(activeNodeId);

    const neighbors = edges.filter((e) => e.source === activeNodeId || e.target === activeNodeId);

    neighbors.forEach((edge) => {
      const neighborId = edge.source === activeNodeId ? edge.target : edge.source;
      const inUnvisited = unvisited.has(neighborId);

      if (!inUnvisited) return;

      const newDistance = distances[activeNodeId] + edge.weight;
      const isShorter = newDistance < distances[neighborId];

      isShorter && (distances[neighborId] = newDistance);
      isShorter && (previous[neighborId] = activeNodeId);
    });
  }

  const path: string[] = [];
  let curr: string | null = endId;

  while (curr) {
    path.unshift(curr);
    curr = previous[curr];
  }

  const isValidPath = path[0] === startId;
  return isValidPath ? path.map((id) => nodes.find((n) => n.id === id)!) : [];
};