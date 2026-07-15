import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

// ---------------------------------------------------------------------------
// Design intent: a real person mopping inside a real Gurugram home, not a
// spinning mascot in a void. The room is what sells "home" — a warm wood
// floor, a wall, and a window with Gurugram's Cyber City skyline at dusk.
// The figure has a working two-segment arm so the mop stroke reads as a
// real cleaning motion (push-pull + weight shift), not a prop waving.
//
// Restrained palette (6 tones total):
//   Figure:  #e6ded3 (skin/limbs), #3b4a54 (uniform), #10b981 (emerald trim)
//   Room:    #b98a5a (wood floor), #f2ede3 (wall), #2b3b52 (dusk skyline)
// ---------------------------------------------------------------------------

const SKIN = '#e6ded3';
const UNIFORM = '#3b4a54';
const ACCENT = '#10b981';
const FLOOR = '#b98a5a';
const FLOOR_DARK = '#a67a4a';
const WALL = '#f2ede3';
const SKYLINE = '#2b3b52';
const SKYLINE_LIGHT = '#3d5570';

const mat = (color, opts = {}) => (
  <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} flatShading {...opts} />
);

// -------------------------- Room: floor, wall, skyline window --------------
function Room() {
  const towers = [
    { x: -1.9, w: 0.5, h: 1.6, c: SKYLINE },
    { x: -1.2, w: 0.35, h: 1.1, c: SKYLINE_LIGHT },
    { x: -0.6, w: 0.55, h: 2.0, c: SKYLINE },
    { x: 0.1, w: 0.4, h: 1.3, c: SKYLINE_LIGHT },
    { x: 0.7, w: 0.5, h: 1.8, c: SKYLINE },
    { x: 1.4, w: 0.35, h: 1.0, c: SKYLINE_LIGHT },
    { x: 2.0, w: 0.45, h: 1.5, c: SKYLINE },
  ];

  return (
    <group>
      {/* floor: two-tone wood planks */}
      <mesh position={[0, -0.98, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 6]} />
        {mat(FLOOR)}
      </mesh>
      {[-3, -2, -1, 0, 1, 2, 3].map((z, i) => (
        <mesh key={z} position={[0, -0.975, z * 0.85]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[9, 0.04]} />
          {mat(i % 2 === 0 ? FLOOR_DARK : FLOOR)}
        </mesh>
      ))}

      {/* back wall */}
      <mesh position={[0, 1.6, -2.4]}>
        <boxGeometry args={[9, 5.2, 0.1]} />
        {mat(WALL)}
      </mesh>

      {/* window frame */}
      <mesh position={[1.7, 1.7, -2.34]}>
        <boxGeometry args={[2.7, 2.0, 0.08]} />
        {mat('#ffffff', { roughness: 0.9 })}
      </mesh>
      {/* window glass / sky */}
      <mesh position={[1.7, 1.7, -2.3]}>
        <planeGeometry args={[2.5, 1.8]} />
        <meshStandardMaterial color="#7a8fa8" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Gurugram skyline silhouette in the window */}
      <group position={[1.7, 1.05, -2.28]}>
        {towers.map((t, i) => (
          <mesh key={i} position={[t.x * 0.42, t.h / 2, 0]}>
            <boxGeometry args={[t.w * 0.42, t.h * 0.55, 0.03]} />
            {mat(t.c)}
          </mesh>
        ))}
      </group>
      {/* window cross-bars */}
      <mesh position={[1.7, 1.7, -2.28]}>
        <boxGeometry args={[2.5, 0.06, 0.05]} />
        {mat('#ffffff')}
      </mesh>
      <mesh position={[1.7, 1.7, -2.28]}>
        <boxGeometry args={[0.06, 1.8, 0.05]} />
        {mat('#ffffff')}
      </mesh>
    </group>
  );
}

// -------------------------- The mop's clean-streak trail --------------------
// Signature detail: a soft gleam sweeps the floor just behind the mop head,
// reading as "just cleaned" rather than a generic sparkle effect.
function CleanStreak({ mopRef }) {
  const streak = useRef();
  useFrame((state) => {
    if (!mopRef.current || !streak.current) return;
    const worldPos = mopRef.current.getWorldPosition(streak.current.position);
    streak.current.position.y = -0.97;
    const pulse = (Math.sin(state.clock.elapsedTime * 1.8) + 1) / 2;
    streak.current.material.opacity = 0.15 + pulse * 0.25;
  });
  return (
    <mesh ref={streak} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.4, 20]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.2} roughness={0.2} metalness={0.3} />
    </mesh>
  );
}

