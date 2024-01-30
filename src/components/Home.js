// Home.js
import React, { useState } from 'react';
import WebcamCapture from './WebcamCapture'; // Import the WebcamCapture component
import styles from './Home.module.css'; // Import your styles if you have a separate stylesheet

const Home = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log(file);
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
              <textarea id="textInput" rows="4" placeholder="Write your text here"></textarea>
            </div>
            <div>
              <label htmlFor="liveCapture" className={styles.optionLabel}>
                Live Capture
              </label>
              <WebcamCapture />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
