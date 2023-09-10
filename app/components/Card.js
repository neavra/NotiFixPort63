import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Card = ({ name, description, disableSubscribe }) => {
  const walletAddress = useSelector((state) => state.wallet.walletAddress);

  const handleSubscribe = async () => {
    console.log('sub')
    console.log(disableSubscribe)
    if (!walletAddress) {
      window.alert('Please connect your wallet before subscribing.');
      return;
    }

    const subscriptionData = {
      walletAddress: walletAddress,
      protocolName: name,
      protocolDescription: description,
    };

    try {
      const response = await fetch('http://localhost:8001/setSubscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      if (response.status === 201) {
        // Subscription created successfully
        const responseData = await response.json();
        console.log('New subscription created with ID:', responseData.id);
        // Show a success alert
        window.alert('Subscription successful.');
        // You can optionally update your local state or Redux state here
      } else {
        console.error('Failed to create a new subscription:', response.status);
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  const imageSrc = `https://firebasestorage.googleapis.com/v0/b/notifi-port63.appspot.com/o/${name}?alt=media&token=07ddd564-df85-49a5-836a-c63f0a4045d6`;

  return (
    <div className="card">
      <div className="card-image-container">
        <img src={imageSrc} alt="Card" className="card-image" />
      </div>
      <p className="card-title">{name}</p>
      <p className="card-description">{description}</p>
      <button
        className={`subscribe-button ${disableSubscribe ? 'disabled' : ''}`}
        onClick={handleSubscribe}
        disabled={disableSubscribe}
      >
        {disableSubscribe ? 'Subscribed' : 'Subscribe'}
      </button>


      <style jsx>{`
        .card {
          border: 2px solid #4A5568;
          padding: 20px;
          margin: 20px;
          text-align: center;
          border-radius: 0.375rem;
          width: 25vw;
          height: 48vh;
        }

        .card-image-container {
          display: flex;
          justify-content: center; 
          align-items: center; 
          margin-bottom: 10px; 
        }
        
        .card-image {
          width: 10vw;
          height: 17vh;
          object-fit: cover;
          border-radius: 2.375rem;
        }

        .card-title {
          margin: 10px 0;
          font-size: 1.5rem;
        }

        .card-description {
          margin: 10px 0;
          color: gray;
          margin-bottom: 30px;
        }

        .subscribe-button {
          background-color: #EA7C69;
          color: white;
          border: none;
          border-radius: 1.375rem;
          padding: 10px 15px;
          cursor: pointer;
        }
        .disabled {
          background-color: gray; /* Set the background color to gray */
          color: white;
          border: none;
          border-radius: 1.375rem;
          padding: 10px 15px;
          cursor: not-allowed; /* Change the cursor to not-allowed */
        }
      `}</style>
    </div>
    );
};

export default Card;
