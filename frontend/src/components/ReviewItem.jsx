import React from "react";
import "./ReviewItem.css";

function ReviewItem({ username, date, rating, content, imageURL }) {
  return (
    <div className="review-item">
      <div className="review-header">
        <h3>{username}</h3>
        <p>{date}</p>
      </div>
      <div className="review-rating">
        <p>{"⭐".repeat(rating)}</p>
      </div>
      <div className="review-content">
        <p>{content}</p>
      </div>
      <div className="review-imageURL">
        <img src={imageURL} alt="Review Image" className="review-image" />
      </div>
    </div>
  );
}

export default ReviewItem;
