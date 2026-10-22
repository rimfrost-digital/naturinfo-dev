"use client";

import { useRef, useState, type MouseEvent } from "react";
import { Pause, Play } from "lucide-react";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

export function GuideAudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const progress = duration > 0 ? (elapsed / duration) * 100 : 0;

  function arm() {
    const audio = audioRef.current;
    if (!audio || audio.src) return audio;
    audio.src = src;
    audio.preload = "metadata";
    return audio;
  }

  function toggle() {
    const audio = arm();
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }

  function seek(event: MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration || !audio.src) return;
    const rect = event.currentTarget.getBoundingClientRect();
    audio.currentTime = ((event.clientX - rect.left) / rect.width) * duration;
  }

  return (
    <div className="flex w-full items-center gap-5 rounded-2xl bg-forest/5 px-5 py-4 sm:px-6">
      <audio
        ref={audioRef}
        preload="none"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)}
        onEnded={() => {
          setPlaying(false);
          setElapsed(0);
        }}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausa guiden" : "Spela upp guiden"}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest text-paper transition-transform hover:scale-105"
      >
        {playing ? (
          <Pause className="h-6 w-6" fill="currentColor" />
        ) : (
          <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
        )}
      </button>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <span className="font-serif text-lg font-medium text-forest sm:text-xl">{title}</span>
          <span className="font-mono text-xs text-moss tabular-nums sm:text-sm">
            {formatTime(elapsed)} / {duration > 0 ? formatTime(duration) : "--:--"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            role="progressbar"
            aria-valuenow={Math.round(elapsed)}
            aria-valuemin={0}
            aria-valuemax={Math.round(duration) || 0}
            aria-label={title}
            onClick={seek}
            className="relative h-1.5 flex-1 cursor-pointer overflow-hidden rounded-full bg-moss/25"
          >
            <div className="absolute inset-y-0 left-0 rounded-full bg-brass" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex h-5 items-end gap-0.5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((index) => (
              <span
                key={index}
                className="block w-0.5 rounded-full bg-brass"
                style={{
                  height: playing ? undefined : "30%",
                  animation: playing ? `soundwave 0.9s ease-in-out ${index * 0.12}s infinite` : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
