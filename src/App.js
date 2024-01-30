import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import PreviousUpload from './components/Previousupload';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const isLoggedin = window.localStorage.getItem('isLoggedin');
  const hereuser = window.localStorage.getItem('usernameis');
  const logout = () => {
    window.localStorage.removeItem('isLoggedin');
    window.localStorage.removeItem('usernameis');
    setCurrentUser(null);
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <h4 className="navbar-item">Hate Speech Detection</h4>
            </div>
            <div className="navbar-menu">
              {isLoggedin ? (
                <>
                  <div style={{ color: 'aliceblue', marginRight: '15px' }}>
                    {`Welcome, ${hereuser}`}
                  </div>
                  <div>
                    <Link to="/logout" className="nav-item nav-link btn btn-dark mx-2" onClick={logout}>
                      Logout
                    </Link>
                  </div>
                  <div>
                    <Link to="/previousupload" className="nav-item nav-link btn btn-dark mx-2">
                      Previous Uploads
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Link to="/login" className="nav-item nav-link btn btn-dark mx-2">
                      Login
                    </Link>
                  </div>
                  <div>
                    <Link to="/register" className="nav-item nav-link btn btn-dark mx-2">
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
            <Route path="/logout" element={<Navigate to="/" />} />
            <Route path="/" element={<Home presentUser={currentUser} />} />
            <Route
              path="/previousupload"
              element={currentUser ? <PreviousUpload presentUser={currentUser} /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
