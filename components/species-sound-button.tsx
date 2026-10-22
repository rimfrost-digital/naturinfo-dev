"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export function SpeciesSoundButton({ src, label }: { src: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
      return;
    }
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.preload = "metadata";
      audio.addEventListener("ended", () => setPlaying(false));
      audioRef.current = audio;
    }
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? `Pausa: ${label}` : label}
      className="inline-flex items-center gap-2.5 rounded-full bg-brass py-2 pr-4 pl-2 text-sm font-medium text-forest-deep shadow-sm transition-all hover:bg-[#c9a666] hover:shadow-md"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-paper">
        {playing ? (
          <span className="flex items-end gap-[2px]" aria-hidden="true">
            <span className="h-2 w-[2.5px] animate-[soundwave_0.9s_ease-in-out_infinite] rounded-full bg-forest-deep" />
            <span className="h-3 w-[2.5px] animate-[soundwave_0.9s_ease-in-out_0.15s_infinite] rounded-full bg-forest-deep" />
            <span className="h-1.5 w-[2.5px] animate-[soundwave_0.9s_ease-in-out_0.3s_infinite] rounded-full bg-forest-deep" />
          </span>
        ) : (
          <Play className="h-3 w-3 translate-x-px" fill="currentColor" aria-hidden="true" />
        )}
      </span>
      {playing ? "Pausa" : label}
    </button>
  );
}