// -------------------------- Cleaner figure ----------------------------------
function Cleaner({ animate }) {
  const hips = useRef();
  const upperArmR = useRef();
  const forearmR = useRef();
  const upperArmL = useRef();
  const head = useRef();
  const mopHead = useRef();

  useFrame((state) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    const stroke = Math.sin(t * 1.6); // -1..1 mop push/pull cycle

    // weight shifts side to side with the stroke, like real mopping
    if (hips.current) {
      hips.current.position.x = stroke * 0.12;
      hips.current.rotation.z = stroke * 0.05;
      hips.current.position.y = Math.abs(Math.sin(t * 3.2)) * 0.015;
    }
    // right (working) arm drives the mop: shoulder swings, elbow follows
    if (upperArmR.current) upperArmR.current.rotation.x = 0.25 + stroke * 0.35;
    if (forearmR.current) forearmR.current.rotation.x = 0.5 + stroke * 0.25;
    // left arm braces lightly on the mop handle, smaller counter-motion
    if (upperArmL.current) upperArmL.current.rotation.x = 0.15 - stroke * 0.15;
    // head glances down toward the floor being cleaned, slight side tracking
    if (head.current) head.current.rotation.y = stroke * 0.12;
  });

  return (
    <group position={[-0.6, 0.02, 0.6]} rotation={[0, 0.35, 0]}>
      <group ref={hips}>
        {/* legs (slightly staggered stance) */}
        <mesh position={[-0.16, -0.62, 0.05]} rotation={[0.05, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.09, 0.72, 10]} />
          {mat(UNIFORM)}
        </mesh>
        <mesh position={[0.16, -0.62, -0.05]} rotation={[-0.05, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.09, 0.72, 10]} />
          {mat(UNIFORM)}
        </mesh>
        {/* feet */}
        <mesh position={[-0.16, -1.0, 0.12]}>
          <boxGeometry args={[0.14, 0.08, 0.26]} />
          {mat('#2a2a2a')}
        </mesh>
        <mesh position={[0.16, -1.0, -0.02]}>
          <boxGeometry args={[0.14, 0.08, 0.26]} />
          {mat('#2a2a2a')}
        </mesh>

        {/* torso / uniform */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.62, 0.78, 0.34]} />
          {mat(UNIFORM)}
        </mesh>
        {/* apron accent */}
        <mesh position={[0, -0.1, 0.18]}>
          <boxGeometry args={[0.5, 0.5, 0.02]} />
          {mat(ACCENT)}
        </mesh>
        {/* collar trim */}
        <mesh position={[0, 0.38, 0.15]}>
          <boxGeometry args={[0.64, 0.06, 0.05]} />
          {mat(ACCENT)}
        </mesh>

        {/* neck + head */}
        <mesh position={[0, 0.46, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.1, 8]} />
          {mat(SKIN)}
        </mesh>
        <group ref={head} position={[0, 0.66, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.22, 16, 12]} />
            {mat(SKIN)}
          </mesh>
          {/* simple side-parted hair cap */}
          <mesh position={[0, 0.1, -0.02]}>
            <sphereGeometry args={[0.225, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.9]} />
            {mat('#2f2a26')}
          </mesh>
        </group>

        {/* left arm: shoulder -> upper arm -> forearm, hand resting on handle */}
        <group position={[-0.36, 0.32, 0]}>
          <group ref={upperArmL} rotation={[0.15, 0, 0.1]}>
            <mesh position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.075, 0.07, 0.42, 8]} />
              {mat(SKIN)}
            </mesh>
            <group position={[0, -0.42, 0]} rotation={[0.3, 0, 0]}>
              <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.065, 0.06, 0.4, 8]} />
                {mat(SKIN)}
              </mesh>
            </group>
          </group>
        </group>

        {/* right (working) arm driving the mop */}
        <group position={[0.36, 0.32, 0]}>
          <group ref={upperArmR} rotation={[0.25, 0, -0.15]}>
            <mesh position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.075, 0.07, 0.42, 8]} />
              {mat(SKIN)}
            </mesh>
            <group ref={forearmR} position={[0, -0.42, 0]} rotation={[0.5, 0, 0]}>
              <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.065, 0.06, 0.4, 8]} />
                {mat(SKIN)}
              </mesh>
              {/* hand */}
              <mesh position={[0, -0.42, 0]}>
                <sphereGeometry args={[0.07, 10, 8]} />
                {mat(SKIN)}
              </mesh>

              {/* mop, held by the working hand */}
              <group position={[0, -0.42, 0]} rotation={[0.1, 0, 0.05]}>
                <mesh position={[0, -0.55, 0]}>
                  <cylinderGeometry args={[0.035, 0.035, 1.5, 8]} />
                  {mat('#d8cdb8')}
                </mesh>
                <mesh ref={mopHead} position={[0, -1.28, 0]}>
                  <sphereGeometry args={[0.16, 12, 10]} />
                  {mat(ACCENT)}
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* bucket, parked beside the working area */}
      <group position={[0.75, -0.78, 0.3]}>
        <mesh>
          <cylinderGeometry args={[0.24, 0.19, 0.34, 14]} />
          {mat('#4c5a63')}
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.245, 0.245, 0.02, 14]} />
          {mat('#3b4a54')}
        </mesh>
        <mesh position={[0, 0.32, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.24, 0.02, 6, 12, Math.PI]} />
          {mat('#2a2a2a')}
        </mesh>
      </group>

      <CleanStreak mopRef={mopHead} />
    </group>
  );
}

// -------------------------- Scene root --------------------------------------
// Lazy-loaded 3D hero: a person mopping inside a Gurugram home, with the
// city's own skyline visible through the window to ground the "Gurugram"
// part of the brief without saying it in text.
export default function ThreeHero() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      shadows
      camera={{ position: [1.4, 0.9, 3.6], fov: 42 }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
    >
      <ambientLight intensity={0.55} />
      {/* warm interior key light */}
      <directionalLight position={[-2, 3, 2]} intensity={0.9} color="#fff1d6" castShadow />
      {/* cool daylight bounce from the window side */}
      <directionalLight position={[3, 2, -1]} intensity={0.35} color="#bcd3e8" />
      <Room />
      <Cleaner animate={!reduce} />
    </Canvas>
  );
}