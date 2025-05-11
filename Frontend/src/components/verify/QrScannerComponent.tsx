import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

type QrScannerProps = {
  onScan: (result: string) => void;
};

export const QrScannerComponent = ({ onScan }: QrScannerProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    let animationFrameId: number;
    let stream: MediaStream | null = null;

    const startScan = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          await videoRef.current.play();
          scanFrame();
        }
      } catch (err) {
        setErrorMessage("Camera access denied.");
        console.error(err);
      }
    };

    const scanFrame = () => {
      if (!videoRef.current || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const video = videoRef.current;

      if (video.readyState === video.HAVE_ENOUGH_DATA && context) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code?.data) {
          setScanning(false);
          stream?.getTracks().forEach(track => track.stop());
          onScan(code.data);
          window.location.href = code.data; // Automatically redirect
          return;
        }
      }

      if (scanning) {
        animationFrameId = requestAnimationFrame(scanFrame);
      }
    };

    startScan();

    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
      cancelAnimationFrame(animationFrameId);
      setScanning(false);
    };
  }, [onScan, scanning]);

  return (
    <div className="relative">
      <video ref={videoRef} className="w-full h-96 object-cover bg-black" muted playsInline />
      <canvas ref={canvasRef} className="hidden" />

      {errorMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="bg-white p-4 rounded-lg max-w-xs text-center">
            <p className="text-red-500">{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};
