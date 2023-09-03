import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Card = ({name, description }) => {
    const walletAddress = useSelector((state) => state.wallet.walletAddress);

    const handleSubscribe = async () => {
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
                window.location.reload();
            } else {
                console.error('Failed to create a new subscription:', response.status);
            }
        } catch (error) {
            console.error('Error creating subscription:', error);
        }
    };
    
    const imageSrc = `https://firebasestorage.googleapis.com/v0/b/notifi-port63.appspot.com/o/${
        name
    }?alt=media&token=07ddd564-df85-49a5-836a-c63f0a4045d6`;
    return (
    <div className="card">
      <img src={imageSrc} alt="Card" className="card-image" />
      <p className="card-description">{name}</p>
      <p className="card-description">{description}</p>
      <button className="subscribe-button" onClick={handleSubscribe}>Subscribe</button>

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
          background-color: #EA7C69;
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
