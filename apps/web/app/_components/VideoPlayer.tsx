"use client";

import { useState } from "react";
import { getGeminiResponse } from "../../lib/llms/gemini";

export default function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const fetchVideo = async () => {
    setLoading(true);
    const code = await getGeminiResponse([], prompt);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      console.error("Failed to fetch video");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
    setLoading(false);
  };

  return (
    <div>
      <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <button onClick={fetchVideo}>create video</button>
      {loading && <p>Rendering video...</p>}
      {videoUrl && (
        <video controls autoPlay className="w-full max-w-xl mt-4">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
