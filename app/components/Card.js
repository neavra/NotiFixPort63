import React from 'react';

const Card = ({name, description }) => {
  return (
    <div className="card">
      <img src="/NotiFiLogo.svg" alt="Card" className="card-image" />
      <p className="card-description">{name}</p>
      <p className="card-description">{description}</p>
      <button className="subscribe-button">Subscribe</button>

      <style jsx>{`
        .card {
          border: 1px solid #ccc;
          padding: 20px;
          margin: 20px;
          text-align: center;
        }
        
        .card-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }

        .card-description {
          margin: 10px 0;
        }

        .subscribe-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Card;
