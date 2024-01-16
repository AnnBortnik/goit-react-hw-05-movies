import React, { useState, useEffect } from 'react';
import { useParams, Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews'; 
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import styled from 'styled-components';


const MovieContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

const MovieInfo = styled.div`
  margin-left: 20px;
`;

const MoviePoster = styled.img`
  width: 200px;
  height: auto;
`;

const MovieActions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-top: 2px solid black; 
  border-bottom: 2px solid black; 
  padding: 20px 0;
  margin-bottom: 20px;  
  gap: 2px;
`;

const GoBackButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 13px;
  color: #333;
  margin-bottom: 12px;
  margin-top: 12px;
  &:hover {
    color: lightblue;
  }
`;

const BackIcon = styled(FaArrowLeft)`
  margin-right: 5px;
`;

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`https://api.themoviedb.org/3/movie/${movieId}?api_key=1c5228584da0b71ee3fe123f2b8ccc2b`);
        setMovieDetails(result.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchData();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate('/home');
    }
  };

  if (!movieDetails) return 'Loading...';

  return (
    <>
      <GoBackButton onClick={handleGoBack}>
        <BackIcon />
        Go Back
      </GoBackButton>
      <MovieContainer>
        <MovieInfo>
          <h1>{movieDetails.title}</h1>
          <p>User Score: {Math.round(movieDetails.vote_average * 10)}%</p>
          <h3>Overview:</h3>
          <p>{movieDetails.overview}</p>
          <h3>Genres:</h3>
          <p>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
        </MovieInfo>
        <MoviePoster src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
      </MovieContainer>
      <MovieActions>
        <h3>Additional Information</h3>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
      </MovieActions>
      <Routes>
        <Route path="cast" element={<Cast movieId={movieId} />} />
        <Route path="reviews" element={<Reviews />} />
      </Routes>
    </>
  );
};

export default MovieDetails;