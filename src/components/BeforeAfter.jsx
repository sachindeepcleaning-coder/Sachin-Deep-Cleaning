import { useState } from 'react';
import { imageDims } from '../lib/image-dims.js';

// Draggable before/after image comparison slider.
export default function BeforeAfter({ before, after, beforeLabel = 'Before', afterLabel = 'After' }) {
  const [pos, setPos] = useState(50);
  const beforeDims = imageDims(before);
  const afterDims = imageDims(after);
  return (
    <div className="ba" style={{ '--pos': pos + '%' }}>
      <img className="ba-img" src={before} alt={beforeLabel} width={beforeDims[0]} height={beforeDims[1]} loading="lazy" decoding="async" />
      <div className="ba-after">
        <img className="ba-img" src={after} alt={afterLabel} width={afterDims[0]} height={afterDims[1]} loading="lazy" decoding="async" />
      </div>
      <span className="ba-label before">{beforeLabel}</span>
      <span className="ba-label after">{afterLabel}</span>
      <div className="ba-handle" />
      <input
        className="ba-range"
        type="range"
        min="0"
        max="100"
        value={pos}
        aria-label="Compare before and after"
        onChange={(e) => setPos(e.target.value)}
      />
    </div>
  );
}
