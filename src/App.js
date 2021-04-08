import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import NavBar from './components/Dashboard/NavBar';
import Survey from './components/Survey/Survey';
import Login from './components/Login/Login';
import { 
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

function App() {
  const [token, setToken] = useState()

  useEffect(()=>{
    setToken(JSON.parse(localStorage.getItem("AccessToken")))
  })

  if(!token){
    return <Login setToken={setToken}/>
  }
  return (
    <div className="wrapper">
      <div className="custom-nav">
        <NavBar />
      </div>
      <BrowserRouter>
      <Switch>
      <Route exact path="/">
          <Redirect to="/dashboard" />
      </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/survey">
          <Survey />
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
