export type TypewriterFrame = {
  lines: string[];
  done: boolean;
};

type TypewriterInput = {
  lines: readonly string[];
  elapsedMs: number;
  reducedMotion?: boolean;
  msPerChar?: number;
};

const DEFAULT_MS_PER_CHAR = 75;

export function typewriterFrame({
  lines,
  elapsedMs,
  reducedMotion = false,
  msPerChar = DEFAULT_MS_PER_CHAR,
}: TypewriterInput): TypewriterFrame {
  if (reducedMotion) {
    return { lines: [...lines], done: true };
  }

  const total = lines.reduce((count, line) => count + line.length, 0);
  const typed = Math.min(total, Math.floor(Math.max(0, elapsedMs) / msPerChar));

  let remaining = typed;
  const visible = lines.map((line) => {
    const take = Math.min(line.length, remaining);
    remaining -= take;
    return line.slice(0, take);
  });

  return { lines: visible, done: typed >= total };
}
