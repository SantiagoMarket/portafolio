"use client";

import { Fragment, useEffect, useState } from "react";
import { typewriterFrame } from "@/lib/typewriter";

type TypedHeadingProps = {
  lines: readonly string[];
};

export default function TypedHeading({ lines }: TypedHeadingProps) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setReducedMotion(true);
      return;
    }

    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const nextElapsed = now - startedAt;
      setElapsedMs(nextElapsed);
      const frame = typewriterFrame({ lines, elapsedMs: nextElapsed });
      if (!frame.done) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [lines]);

  const frame = typewriterFrame({ lines, elapsedMs, reducedMotion });
  const caretLine = lastTypedLine(frame.lines);

  return (
    <h1
      className="font-display font-normal leading-[0.92] tracking-wide break-words mb-1.5 text-[clamp(38px,10.5vw,110px)]"
      style={{ color: "var(--text-1)" }}
      aria-label={lines.join(" ")}
    >
      <span aria-hidden="true">
        {lines.map((line, index) => {
          const text = frame.lines[index] ?? "";
          const caret =
            caretLine === index ? (
              <span className="caret" aria-hidden="true" />
            ) : null;
          const typed =
            index === lines.length - 1 ? (
              <span style={{ color: "var(--burg)" }}>
                {text}
                {caret}
              </span>
            ) : (
              <>
                {text}
                {caret}
              </>
            );

          return (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {typed}
            </Fragment>
          );
        })}
      </span>
    </h1>
  );
}

function lastTypedLine(visible: string[]): number {
  for (let index = visible.length - 1; index >= 0; index -= 1) {
    if (visible[index]) return index;
  }
  return 0;
}
