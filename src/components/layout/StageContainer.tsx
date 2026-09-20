'use client';

import React, { useEffect, useState } from 'react';

interface StageContainerProps {
  children: React.ReactNode;
}

export const StageContainer: React.FC<StageContainerProps> = ({ children }) => {
  const [transform, setTransform] = useState<{
    s: number;
    x: number;
    y: number;
    stageLeft: number;
    stageWidth: number;
    stageHeight: number;
  } | null>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScale = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // Do not recalculate during pinch-zoom
        if (window.visualViewport && window.visualViewport.scale !== 1) {
          return;
        }

        const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;

        // "site tek ekrana sığmak zorunda değil":
        // Do not constrain scale by vh / 1536. Scale horizontally only if vw < 1024.
        const s = Math.min(vw / 1024, 1);
        const X = Math.max(0, (vw - 1024 * s) / 2);
        const Y = 0;
        const stageLeft = -X / s;
        const stageWidth = vw / s;
        const stageHeight = 1536 * s;

        setTransform({ s, x: X, y: Y, stageLeft, stageWidth, stageHeight });
      });
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    window.addEventListener('orientationchange', updateScale);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateScale);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateScale);
      }
    };
  }, []);

  return (
    <div
      className="stage-outer"
      style={
        transform
          ? ({ '--stage-height': `${transform.stageHeight}px` } as React.CSSProperties)
          : undefined
      }
    >
      <div
        className="stage-inner"
        style={
          transform
            ? ({
                '--stage-transform': `translate(${transform.x}px, ${transform.y}px) scale(${transform.s})`,
                '--stage-left': `${transform.stageLeft}px`,
                '--stage-width': `${transform.stageWidth}px`,
                '--stage-scale': `${transform.s}`,
                '--stage-visibility': 'visible',
              } as React.CSSProperties)
            : ({
                '--stage-visibility': 'hidden',
              } as React.CSSProperties)
        }
      >
        {children}
      </div>
    </div>
  );
};



