import React, { useState } from 'react';
import WebcamCapture from './WebcamCapture';
import styles from './Home.module.css';
import { storage, ref, getDownloadURL,uploadBytes } from '../firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const Home = () => {
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [recordedBlob, setRecordedBlob] = useState(null);
  const auth = getAuth();
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleRecordedBlob = (blob) => {
    setRecordedBlob(blob);
  };
  
  const getCurrentUserId = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.uid);
        } else {
          reject(new Error('No user is currently authenticated.'));
        }
      });
    });
  };
  

  const handleUpload = async () => {
    if (file || textInput || recordedBlob) {
      let downloadURL;
  
      const userId = await getCurrentUserId();
  
      if (file) {
        const fileStorageRef = ref(storage, `uploads/${userId}/${file.name}`);
        await uploadBytes(fileStorageRef, file);
        downloadURL = await getDownloadURL(fileStorageRef);
      }
  
      if (textInput) {
        const textStorageRef = ref(storage, `uploads/${userId}/text_${Date.now()}.txt`);
        await uploadBytes(textStorageRef, new Blob([textInput], { type: 'text/plain' }));
        downloadURL = await getDownloadURL(textStorageRef);
      }
  
      if (recordedBlob) {
        const blobStorageRef = ref(storage, `uploads/${userId}/recorded_${Date.now()}.webm`);
        await uploadBytes(blobStorageRef, recordedBlob);
        downloadURL = await getDownloadURL(blobStorageRef);
      }
  
      console.log('File uploaded. Download URL:', downloadURL);
    } else {
      console.log('No option selected for upload.');
    }
  };
  return (
    <div className="main">
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <h3 align="center">Choose an Option:</h3>
          <div className={styles.options}>
            <div>
              <label htmlFor="fileInput" className={styles.optionLabel}>
                Upload File
              </label>
              <input
                type="file"
                id="fileInput"
                accept="audio/*, video/*, .txt"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label htmlFor="textInput" className={styles.optionLabel}>
                Write Text
              </label>
              <textarea
                id="textInput"
                rows="4"
                placeholder="Write your text here"
                onChange={handleTextInputChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="liveCapture" className={styles.optionLabel}>
                Live Capture
              </label>
              <WebcamCapture onBlob={handleRecordedBlob} />
            </div>
          </div>
          <div className={styles.uploadButton}>
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
