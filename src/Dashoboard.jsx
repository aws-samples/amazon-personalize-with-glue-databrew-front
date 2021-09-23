import React, { useContext } from 'react'

import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

import { Menu, Container, Icon } from 'semantic-ui-react'
import MoviesList from './component/MoviesList'
import MovieDetails from './component/MovieDetails'
import { AuthContext } from './context/Auth.context';


function Dashboard() {

    const { logout } = useContext(AuthContext)
    const onLogout = (e) => {
        e.preventDefault();
        logout();
    }
  
    return (
        <div>
            <Router>
            <Menu fixed='top' color='teal' inverted>
                <Menu.Menu>
                <Menu.Item header href='/'><Icon name='tv'/>DemoGo Prime</Menu.Item>
                </Menu.Menu>
                <Menu.Menu position='right'>
                <Menu.Item link>Generate</Menu.Item>
                <Menu.Item link onClick={onLogout}>Log out</Menu.Item>
                </Menu.Menu>
            </Menu>

            <Container style={{ marginTop: 70 }}>
                <h1>Welcome to the Unicorn Company</h1>
                
            </Container>

            <Container style={{ marginTop: 70 }}>
                <Route path='/' exact component={() => 
                <MoviesList/>
                }/>
                <Route path='/movies/:movieId' render={props => 
                <MovieDetails id={props.match.params.movieId} locationState={props.location.state}/>
                }/>
                {/* <Route path='/login' exact component={() => <Login />} /> */}
            </Container>
            </Router>
        </div>
    );
  }

  export default Dashboard;