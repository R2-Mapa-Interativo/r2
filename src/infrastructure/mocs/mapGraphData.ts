import { GraphEdge, GraphNode } from "@/domain/models/types";

export const mapNodes: GraphNode[] = [
  { id: "current", x: 48, y: 58 },
  { id: "boteco", x: 78, y: 38 },
  { id: "pizzaria", x: 23, y: 26 },
  { id: "acai", x: 82, y: 76 },
  { id: "burger", x: 38, y: 84 },
  { id: "banheiro", x: 18, y: 82 },
  { id: "node_left", x: 23, y: 58 },
  { id: "node_right", x: 78, y: 58 }
];

const calcWeight = (id1: string, id2: string): number => {
  const n1 = mapNodes.find((n) => n.id === id1)!;
  const n2 = mapNodes.find((n) => n.id === id2)!;
  return Math.sqrt(Math.pow(n2.x - n1.x, 2) + Math.pow(n2.y - n1.y, 2));
};

export const mapEdges: GraphEdge[] = [
  { source: "current", target: "node_left", weight: calcWeight("current", "node_left") },
  { source: "current", target: "node_right", weight: calcWeight("current", "node_right") },
  { source: "current", target: "burger", weight: calcWeight("current", "burger") },
  { source: "node_left", target: "pizzaria", weight: calcWeight("node_left", "pizzaria") },
  { source: "node_left", target: "banheiro", weight: calcWeight("node_left", "banheiro") },
  { source: "node_right", target: "boteco", weight: calcWeight("node_right", "boteco") },
  { source: "node_right", target: "acai", weight: calcWeight("node_right", "acai") },
];