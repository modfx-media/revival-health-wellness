"use client";

import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/**
 * Real-time WebGL human figure that morphs from "fat" to "slim".
 * `leanRef` carries a 0 (fat) → 1 (lean) value, updated outside React's
 * render cycle so the scene animates without re-rendering.
 */
function Figure({ leanRef }: { leanRef: MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Mesh>(null);
  const belly = useRef<THREE.Mesh>(null);
  const hips = useRef<THREE.Mesh>(null);
  const thighL = useRef<THREE.Mesh>(null);
  const thighR = useRef<THREE.Mesh>(null);
  const armL = useRef<THREE.Mesh>(null);
  const armR = useRef<THREE.Mesh>(null);
  const current = useRef(0);

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c9a96e",
        metalness: 0.55,
        roughness: 0.32,
        emissive: new THREE.Color("#3a2912"),
        emissiveIntensity: 0.35,
      }),
    [],
  );

  useFrame((state, delta) => {
    const target = leanRef.current;
    current.current += (target - current.current) * Math.min(1, delta * 2.5);
    const lean = current.current;

    const torsoW = THREE.MathUtils.lerp(1.55, 1.0, lean);
    const torsoZ = THREE.MathUtils.lerp(1.75, 1.0, lean);
    if (torso.current) {
      torso.current.scale.set(torsoW, 1, torsoZ);
    }
    if (belly.current) {
      const b = THREE.MathUtils.lerp(1.6, 0.62, lean);
      belly.current.scale.set(b, b * 0.85, b * 1.05);
    }
    if (hips.current) {
      const h = THREE.MathUtils.lerp(1.4, 1.0, lean);
      hips.current.scale.set(h, 1, h * 1.1);
    }
    const limb = THREE.MathUtils.lerp(1.4, 1.0, lean);
    [thighL, thighR, armL, armR].forEach((r) => {
      if (r.current) r.current.scale.set(limb, 1, limb);
    });

    if (group.current) {
      group.current.rotation.y += delta * 0.5;
      group.current.position.y =
        -0.1 + Math.sin(state.clock.elapsedTime * 1.1) * 0.04;
    }
  });

  return (
    <group ref={group}>
      {/* Head */}
      <mesh material={mat} position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
      </mesh>
      {/* Neck */}
      <mesh material={mat} position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.13, 0.22, 24]} />
      </mesh>
      {/* Chest / torso */}
      <mesh ref={torso} material={mat} position={[0, 0.72, 0]} castShadow>
        <capsuleGeometry args={[0.34, 0.5, 8, 24]} />
      </mesh>
      {/* Belly (the part that shrinks the most) */}
      <mesh ref={belly} material={mat} position={[0, 0.28, 0.05]} castShadow>
        <sphereGeometry args={[0.36, 32, 32]} />
      </mesh>
      {/* Hips */}
      <mesh ref={hips} material={mat} position={[0, -0.02, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.18, 8, 24]} />
      </mesh>
      {/* Shoulders */}
      <mesh
        material={mat}
        position={[0, 1.0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <capsuleGeometry args={[0.16, 0.62, 8, 20]} />
      </mesh>
      {/* Arms */}
      <mesh
        ref={armL}
        material={mat}
        position={[-0.5, 0.55, 0]}
        rotation={[0, 0, 0.12]}
        castShadow
      >
        <capsuleGeometry args={[0.11, 0.95, 8, 20]} />
      </mesh>
      <mesh
        ref={armR}
        material={mat}
        position={[0.5, 0.55, 0]}
        rotation={[0, 0, -0.12]}
        castShadow
      >
        <capsuleGeometry args={[0.11, 0.95, 8, 20]} />
      </mesh>
      {/* Legs */}
      <mesh ref={thighL} material={mat} position={[-0.18, -0.75, 0]} castShadow>
        <capsuleGeometry args={[0.15, 1.05, 8, 20]} />
      </mesh>
      <mesh ref={thighR} material={mat} position={[0.18, -0.75, 0]} castShadow>
        <capsuleGeometry args={[0.15, 1.05, 8, 20]} />
      </mesh>
      {/* Feet */}
      <mesh material={mat} position={[-0.18, -1.42, 0.06]} castShadow>
        <boxGeometry args={[0.2, 0.12, 0.4]} />
      </mesh>
      <mesh material={mat} position={[0.18, -1.42, 0.06]} castShadow>
        <boxGeometry args={[0.2, 0.12, 0.4]} />
      </mesh>
    </group>
  );
}

export default function BodyModel3D({
  leanRef,
}: {
  leanRef: MutableRefObject<number>;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, 4.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.4}
        color="#fff4dd"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-4, 1, 3]} intensity={30} color="#c9a96e" />
      <pointLight position={[3, -2, -4]} intensity={20} color="#8a5a2b" />

      <Figure leanRef={leanRef} />

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.5}
        scale={6}
        blur={2.6}
        far={3}
        color="#000000"
      />
    </Canvas>
  );
}
