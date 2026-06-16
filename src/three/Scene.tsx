import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { NeuralNetwork } from "./NeuralNetwork";
import { scrollStore } from "../store/scroll";
import type { RenderTier } from "../hooks/useDeviceCapability";

const pointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  });
}

/**
 * Pans the camera across the network as the story progresses, so the visitor
 * feels like they are travelling forward through an evolving system rather than
 * watching a static object spin.
 */
function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const p = scrollStore.progress;
    const damp = 1 - Math.pow(0.0015, delta);

    // Travel left -> right across the growing network.
    const aimX = THREE.MathUtils.lerp(-5.6, 5.6, p);
    // Pull back slightly through systems, then ease in for the human "impact".
    const camZ = 9.5 - Math.sin(p * Math.PI) * 1.6;

    const desiredX = aimX + pointer.x * 0.6;
    const desiredY = -pointer.y * 0.4 + Math.sin(p * Math.PI) * 0.3;

    camera.position.x += (desiredX - camera.position.x) * damp;
    camera.position.y += (desiredY - camera.position.y) * damp;
    camera.position.z += (camZ - camera.position.z) * damp;

    target.current.set(aimX, 0, 0);
    camera.lookAt(target.current);
  });

  return null;
}

interface SceneProps {
  tier: RenderTier;
}

export function Scene({ tier }: SceneProps) {
  if (tier === "static") {
    return <StaticBackdrop />;
  }

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance" }}
        dpr={tier === "high" ? [1, 2] : [1, 1.5]}
        camera={{ position: [-5.6, 0, 9.5], fov: 55, near: 0.1, far: 100 }}
      >
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 10, 22]} />
        <CameraRig />
        <NeuralNetwork quality={tier === "high" ? "high" : "low"} />
      </Canvas>
    </div>
  );
}

/**
 * CSS-only backdrop used when WebGL is unavailable or the visitor prefers
 * reduced motion. The storytelling must survive even without 3D.
 */
function StaticBackdrop() {
  return (
    <div
      className="scene-canvas"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(60% 50% at 20% 20%, rgba(56,189,248,0.18), transparent 60%)," +
          "radial-gradient(55% 45% at 75% 35%, rgba(129,140,248,0.16), transparent 60%)," +
          "radial-gradient(60% 55% at 60% 85%, rgba(251,146,60,0.14), transparent 60%)," +
          "#05060a",
      }}
    />
  );
}
