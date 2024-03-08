import React from "react";
import ReviewItem from "./ReviewItem";
import "./UserReviews.css";

function UserReviews() {
  const reviews = [
    {
      username: "Natalia Pająk",
      date: "2022-01-01",
      rating: 5,
      content: "Śuper spędzony czas!",
      imageURL: "images/alp2.jpg",
    },
    {
      username: "Natalia Cruzoe",
      date: "2022-02-15",
      rating: 4,
      content: "Super zwierzaki, na pewno wrócę!",
      imageURL: "images/alp4.jpg",
    },
  ];

  return (
    <div className="user-reviews">
      <h1>Opinie gości</h1>
      {reviews.map((review, index) => (
        <ReviewItem
          key={index}
          username={review.username}
          date={review.date}
          rating={review.rating}
          content={review.content}
          imageURL={review.imageURL} // imageURL as a prop here
        />
      ))}
    </div>
  );
}

export default UserReviews;
