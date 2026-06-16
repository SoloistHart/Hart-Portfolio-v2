import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildNetwork } from "./buildNetwork";
import { scrollStore } from "../store/scroll";

const COLOR_CURIOSITY = new THREE.Color("#38bdf8");
const COLOR_SYSTEMS = new THREE.Color("#818cf8");
const COLOR_IMPACT = new THREE.Color("#fb923c");

const pointVertex = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSizeScale;
  attribute float aBirth;
  attribute float aSeed;
  attribute float aSize;
  varying float vActive;

  void main() {
    float active = smoothstep(aBirth - 0.07, aBirth + 0.02, uProgress);
    vActive = active;

    vec3 pos = position;
    pos.x += sin(uTime * 0.3 + aSeed * 6.2831) * 0.05;
    pos.y += cos(uTime * 0.24 + aSeed * 6.2831) * 0.05;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float twinkle = 0.75 + 0.25 * sin(uTime * 1.6 + aSeed * 24.0);
    float size = uSizeScale * aSize * (0.35 + active) * twinkle;
    gl_PointSize = size * uPixelRatio * (300.0 / max(0.001, -mvPosition.z));
  }
`;

const pointFragment = /* glsl */ `
  precision mediump float;
  uniform float uProgress;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying float vActive;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);

    vec3 col = mix(uColorA, uColorB, smoothstep(0.12, 0.58, uProgress));
    col = mix(col, uColorC, smoothstep(0.6, 0.95, uProgress));

    float alpha = glow * (0.12 + vActive * 0.88);
    gl_FragColor = vec4(col * (0.7 + glow * 0.6), alpha);
  }
`;

const lineVertex = /* glsl */ `
  uniform float uProgress;
  attribute float aBirth;
  attribute float aT;
  varying float vActive;
  varying float vT;

  void main() {
    vActive = smoothstep(aBirth, aBirth + 0.05, uProgress);
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lineFragment = /* glsl */ `
  precision mediump float;
  uniform float uProgress;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying float vActive;
  varying float vT;

  void main() {
    if (vActive <= 0.001) discard;

    vec3 col = mix(uColorA, uColorB, smoothstep(0.12, 0.58, uProgress));
    col = mix(col, uColorC, smoothstep(0.6, 0.95, uProgress));

    // Data flow: a pulse travels along each edge, strongest in the systems stage.
    float flowStage =
      smoothstep(0.32, 0.5, uProgress) * (1.0 - smoothstep(0.86, 1.0, uProgress));
    float p = fract(vT - uTime * 0.22);
    float pulse =
      smoothstep(0.0, 0.06, p) * (1.0 - smoothstep(0.06, 0.16, p));

    float base = 0.05 * vActive;
    float intensity = base + pulse * 0.85 * flowStage * vActive;
    gl_FragColor = vec4(col, intensity);
  }
`;

interface NeuralNetworkProps {
  /** "high" renders the full cloud; "low" thins it out for weaker devices. */
  quality: "high" | "low";
}

export function NeuralNetwork({ quality }: NeuralNetworkProps) {
  const { gl } = useThree();
  const pointsMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const linesMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pixelRatio = Math.min(gl.getPixelRatio(), quality === "high" ? 2 : 1.5);

  const { points, lines } = useMemo(() => {
    const data = buildNetwork(
      quality === "high"
        ? { cloudCount: 1100, maxDegree: 3, linkRadius: 1.5 }
        : { cloudCount: 380, maxDegree: 2, linkRadius: 1.7 },
    );

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(data.positions, 3),
    );
    pointGeo.setAttribute("aBirth", new THREE.BufferAttribute(data.births, 1));
    pointGeo.setAttribute("aSeed", new THREE.BufferAttribute(data.seeds, 1));
    pointGeo.setAttribute("aSize", new THREE.BufferAttribute(data.sizes, 1));

    const pointMat = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uSizeScale: { value: quality === "high" ? 7.0 : 6.0 },
        uColorA: { value: COLOR_CURIOSITY },
        uColorB: { value: COLOR_SYSTEMS },
        uColorC: { value: COLOR_IMPACT },
      },
      vertexShader: pointVertex,
      fragmentShader: pointFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(data.linePositions, 3),
    );
    lineGeo.setAttribute(
      "aBirth",
      new THREE.BufferAttribute(data.lineBirths, 1),
    );
    lineGeo.setAttribute("aT", new THREE.BufferAttribute(data.lineT, 1));

    const lineMat = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uColorA: { value: COLOR_CURIOSITY },
        uColorB: { value: COLOR_SYSTEMS },
        uColorC: { value: COLOR_IMPACT },
      },
      vertexShader: lineVertex,
      fragmentShader: lineFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    pointsMatRef.current = pointMat;
    linesMatRef.current = lineMat;

    return {
      points: new THREE.Points(pointGeo, pointMat),
      lines: new THREE.LineSegments(lineGeo, lineMat),
    };
  }, [quality, pixelRatio]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const progress = scrollStore.progress;

    if (pointsMatRef.current) {
      pointsMatRef.current.uniforms.uTime.value = t;
      pointsMatRef.current.uniforms.uProgress.value = progress;
    }
    if (linesMatRef.current) {
      linesMatRef.current.uniforms.uTime.value = t;
      linesMatRef.current.uniforms.uProgress.value = progress;
    }
    if (groupRef.current) {
      // Slow drift gives the ecosystem a sense of being alive.
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.05;
      groupRef.current.rotation.x = Math.cos(t * 0.04) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={points} />
      <primitive object={lines} />
    </group>
  );
}
