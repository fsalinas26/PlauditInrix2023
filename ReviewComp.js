import React from 'react';

const RatingBlock = ({ isFilled }) => {
  return (
    <span style={{ 
      display: 'inline-block',
      width: '20px',
      height: '20px',
      backgroundColor: isFilled ? '#00AC47' : '#D6D6D6',
      margin: '0 4px'
    }}>
    </span>
  );
};

const CompanyRating = ({ name, website, rating, totalReviews }) => {
  const filledBlocks = Math.floor(rating); // Full blocks
  const emptyBlocks = 5 - filledBlocks; // Empty blocks

  return (
    <div>
      <h1>{name}</h1>
      <a href={`http://${website}`} target="_blank" rel="noopener noreferrer">{website}</a>
      <div>
        {Array.from({ length: filledBlocks }, (_, index) => (
          <RatingBlock key={`filled-${index}`} isFilled={true} />
        ))}
        {Array.from({ length: emptyBlocks }, (_, index) => (
          <RatingBlock key={`empty-${index}`} isFilled={false} />
        ))}
      </div>
      <div>
        <span>{rating.toFixed(2)}</span>
        <span>{totalReviews} Reviews</span>
        <span>Average</span>
      </div>
    </div>
  );
};

export default RatingBlock;
