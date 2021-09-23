import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../config.json';

import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

import { AuthContext } from '../context/Auth.context.jsx';


import { Container, Divider, Card, Placeholder, Button, Icon, Rating } from 'semantic-ui-react'

import MovieCardImage from './MovieCardImage'
import RecommendedMovieList from './RecommendationMovieList';

// 영화 상세 페이지
function MovieDetails({ id, locationState }) {
  const { state: ContextState, login } = useContext(AuthContext);
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    username,
    userId
  } = ContextState;
    const [movie, setMovie] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [recommendedMovies, setRecommendedMovies] = React.useState([]);
    const [recommendedMovies2, setRecommendedMovies2] = React.useState([]);
    // const { state } = useContext(AuthContext);

    // config.ApiUrl need to be updated during Frontend set up lab.
    const config_api_url = config.ApiUrl;
  
    // Fetch a movie data for specific movie id from Movie Table in DynamoDB (GET)
    const get_a_movie_url = `${config_api_url}/movie`
    const a_movie_api = `${get_a_movie_url}/${id}`
    React.useEffect(() => {
      
      async function loadDealInfo() {

        const response = await axios.get(
          a_movie_api,
      );
       console.log((response.data));
       setMovie((response.data))
       setLoading(false);

        document.title = `${response.data.name} - DemoGo Prime`;
  
      };
      loadDealInfo();
  
      return () => {
        setMovie({});
        setLoading(true);
      };
    }, [id, locationState]);


    // call personalizeProcessingFunction function to make use of Amazon Personalize Campaign endpoint
    const get_realtime_recommendation = `${config_api_url}/recommendation`
    const realtime_api = `${get_realtime_recommendation}/${userId}`
    React.useEffect(() => {
      async function fetchData () {
        const response = await axios.get(
          realtime_api,);
         console.log((response.data)['movies']);
        //  console.log("state.username:",username)
         setRecommendedMovies((response.data)['movies'])
        
        
      }
      fetchData();
      

      // call batchRecommendationProcessingFunction function
      const get_batch_recommendation = `${config_api_url}/recommendation/batch`
      const batch_api = `${get_batch_recommendation}/${userId}`
      async function fetchData2 () {
        const response = await axios.get(
          batch_api,);
         console.log("batch", (response.data)['movies']);
        //  console.log("state.username:",username)
         setRecommendedMovies2((response.data)['movies'])
        
        
      }
      fetchData2();
    }, []);
  
    return (
      <Container>
        <NavLink to='/'><Icon name='arrow left'/>Back to Movie list</NavLink>
        <Divider hidden/>
        <Card key={movie.id} style={{ width: '100%', maxWidth: 720, minHeight: 100, margin: 'auto' }}>
          {loading ? (
            <Placeholder fluid style={{minHeight: 320}}>
              <Placeholder.Image/>
            </Placeholder>
          ) : 
          (
            <MovieCardImage movieName={movie.name} size = "medium" minHeight={100} fontSize={48} imageUrl={`https://via.placeholder.com/200x280/FFFFFF/000000?text=${movie.name}`}/>
          )}
          {loading ? (
            <Placeholder>
              <Placeholder.Line/>
              <Placeholder.Line/>          
            </Placeholder>
          ) : (
            <Card.Content>
              <Card.Header>{movie.name}</Card.Header>
              <Card.Meta><Icon name='tag'/> {movie.category}</Card.Meta>
              <Card.Description><Rating icon='star' defaultRating={4} maxRating={5} /></Card.Description>
              <Card.Header as="h1"> </Card.Header>
              <Card.Description>A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.</Card.Description>
            </Card.Content>
          )}
  
        </Card>
        <Divider hidden/>
        <RecommendedMovieList recommendedMovies={recommendedMovies} title = "실시간 추천 리스트"/>
        <RecommendedMovieList recommendedMovies={recommendedMovies2} title = "배치(Daily) 추천 리스트"/>
      </Container>
    );
  };
  
  MovieDetails.propTypes = {
    id: PropTypes.string,
    locationState: PropTypes.object
  };

  export default MovieDetails;