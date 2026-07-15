import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function Crystal() {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.25;
      ref.current.rotation.y += dt * 0.35;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshStandardMaterial color="#10b981" roughness={0.25} metalness={0.25} flatShading />
    </mesh>
  );
}

// Lazy-loaded 3D hero. Renders a slowly rotating emerald "clean crystal".
// Mounted via React.lazy so three.js is code-split out of the main bundle.
export default function ThreeHero() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 2]} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 3]} intensity={1.1} />
      <Crystal />
      {!reduce && null}
    </Canvas>
  );
}
