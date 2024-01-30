// src/components/Register.js
import React, { useState } from 'react';
import { auth} from '../firebase' 
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();

const handleRegister = async () => {
  try {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('All fields are required. Please fill in all the details.');
    } else if (password === confirmPassword) {
      // Perform registration logic (e.g., send a request to the server)
      await createUserWithEmailAndPassword(auth, username, password);
      // For simplicity, let's assume registration is successful
      setRegistrationSuccess(true);
      // If successful, you can handle the next steps (e.g., redirect or update UI)
    } else {
      alert("Passwords don't match. Please re-enter.");
    }
    setErrorMsg("");
    if(registrationSuccess)
    {
      setSubmitButtonDisabled(true);
      createUserWithEmailAndPassword(auth, username, password)
        .then(async (res) => {
          setSubmitButtonDisabled(false);
          navigate("/");
        })
  }
  } catch (error) {
    console.error('Error registering user:', error.message);
    alert(error.message);
    // Handle registration failure (e.g., show an error message)
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Register</h1>
      <label>
        Email:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <br />
      <label>
        Re-enter Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} required />
      </label>
      <br />
      <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleRegister} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>

      {registrationSuccess && <p style={{color: 'blue'}}>Registration successful!</p>}
    </div>
    </div>
    </div>
  );
};

export default Register;
