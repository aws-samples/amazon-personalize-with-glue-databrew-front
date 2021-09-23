import React, {useContext} from 'react';
import { useSetState } from 'react-use';
import axios from 'axios';

import { AuthContext } from '../context/Auth.context';

import { Image, Container } from 'semantic-ui-react'

const initialState = {
  email: '',
  password: '',
  id: ''
}

const LoginForm = () => {
  const { state: ContextState, login } = useContext(AuthContext);
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    username,
    userId
  } = ContextState;
  const [state, setState] = useSetState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, id } = state;
    login(email, password, id);
    setState({
      email: '',
      password: '',
      id: ''
    });
  }

  React.useEffect(() => {
    async function fetchData () {
      const response = await axios.get(
        'https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/user',);
     console.log((response.data).Items);
    //  console.log((response.data).Items[0]);
     return (response.data).Items;
      //  setMovies((response.data)['Item'])
      
      
    }
    fetchData();
  }, []);
    
  return (
    <>
    <Image src="/image/unicorngym.png" centered size='medium' />
    <Container text>
    <form name="loginForm" onSubmit={onSubmit}>
      
      <div className="row">

        <div className="col-sm-3 col-md-6">
          <label htmlFor="email" >Username</label>
        </div>
        
        <div className="col-sm-9 col-md-6">
          <input 
            type="text" 
            name="email" 
            onChange={e => setState({email: e.target.value})} 
            value={state.email} 
            placeholder="admin" 
          />
        </div>

        <div className="col-sm-3 col-md-6">
          <label htmlFor="password" value="admin">Password</label>
        </div>
        <div className="col-sm-9 col-md-6">
            <input 
              type="password" 
              name="password" 
              onChange={e => setState({password: e.target.value})} 
              value={state.password} 
              placeholder="admin" 
            />
        </div>

        <div className="col-sm-3 col-md-6">
        </div>
        <div className="col-sm-9 col-md-6">
          <input className="primary" type="submit" value="Login" />
        </div>
        
      </div>

      { isLoginPending && <div>Please wait...</div> }
      { isLoggedIn && <div>Success.</div> }
      { loginError && <div>{loginError.message}</div> }
    </form>
    </Container>
    </>
  )
}


export default LoginForm;