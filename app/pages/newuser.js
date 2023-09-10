import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import algosdk from "algosdk";
import { useRouter } from 'next/router';

export default function NewUser() {
    const router = useRouter();
    const walletAddress = useSelector((state) => state.wallet.walletAddress);
    const handleProtocolClick = async () => {
        const myAlgoConnect = new MyAlgoConnect();

        const settings = {
            shouldSelectOneAccount: false,
            openManager: false
        };
        // User should be prompted to sign a transaction
        const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');
        const params = await algodClient.getTransactionParams().do();

        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            suggestedParams: {
                ...params,
            },
            from: walletAddress,
            to: "EWSUKE3OIMAEDDGBA6IEIOS4T773Y4HAKYPLC6KW4L34DN6Z6PHOYT35WE", 
            amount: algosdk.algosToMicroalgos(0.001),
        });
        const [ signedTxn ] = await myAlgoConnect.signTxns([{
            txn: Buffer.from(txn.toByte()).toString('base64')
          }]);
        const txBytes = Buffer.from(signedTxn, 'base64')

        const response = await algodClient.sendRawTransaction(txBytes).do();
        // once the transaction is signed, register the newuser
        console.log(response)
        // insert the new user
        const newProtocol = {
            walletAddress: walletAddress,
            type: 'protocol',
        };
    
        const serverResponse = await fetch('http://localhost:8001/setUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(newProtocol),
        });
    
        if (serverResponse.status === 201) {
            const responseData = await serverResponse.json();
            console.log('New protocol created with ID:', responseData.id);
            alert('Registration successful');
            router.push('/');

        } else {
            console.error('Failed to create a new protocol on the server');
        }
    };

    const handleUserClick = async () => {
        const myAlgoConnect = new MyAlgoConnect();

        const settings = {
            shouldSelectOneAccount: false,
            openManager: false
        };
        // User should be prompted to sign a transaction
        const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');
        const params = await algodClient.getTransactionParams().do();

        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            suggestedParams: {
                ...params,
            },
            from: walletAddress,
            to: "EWSUKE3OIMAEDDGBA6IEIOS4T773Y4HAKYPLC6KW4L34DN6Z6PHOYT35WE", 
            amount: algosdk.algosToMicroalgos(0.001),
        });
        const [ signedTxn ] = await myAlgoConnect.signTxns([{
            txn: Buffer.from(txn.toByte()).toString('base64')
          }]);
        const txBytes = Buffer.from(signedTxn, 'base64')

        const response = await algodClient.sendRawTransaction(txBytes).do();
        // once the transaction is signed, register the newuser
        console.log(response)
        // insert the new user
        const newUser = {
            walletAddress: walletAddress,
            type: 'user',
        };
    
        const serverResponse = await fetch('http://localhost:8001/setUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(newUser),
        });
    
        if (serverResponse.status === 201) {
            const responseData = await serverResponse.json();
            console.log('New user created with ID:', responseData.id);
            alert('Registration successful');
            router.push('/');

        } else {
            console.error('Failed to create a new user on the server');
        }
    };

    return (
        <Layout>
            <div className={styles.container}>
                <main className={styles.main}>
                    <div>
                        {walletAddress && (
                            <h2>Welcome new user, {walletAddress}, are you a protocol or a user?</h2>
                        )}
                        {!walletAddress && (
                            <h2>Welcome new user, are you a protocol or a user?</h2>
                        )}
                    </div>
                    <div>
                        <button className="button" onClick={handleProtocolClick}>
                            Protocol
                        </button>
                        <button className="button" onClick={handleUserClick}>
                            User
                        </button>
                    </div>
                </main>
                <style jsx global>{`
                    html,
                    body {
                        padding: 0;
                        margin: 0;
                        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                            sans-serif;
                    }
                    * {
                        box-sizing: border-box;
                    }

                    .button {
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

                    .button:hover {
                        background-color: #F5B2A7;
                    }
                `}</style>

            </div>
        </Layout>
    );
};
