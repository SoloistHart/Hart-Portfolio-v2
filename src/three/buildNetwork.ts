import * as THREE from "three";

export interface NetworkConfig {
  /** Number of ambient "thought" nodes surrounding the journey spine. */
  cloudCount: number;
  /** Max connections per node (keeps the line count bounded). */
  maxDegree: number;
  /** Connection search radius. */
  linkRadius: number;
}

export interface NetworkBuffers {
  // Node (points) attributes
  positions: Float32Array;
  births: Float32Array;
  seeds: Float32Array;
  sizes: Float32Array;
  nodeCount: number;

  // Edge (line segments) attributes
  linePositions: Float32Array;
  lineBirths: Float32Array;
  lineSeeds: Float32Array;
  lineT: Float32Array;
  edgeCount: number;
}

// Deterministic PRNG so the network looks identical across reloads/devices.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SPAN_X = 7.5; // network stretches along X; the camera pans across it

// The journey spine: five milestone nodes that anchor the career arc.
const SPINE = [
  { x: -6.4, y: 0.4 },
  { x: -3.2, y: -0.5 },
  { x: 0.0, y: 0.6 },
  { x: 3.2, y: -0.4 },
  { x: 6.4, y: 0.3 },
];

function birthFromX(x: number): number {
  // Nodes on the left are "born" first, so the network grows as you scroll.
  return Math.min(1, Math.max(0, (x + SPAN_X) / (SPAN_X * 2)));
}

export function buildNetwork(config: NetworkConfig): NetworkBuffers {
  const rand = mulberry32(987654321);
  const { cloudCount, maxDegree, linkRadius } = config;

  type Node = { p: THREE.Vector3; birth: number; size: number; seed: number };
  const nodes: Node[] = [];

  // 1) The bright milestone spine.
  for (let i = 0; i < SPINE.length; i++) {
    const s = SPINE[i];
    nodes.push({
      p: new THREE.Vector3(s.x, s.y, 0),
      birth: birthFromX(s.x),
      size: 2.6,
      seed: rand(),
    });
  }

  // 2) The surrounding cloud of thought nodes.
  for (let i = 0; i < cloudCount; i++) {
    const x = (rand() * 2 - 1) * SPAN_X;
    const falloff = 1 - Math.min(1, Math.abs(x) / (SPAN_X * 1.1)) * 0.25;
    const y = (rand() * 2 - 1) * 3.4 * falloff;
    const z = (rand() * 2 - 1) * 3.0;
    const noise = (rand() - 0.5) * 0.12;
    nodes.push({
      p: new THREE.Vector3(x, y, z),
      birth: Math.min(1, Math.max(0, birthFromX(x) + noise)),
      size: 0.7 + rand() * 0.9,
      seed: rand(),
    });
  }

  // 3) "Unfinished" future nodes that only ever flicker faintly at the edge.
  for (let i = 0; i < Math.max(8, cloudCount * 0.03); i++) {
    const x = SPAN_X * (0.85 + rand() * 0.4);
    const y = (rand() * 2 - 1) * 3.2;
    const z = (rand() * 2 - 1) * 2.6;
    nodes.push({
      p: new THREE.Vector3(x, y, z),
      birth: 1.08 + rand() * 0.1, // never fully reached -> stays a ghost
      size: 0.6 + rand() * 0.5,
      seed: rand(),
    });
  }

  const nodeCount = nodes.length;
  const positions = new Float32Array(nodeCount * 3);
  const births = new Float32Array(nodeCount);
  const seeds = new Float32Array(nodeCount);
  const sizes = new Float32Array(nodeCount);

  for (let i = 0; i < nodeCount; i++) {
    const n = nodes[i];
    positions[i * 3] = n.p.x;
    positions[i * 3 + 1] = n.p.y;
    positions[i * 3 + 2] = n.p.z;
    births[i] = n.birth;
    seeds[i] = n.seed;
    sizes[i] = n.size;
  }

  // 4) Edges via a bounded nearest-neighbour pass.
  const linePos: number[] = [];
  const lineBirth: number[] = [];
  const lineSeed: number[] = [];
  const lineT: number[] = [];
  const r2 = linkRadius * linkRadius;

  for (let i = 0; i < nodeCount; i++) {
    let degree = 0;
    for (let j = i + 1; j < nodeCount && degree < maxDegree; j++) {
      const a = nodes[i].p;
      const b = nodes[j].p;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dz = a.z - b.z;
      const dist2 = dx * dx + dy * dy + dz * dz;
      if (dist2 > r2) continue;

      const birth = Math.max(nodes[i].birth, nodes[j].birth);
      const seed = (nodes[i].seed + nodes[j].seed) * 0.5;

      linePos.push(a.x, a.y, a.z, b.x, b.y, b.z);
      lineBirth.push(birth, birth);
      lineSeed.push(seed, seed);
      lineT.push(0, 1);
      degree++;
    }
  }

  return {
    positions,
    births,
    seeds,
    sizes,
    nodeCount,
    linePositions: new Float32Array(linePos),
    lineBirths: new Float32Array(lineBirth),
    lineSeeds: new Float32Array(lineSeed),
    lineT: new Float32Array(lineT),
    edgeCount: lineT.length / 2,
  };
}
