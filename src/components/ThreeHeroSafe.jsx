import { lazy, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary.jsx';

const ThreeHero = lazy(() => import('./ThreeHero.jsx'));

// Detect WebGL before attempting to mount the 3D canvas. Devices without WebGL
// (or with it disabled/blocklisted) simply skip the canvas and keep the styled
// fallback (.blob) already rendered behind it.
function isWebGLAvailable() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Renders the decorative 3D hero only when WebGL is available, and wraps it in
// an error boundary so any runtime failure can never blank the entire page.
export default function ThreeHeroSafe(props) {
  if (!isWebGLAvailable()) return null;
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <ThreeHero {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
