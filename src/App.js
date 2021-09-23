import React, {useContext} from 'react';
import './App.css';

// React 라우터, UI 라이브러리

import Dashboard from './Dashoboard'

// To store login userid info, app uses Context Provide
import { AuthContext } from './context/Auth.context.jsx';

import Login from './login/Login';


function App() {  
  const { state } = useContext(AuthContext);
  console.log("state.isLoggedIn: ",state.isLoggedIn)
  console.log("state.username: ",state.username)
  console.log("state.userId: ",state.userId)

  document.title = 'Demogo Prime';
  if (!state.isLoggedIn){
    return(
      <Login />
    )
  } 
  else{
    return  (
      <div className='App'>
       <Dashboard />
      </div>
  ); 
  }
};

export default App;
