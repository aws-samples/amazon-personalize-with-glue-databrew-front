import React from 'react';
import axios from 'axios';
import config from '../config.json';


import { Container } from 'semantic-ui-react'

import MoviesListCardGroup from './MoviesListCardGroup';

function MoviesList() {
    const [movies, setMovies] = React.useState([]);
    // const [movies, setMovies] = React.useState([]);

    // Fetch all movie data from Movie Table in DynamoDB (GET)
    // config.ApiUrl need to be updated during Frontend set up lab.
    const config_api_url = config.ApiUrl;
    const get_movie_url = `${config_api_url}/movie`
    React.useEffect(() => {
      async function fetchData () {
        const response = await axios.get(
          get_movie_url,);
        //  console.log((response.data)['movies']);
        //  setMovies((response.data)['movies'])
        //  console.log(config.ApiUrl)
         console.log((response.data));
         setMovies((response.data))
        
        
      }
      fetchData();
    }, []);
    
  
    document.title = 'DemoGo Prime';
    return (
      <Container style={{ marginTop: 70 }}>
        <MoviesListCardGroup items={movies} pageViewOrigin='Browse'/>
      </Container>
    );
  };

  export default MoviesList;