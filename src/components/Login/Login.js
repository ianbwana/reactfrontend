import React, { useState } from "react";
import "./Login.css";
import PropTypes from "prop-types";
import axios from 'axios';
import {Row, Col} from 'reactstrap';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginUser = (e) => {
      e.preventDefault()
      
    let client_secret =
    "xqsESmmZxlwGokFuqQTigIwF3hyIWykudx6TCKseGeQIVlSApmscBNlugvfEUO7jh1HJUdXQTreYXJ93nayBjX4jlb8Zzxr4sxJXxJFHRQsMncxtoeUZwwNihdzBB039";
  let client_id = "pw5ExLyIcOnxF3B0wna1m7qqHlKVvrB2VFHGtyHB";
  let url = "http://104.248.0.49/api/v1/oauth/token/"

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }, 
  }

  let data = `grant_type=password&client_id=${client_id}&client_secret=${client_secret}&username=${email}&password=${password}`
  
  axios.post(url, data, config)
    .then((result) => {
      let userToken = result.data.access_token
      localStorage.setItem("AccessToken", JSON.stringify(userToken))
      sessionStorage.setItem('token', JSON.stringify(userToken));
      setToken(result.data.access_token)

      
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
        <Row className="login-form-container">
            <Col md="4" className="form-column">
      <form onSubmit={e =>loginUser(e)} className="login-form">
            <h1 className="Login Title">Please Log In</h1>
        <label>
          <p className="form-text">Email</p>
          <input
          className="input-box" type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p className="form-text">Password</p>
          <input
          className="input-box"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit" className="login-button" style={{backgroundColor: "#FFFFFF", border: "7px solid #FFFFFF"}}>Login</button>
        </div>
      </form>
      </Col>
      </Row>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
