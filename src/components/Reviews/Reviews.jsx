import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import styled from 'styled-components';

const ReviewContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 2px solid black;
`;

const ReviewAuthor = styled.h2`
  margin: 0 0 10px 0;
`;

const ReviewContent = styled.p`
  margin: 0;
`;

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=1c5228584da0b71ee3fe123f2b8ccc2b`);
        setReviews(result.data.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div>
      {reviews.length ? (
        <div>
          {reviews.map(review => (
            <ReviewContainer key={review.id}>
              <ReviewAuthor>{review.author}</ReviewAuthor>
              <ReviewContent>{review.content}</ReviewContent>
            </ReviewContainer>
          ))}
        </div>
      ) : (
        'No reviews yet...'
      )}
    </div>
  );
};

export default Reviews;