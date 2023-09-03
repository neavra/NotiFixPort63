import React, { useState } from 'react';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { doc, query, collection, where, getDocs } from 'firebase/firestore';
import { storage,database } from "../firebaseConfig";
import { useSelector, useDispatch } from 'react-redux';
import { setWalletAddress } from '../slices/walletSlice';
import { useRouter } from 'next/router';

const Connect = () => {
    const router = useRouter();
    const walletAddress = useSelector((state) => state.wallet.walletAddress);
    const dispatch = useDispatch()

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
            await dispatch(setWalletAddress(firstAccount.address));
            console.log(walletAddress)

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
    }

    return (
        <div className="connect-button">
          {!walletAddress ? (
            <button onClick={handleConnect}>Connect Wallet</button>
          ) : (
            <div>
                <p>{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</p>
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
            `}
            </style>
        </div>
        
      );
}

export default Connect;
