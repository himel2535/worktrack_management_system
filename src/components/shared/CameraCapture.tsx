"use client";

import { useRef, useState, useCallback } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiFetch, API_URL } from "@/lib/api/client";

interface CameraCaptureProps {
  onCapture: (photoUrl: string) => void;
  onClose: () => void;
  label?: string;
}

export function CameraCapture({ onCapture, onClose, label = "Take Photo" }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      alert("Camera permission denied. Work session will continue without photo.");
      onClose();
    }
  }, [onClose]);

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    setPreview(canvas.toDataURL("image/jpeg", 0.8));
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
  };

  const upload = async () => {
    if (!preview) return;
    setUploading(true);
    try {
      const blob = await fetch(preview).then((r) => r.blob());
      const formData = new FormData();
      formData.append("photo", blob, "work-photo.jpg");
      const token = localStorage.getItem("worktrack_token");
      const res = await fetch(`${API_URL}/upload/photo`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      onCapture(data.url);
      onClose();
    } catch {
      onCapture(preview);
      onClose();
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="panel-card w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white">{label}</h3>
          <button onClick={() => { stream?.getTracks().forEach((t) => t.stop()); onClose(); }}><X className="h-5 w-5 text-white/60" /></button>
        </div>
        {!stream && !preview && (
          <Button onClick={startCamera} className="w-full"><Camera className="h-4 w-4 mr-2" /> Open Camera</Button>
        )}
        {stream && !preview && (
          <>
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-xl" />
            <Button onClick={capture} className="w-full">Capture Photo</Button>
          </>
        )}
        {preview && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="w-full rounded-xl" />
            <div className="flex gap-2">
              <Button onClick={upload} disabled={uploading} className="flex-1">{uploading ? "Uploading..." : "Confirm & Continue"}</Button>
              <Button variant="glass" onClick={() => { setPreview(null); startCamera(); }}>Retake</Button>
            </div>
          </>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
