import { useEffect, useState } from "react";

export type RenderTier = "high" | "low" | "static";

export interface DeviceCapability {
  isMobile: boolean;
  isLowPower: boolean;
  prefersReducedMotion: boolean;
  supportsWebGL: boolean;
  /**
   * - `high`   full-resolution evolving 3D scene
   * - `low`    lighter 3D scene (fewer nodes, capped pixel ratio)
   * - `static` no WebGL: storytelling survives with a CSS-only backdrop
   */
  tier: RenderTier;
}

function detectWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

function computeCapability(): DeviceCapability {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isLowPower: false,
      prefersReducedMotion: false,
      supportsWebGL: true,
      tier: "high",
    };
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isMobile =
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 768;

  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as any).deviceMemory ?? 8;
  const isLowPower = isMobile || cores <= 4 || memory <= 4;

  const supportsWebGL = detectWebGL();

  let tier: RenderTier = "high";
  if (!supportsWebGL || prefersReducedMotion) tier = "static";
  else if (isLowPower) tier = "low";

  return {
    isMobile,
    isLowPower,
    prefersReducedMotion,
    supportsWebGL,
    tier,
  };
}

/**
 * Detects rendering capability once on mount and keeps `prefers-reduced-motion`
 * in sync, so the storytelling degrades gracefully on low-end / accessibility
 * contexts without ever breaking the narrative.
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>(() =>
    computeCapability(),
  );

  useEffect(() => {
    const recompute = () => setCapability(computeCapability());
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    motionQuery.addEventListener("change", recompute);
    return () => motionQuery.removeEventListener("change", recompute);
  }, []);

  return capability;
}
