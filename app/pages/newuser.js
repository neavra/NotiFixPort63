import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import { useWallet } from '../context/WalletContext';
import algosdk from "algosdk";

export default function NewUser() {
    const { walletAddress } = useWallet();

    const handleProtocolClick = () => {
    };

    const handleUserClick = async () => {
        // User should be prompted to sign a transaction
        const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');

        const params = await algodClient.getTransactionParams().do();

        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        suggestedParams: {
            ...params,
        },
        from: walletAddress,
        to: receiver,
        amount: algosdk.algosToMicroalgos(0.001),
        });

        const [ signedTxn ] = await myAlgoConnect.signTxns([{
            txn: Buffer.from(txn.toByte()).toString('base64')
        }]);

        const txBytes = Buffer.from(signedTxn, 'base64')

        const response = await algodClient.sendRawTransaction(txBytes).do();
        // once the transaction is signed, register the newuser
        console.log(response)
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
                        background-color: #0070f3;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        text-decoration: none;
                    }

                    .button:hover {
                        background-color: #0054a4;
                    }
                `}</style>

            </div>
        </Layout>
    );
};
