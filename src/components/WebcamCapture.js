import React, { useState, useRef } from 'react';

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera and microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  return (
    <div>
      <h2>Webcam Capture</h2>
      <video ref={videoRef} autoPlay playsInline muted style={{ maxWidth: '100%' }} />
      <div>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
      </div>
    </div>
  );
};

export default WebcamCapture;
