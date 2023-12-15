import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Contactstate from './context/contact/Contactstate';
import Authstate from './context/auth/AuthState';
import Alertstate from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token)
 }


const App = () => {
  return (
    <Authstate>
    <Contactstate>
      <Alertstate>
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Alerts/>
          <Routes>
            {/* <PrivateRoute path="/" element={<Home />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
    </Alertstate>
    </Contactstate>
    </Authstate>
   
  );
};

export default App;
