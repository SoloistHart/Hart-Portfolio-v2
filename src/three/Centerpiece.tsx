import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "../store/scroll";
import { pointer } from "./pointer";

const COLOR_CURIOSITY = new THREE.Color("#38bdf8");
const COLOR_SYSTEMS = new THREE.Color("#818cf8");
const COLOR_IMPACT = new THREE.Color("#fb923c");

// Ashima 3D simplex noise — used to organically displace the surface.
const NOISE_GLSL = /* glsl */ `
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }
`;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uFreq;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  ${NOISE_GLSL}

  void main() {
    float n = snoise(normal * uFreq + uTime * 0.22);
    float disp = n * uMorph;
    vDisp = n;

    vec3 newPos = position + normal * disp;
    vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uProgress;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  void main() {
    vec3 col = mix(uColorA, uColorB, smoothstep(0.12, 0.58, uProgress));
    col = mix(col, uColorC, smoothstep(0.6, 0.95, uProgress));

    float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.4);
    float energy = 0.5 + 0.5 * sin(vDisp * 7.0 + uTime * 1.4);

    vec3 base = col * (0.12 + 0.45 * energy);
    vec3 rim = col * fres * 2.4;
    vec3 finalCol = base + rim;

    float alpha = clamp(0.5 + fres * 0.6, 0.0, 1.0);
    gl_FragColor = vec4(finalCol, alpha);
  }
`;

interface CenterpieceProps {
  quality: "high" | "low";
}

/**
 * The hero "core": a living, morphing 3D object with a custom material
 * (noise displacement + fresnel rim glow). It reacts to the pointer and
 * transforms with scroll — calm at first, agitated through the systems stage,
 * then settling — so it reads as a character in the story, not wallpaper.
 */
export function Centerpiece({ quality }: CenterpieceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial | null>(null);

  const { geometry, material, wireMaterial } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.7, quality === "high" ? 32 : 12);
    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uMorph: { value: 0.15 },
      uFreq: { value: 1.2 },
      uColorA: { value: COLOR_CURIOSITY },
      uColorB: { value: COLOR_SYSTEMS },
      uColorC: { value: COLOR_IMPACT },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    // A faint wireframe shell sharing the same displacement, for a "constructed"
    // holographic feel.
    const wireMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform float uProgress;
        uniform vec3 uColorA; uniform vec3 uColorB; uniform vec3 uColorC;
        varying float vDisp;
        void main() {
          vec3 col = mix(uColorA, uColorB, smoothstep(0.12, 0.58, uProgress));
          col = mix(col, uColorC, smoothstep(0.6, 0.95, uProgress));
          gl_FragColor = vec4(col, 0.10);
        }
      `,
      transparent: true,
      depthWrite: false,
      wireframe: true,
      blending: THREE.AdditiveBlending,
    });
    matRef.current = mat;
    return { geometry: geo, material: mat, wireMaterial: wireMat };
  }, [quality]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = scrollStore.progress;
    const damp = 1 - Math.pow(0.002, delta);

    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      matRef.current.uniforms.uProgress.value = p;
      // Calm -> agitated (peaks mid-journey) -> settles.
      matRef.current.uniforms.uMorph.value =
        0.12 + 0.32 * Math.sin(Math.min(1, p) * Math.PI);
      matRef.current.uniforms.uFreq.value = 1.1 + p * 1.6;
    }

    for (const m of [meshRef.current, wireRef.current]) {
      if (!m) continue;
      m.rotation.y += delta * 0.12;
      m.rotation.x += (pointer.y * 0.4 - m.rotation.x) * damp;
      m.rotation.z += (pointer.x * 0.2 - m.rotation.z) * damp;
      const s = 1 + p * 0.18;
      m.scale.setScalar(s * (m === wireRef.current ? 1.04 : 1));
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} material={material} />
      <mesh ref={wireRef} geometry={geometry} material={wireMaterial} />
    </group>
  );
}
