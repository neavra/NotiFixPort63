import React, { useEffect, useState } from 'react';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { doc, query, collection, where, getDocs } from 'firebase/firestore';
import { storage, database } from '../firebaseConfig';
import { useSelector, useDispatch } from 'react-redux';
import { setWalletAddress } from '../slices/walletSlice';
import { useRouter } from 'next/router';

const Connect = () => {
  const router = useRouter();
  const walletAddress = useSelector((state) => state.wallet.walletAddress);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Load wallet address from local storage on component mount
  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      dispatch(setWalletAddress(storedWalletAddress));
    }
  }, [dispatch]);

  const handleConnect = async () => {
    const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });

    const settings = {
      shouldSelectOneAccount: false,
      openManager: false,
    };

    const accounts = await myAlgoConnect.connect(settings);
    console.log(accounts);
    const firstAccount = accounts[0];

    if (firstAccount) {
      const userRef = doc(collection(database, 'users'), firstAccount.address);

      const q = query(
        collection(database, 'users'),
        where('walletAddress', '==', firstAccount.address)
      );

      // Store the wallet address in local storage
      localStorage.setItem('walletAddress', firstAccount.address);

      await dispatch(setWalletAddress(firstAccount.address));
      console.log(walletAddress);

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
        } else {
          // User does not exist, redirect to onboarding page
          router.push('/newuser');
        }
      } catch (error) {
        console.error('Error checking user:', error);
      }
    }
  };

  const handleLogout = () => {
    // Clear the wallet address from Redux and local storage
    dispatch(setWalletAddress(''));
    localStorage.removeItem('walletAddress');
    // Close the modal
    setShowModal(false);
  };

  return (
    <div className="connect-button">
      {!walletAddress ? (
        <button onClick={handleConnect}>Connect Wallet</button>
      ) : (
        <div>
          <p
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? <button onClick={() => setShowModal(true)}>Logout</button> : `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to logout?</p>
            <button className="logout-button" onClick={handleLogout}>Yes</button>
            <button className="logout-button" onClick={() => setShowModal(false)}>No</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .connect-button {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1000;
          display: inline-block;
          margin: 10px;
          padding: 10px 20px;
          background-color: #EA7C69;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background-color: #EA7C69;
          padding: 20px;
          border-radius: 4px;
          text-align: center;
        }

        .logout-button {
          width: 100px; 
          height: 40px; 
          margin: 5px; 
          background-color: #1F1D2B;
          border-radius: 10px;
        }
      `}
      </style>
    </div>
  );
};

export default Connect;
