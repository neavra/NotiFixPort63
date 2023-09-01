import React, { useState } from 'react';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { useWallet } from '../context/WalletContext';
import { doc, query, collection, where, getDocs } from 'firebase/firestore';
import { storage,database } from "../firebaseConfig";

const Connect = () => {
    const [connected, setConnected] = useState(false);
    const { walletAddress, setWalletAddress } = useWallet();

    const handleConnect = async () => {
        const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });

        const settings = {
            shouldSelectOneAccount: false,
            openManager: false
        };

        const accounts = await myAlgoConnect.connect(settings);
        console.log(accounts);
        const firstAccount = accounts[0];

        if (firstAccount) {
            const userRef = doc(collection(database, 'users'), firstAccount.address);
            
            const q = query(collection(database, 'users'), where('walletAddress', '==', firstAccount.address));
            setWalletAddress(firstAccount.address);

            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    setConnected(true);
                } else {
                    // User does not exist, redirect to onboarding page
                    window.location.href = '/newuser';
                }
            } catch (error) {
                console.error('Error checking user:', error);
            }
        }
    }

    return (
        <div className="connect-button">
          {!connected ? (
            <button onClick={handleConnect}>Connect Wallet</button>
          ) : (
            <div>
                <p>Wallet Connected</p>
                <p>Wallet Address: {walletAddress}</p>
            </div>
          )}
        </div>
      );
}

export default Connect;
