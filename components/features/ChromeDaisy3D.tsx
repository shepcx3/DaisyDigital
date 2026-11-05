"use client";

import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** Chrome reflections from a generated studio room (no downloaded HDR files). */
function addStudioEnv({ gl, scene }: RootState) {
  const pmrem = new THREE.PMREMGenerator(gl);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
}

function Daisy({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const petals = 10;

  const chrome = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#f3f1ff", metalness: 1, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.25 }), []);
  const lilac = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#c9b6f0", metalness: 0.9, roughness: 0.2, iridescence: 1, iridescenceIOR: 1.6 }), []);
  const yolk = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#ffd75e", metalness: 0.6, roughness: 0.25, clearcoat: 1 }), []);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.z += dt * 0.35; // slow spin
    const p = pointer.current ?? { x: 0, y: 0 };
    // tilt toward the mouse (eased)
    g.rotation.x += (-p.y * 0.55 - g.rotation.x) * Math.min(1, dt * 4);
    g.rotation.y += (p.x * 0.55 - g.rotation.y) * Math.min(1, dt * 4);
  });

  return (
    <group ref={group}>
      {Array.from({ length: petals }, (_, i) => {
        const a = (i / petals) * Math.PI * 2;
        return (
          <mesh key={i} material={i % 2 ? lilac : chrome} position={[Math.cos(a) * 1.05, Math.sin(a) * 1.05, i % 2 ? -0.04 : 0]} rotation={[0, 0, a - Math.PI / 2]} scale={[0.36, 0.78, 0.14]}>
            <sphereGeometry args={[1, 40, 24]} />
          </mesh>
        );
      })}
      <mesh material={yolk} position={[0, 0, 0.12]} scale={[0.52, 0.52, 0.3]}>
        <sphereGeometry args={[1, 40, 24]} />
      </mesh>
    </group>
  );
}

/** The 3D hero daisy. Loaded lazily by HeroDaisy, only on capable devices outside calm mode. */
export default function ChromeDaisy3D({ onReady }: { onReady?: () => void }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1 };
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={(state) => {
        addStudioEnv(state);
        onReady?.();
      }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <Daisy pointer={pointer} />
    </Canvas>
  );
}
