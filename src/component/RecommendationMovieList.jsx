import React from 'react'
import PropTypes from 'prop-types';

import { Segment, Header, Grid, Placeholder, } from 'semantic-ui-react'

import MoviesListCardGroup from './MoviesListCardGroup'

function RecommendedMovieList({ recommendedMovies, title }) {

    return (
      <Segment style={{ margin: 'auto', width: '100%', maxWidth: 720 }}>
        <Header as='h2'>{title}</Header>
        { recommendedMovies.length > 0 ? (
          <MoviesListCardGroup
            items={recommendedMovies}
            pageViewOrigin='Recommendations'
            cardStyle={{ width: '100%', maxWidth: 200 }}/>
        ) : 
        (
          <Grid columns={3}>
            <Grid.Column>
              <Placeholder>
                <Placeholder.Image rectangular/>
                <Placeholder.Line length='long'/>
                <Placeholder.Line/>
              </Placeholder>
            </Grid.Column>
            <Grid.Column>
              <Placeholder>
                <Placeholder.Image rectangular/>
                <Placeholder.Line length='long'/>
                <Placeholder.Line/>
              </Placeholder>
            </Grid.Column>
            <Grid.Column>
              <Placeholder>
                <Placeholder.Image rectangular/>
                <Placeholder.Line length='long'/>
                <Placeholder.Line/>
              </Placeholder>
            </Grid.Column>
          </Grid>
        ) }
      </Segment>
    );
  };
  
  RecommendedMovieList.propTypes = {
    recommendedMovies: PropTypes.array
  };

  export default RecommendedMovieList;