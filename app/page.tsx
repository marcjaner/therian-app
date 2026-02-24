"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isRecording) {
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    return () => {
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
      }
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startRecording = async () => {
    if (isRecording) {
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Microphone recording is not supported on this device.");
      return;
    }

    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const chunks: BlobPart[] = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      setCountdown(5);
      setIsRecording(true);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        setIsRecording(false);
        if (stopTimeoutRef.current) {
          clearTimeout(stopTimeoutRef.current);
          stopTimeoutRef.current = null;
        }

        stream.getTracks().forEach((track) => track.stop());
        void new Blob(chunks, { type: "audio/webm" });
        router.push("/result?mock=true");
      };

      recorder.start();
      stopTimeoutRef.current = setTimeout(() => {
        if (recorder.state === "recording") {
          recorder.stop();
        }
      }, 5000);
    } catch {
      setIsRecording(false);
      setError("Microphone permission is required to continue.");
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-black px-6 py-10">
      <section className="flex w-full max-w-[375px] flex-col items-center gap-8 text-center">
        <header className="space-y-2">
          <h1
            className="font-extrabold uppercase leading-none tracking-[0.18em] text-amber"
            style={{ fontSize: "clamp(3rem, 18vw, 4.5rem)" }}
          >
            THERIAN.
          </h1>
          <p className="text-[1.25rem] font-medium text-white">find your animal.</p>
        </header>

        <button
          type="button"
          onClick={startRecording}
          disabled={isRecording}
          className={`flex h-[200px] w-[200px] flex-col items-center justify-center rounded-full border-2 bg-black text-white transition-all ${
            isRecording
              ? "animate-pulse border-amber shadow-[0_0_24px_6px_rgba(255,170,0,0.45)]"
              : "border-white hover:border-amber"
          }`}
          aria-label="Record your voice"
        >
          {isRecording ? (
            <span className="text-[2rem] font-extrabold tracking-[0.08em]">
              {countdown}...
            </span>
          ) : (
            <>
              <span className="text-[3.5rem] leading-none">🐺</span>
              <span className="mt-2 text-[0.78rem] font-bold tracking-[0.22em]">
                TAP TO SPEAK
              </span>
            </>
          )}
        </button>

        <p className="text-sm tracking-[0.08em] text-zinc-400">
          5 seconds. no signup. pure instinct.
        </p>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </section>
    </main>
  );
}
