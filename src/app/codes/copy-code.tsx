"use client";

import { useState } from "react";

export function CopyCode({ code }: { code: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
        } catch {
          /* clipboard blocked; the code is visible on screen anyway */
        }
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="cursor-pointer rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-paper hover:bg-ink/85"
    >
      {done ? "Copied!" : "Copy"}
    </button>
  );
}
