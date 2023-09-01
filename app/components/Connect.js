import React, { useState } from 'react';
import MyAlgoConnect from '@randlabs/myalgo-connect';

const Connect = () => {
    const [connected, setConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

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
            setWalletAddress(firstAccount.address);
            setConnected(true);
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
