import React, { Suspense, lazy, useState } from 'react';
import { HashRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = lazy(() => import('./Home/Home'));
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  background-color: lightblue;
`;

const StyledLink = styled(Link)`
  margin-right: 20px;
  text-decoration: none;
  color: black;

  &:visited {
    color: darkblue;
  }
`;

export const App = () => {
  const [, setButtonClicked] = useState(false);

  return (
    <HashRouter>
      <Suspense fallback={<div>Uploading...</div>}>
        <AppContainer>
          <Header>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/movies">Movies</StyledLink>
          </Header>
          <Routes>
            <Route path="/" element={<Home setButtonClicked={setButtonClicked} />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId/*" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppContainer>
      </Suspense>
    </HashRouter>
  );
};