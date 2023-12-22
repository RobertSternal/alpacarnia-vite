
import React from 'react';
import ReviewItem from './ReviewItem';
import './UserReviews.css';

function UserReviews() {
  // Sample reviews data with imageURL added
  const reviews = [
    {
      username: 'John Doe',
      date: '2022-01-01',
      rating: 5,
      content: 'Great service!',
      imageURL: 'images/alp2.jpg'  // <-- Add your image path here
    },
    {
      username: 'Jane Doe',
      date: '2022-02-15',
      rating: 4,
      content: 'Good experience but room for improvement.',
      imageURL: 'images/alp4.jpg'  // <-- Add your image path here
    }
    // ... more reviews
  ];

  return (
    <div className='user-reviews'>
      <h1>Opinie gości</h1>
      {reviews.map((review, index) => (
        <ReviewItem 
          key={index}
          username={review.username}
          date={review.date}
          rating={review.rating}
          content={review.content}
          imageURL={review.imageURL}  // <-- Pass imageURL as a prop here
        />
      ))}
    </div>
  );
}

export default UserReviews;
