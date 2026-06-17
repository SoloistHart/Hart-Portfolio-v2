import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { NeuralNetwork } from "./NeuralNetwork";
import { Centerpiece } from "./Centerpiece";
import { scrollStore } from "../store/scroll";
import { pointer } from "./pointer";
import type { RenderTier } from "../hooks/useDeviceCapability";

/**
 * Gently orbits and dollies the camera around the centerpiece as the story
 * progresses, so the scene continuously transforms (instead of text scrolling
 * past a static backdrop).
 */
function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const p = scrollStore.progress;
    const damp = 1 - Math.pow(0.0016, delta);

    const radius = 9.6 - Math.sin(p * Math.PI) * 1.4; // dolly in mid-journey
    const angle = (p - 0.5) * 0.7 + pointer.x * 0.28; // orbit with scroll + mouse

    const desiredX = Math.sin(angle) * radius;
    const desiredZ = Math.cos(angle) * radius;
    const desiredY = -pointer.y * 0.5 + Math.sin(p * Math.PI) * 0.5;

    camera.position.x += (desiredX - camera.position.x) * damp;
    camera.position.y += (desiredY - camera.position.y) * damp;
    camera.position.z += (desiredZ - camera.position.z) * damp;

    target.current.set(0, 0, 0);
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

  const quality = tier === "high" ? "high" : "low";

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        gl={{
          antialias: tier === "high",
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={tier === "high" ? [1, 2] : [1, 1.5]}
        camera={{ position: [0, 0, 9.6], fov: 55, near: 0.1, far: 100 }}
      >
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 11, 24]} />
        <CameraRig />
        <Centerpiece quality={quality} />
        <NeuralNetwork quality={quality} />
      </Canvas>
    </div>
  );
}

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
