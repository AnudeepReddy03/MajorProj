import React, { useState, useRef } from 'react';

const WebcamCapture = ({ onBlob }) => {
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordAudioOnly, setRecordAudioOnly] = useState(false);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: !recordAudioOnly,
        audio: true,
      });

      setMediaStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing camera and microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach(track => track.stop());
      setMediaStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      const blob = new Blob([event.data], { type: recordAudioOnly ? 'audio/wav' : 'video/webm' });
      setRecordedBlob(blob);
      if (onBlob) {
        onBlob(blob);
      }
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={recordAudioOnly}
          onChange={() => setRecordAudioOnly(!recordAudioOnly)}
        />
        Record Audio Only
      </label>
      {recordedBlob ? (
        <div>
          <h3>Recorded {recordAudioOnly ? 'Audio' : 'Video'}</h3>
          {recordAudioOnly ? (
            <audio controls src={URL.createObjectURL(recordedBlob)} />
          ) : (
            <video controls width="300" src={URL.createObjectURL(recordedBlob)} />
          )}
        </div>
      ) : (
        <div>
          <video ref={videoRef} autoPlay playsInline muted={!recordAudioOnly} style={{ maxWidth: '100%' }} />
        </div>
      )}
      <div>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
      </div>
    </div>
  );
};

export default WebcamCapture;
