import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Ambient 3D layer behind the hero: a slowly-breathing particle sphere
 * with mouse parallax + a floating wireframe icosahedron. Colors adapt
 * to theme; the whole canvas is capped at 1.75 dpr for perf.
 */

function ParticleSphere({ dark, scrollRef }) {
  const group = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  const [inner, outer] = useMemo(() => {
    const make = (count, radius, spread) => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const dir = new THREE.Vector3().randomDirection();
        const r = radius + (Math.random() - 0.5) * spread;
        arr[i * 3] = dir.x * r;
        arr[i * 3 + 1] = dir.y * r;
        arr[i * 3 + 2] = dir.z * r;
      }
      return arr;
    };
    return [make(900, 2.1, 0.55), make(500, 3.1, 1.4)];
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, state.pointer.x, 2.2, delta);
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, state.pointer.y, 2.2, delta);

    const scroll = scrollRef?.current ?? 0;
    const t = state.clock.elapsedTime;

    group.current.rotation.y = t * 0.05 + pointer.current.x * 0.25 + scroll * 1.2;
    group.current.rotation.x = Math.sin(t * 0.08) * 0.08 - pointer.current.y * 0.2 + scroll * 0.5;
    const breathe = 1 + Math.sin(t * 0.4) * 0.03 + scroll * 0.25;
    group.current.scale.setScalar(breathe);
  });

  const accent = dark ? '#FB923C' : '#F97316';
  const neutral = dark ? '#57524A' : '#C9C5BF';

  return (
    <group ref={group}>
      <Points positions={inner} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={accent}
          size={0.028}
          sizeAttenuation
          depthWrite={false}
          opacity={dark ? 0.85 : 0.75}
        />
      </Points>
      <Points positions={outer} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={neutral}
          size={0.02}
          sizeAttenuation
          depthWrite={false}
          opacity={dark ? 0.5 : 0.6}
        />
      </Points>
    </group>
  );
}

function WireShape({ dark }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.12;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.08;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} position={[2.6, 0.9, -1.2]} scale={0.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          wireframe
          transparent
          color={dark ? '#FB923C' : '#EA580C'}
          opacity={dark ? 0.35 : 0.28}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene({ dark = false, scrollRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <ParticleSphere dark={dark} scrollRef={scrollRef} />
      <WireShape dark={dark} />
    </Canvas>
  );
}
