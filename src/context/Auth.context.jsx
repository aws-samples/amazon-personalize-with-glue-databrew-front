import React from 'react';
import { useSetState } from 'react-use';
import axios from 'axios';

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  username: "",
  userId: ""
}

export const ContextProvider = props => {
  const [state, setState] = useSetState(initialState);

  const setLoginPending = (isLoginPending) => setState({isLoginPending});
  const setLoginSuccess = (isLoggedIn) => setState({isLoggedIn});
  const setLoginError = (loginError) => setState({loginError});
  const setUserName = (username) => setState({username});
  const setUserId = (userId) => setState({userId});

  const login = (email, password, id) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);
    setUserName("");
    setUserId("");

    fetchLogin( email, password, id, error => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
        setUserName(email);
        (email === "admin")? setUserId("1") : setUserId("4");
      } else {
        setLoginError(error);
      }
    })
  }

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setUserName("");
    setUserId("");
    setLoginError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// Login data from DDB
async function fetchData () {
  const response = await axios.get(
      'https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/user',);
   console.log((response.data).Items);
   return (response.data).Items;
  //  setMovies((response.data)['movies'])
  
  
}


// fake login
const fetchLogin = (email, password, id, callback) => {
  // setTimeout(() => {
    // const response = axios.get(
    //   'https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/user',);
    //   console.log((response.data)['user']);
      // setMovies((response.data)['user'])
      // const result = fetchData();
      // const username = result.find( ({ name }) => name === 'admin' );
      // console.log("result: ", result)
    if (email === 'admin' && password === 'admin') {
      return callback(null);
    }
    else if (email === 'admin2' && password === 'admin2'){
      return callback(null);
    }
    else {
      return callback(new Error('Invalid email and password'));
    }
}
  // }, 1000);