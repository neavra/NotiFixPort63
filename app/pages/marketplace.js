import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import Card from "../components/Card";
import { useEffect, useState } from "react";

function generateCards(protocols) {
    const protocolArray = protocols[0];
    return protocolArray.map((protocol, i) => (
      <div key={i} className="m-2">
        <Card
            key={i}
            name={protocol.name}
            description={protocol.description}
        />
      </div>
    ));
}

function generateLoadingCards() {
    const loadingCards = [];
    for (let i = 0; i < 4; i++) {
        loadingCards.push(
            <h1 key={i}>LOADING</h1>
        );
    }
    return loadingCards;
}

async function getProtocols() {
    const res = await fetch("http://localhost:8001" + "/getProtocols");
    const data = await res.json();
    console.log(data)
    return data;
  }

export default function MarketPlace() {
    const [loading, setLoading] = useState(true);
    const [protocols, setProtocols] = useState([]);

    useEffect(() => {
        Promise.all([getProtocols()]).then((protocolRes) => {
          console.log(protocolRes);
          setProtocols(protocolRes);
          setLoading(false);
        });
      }, []);
    return (
        <Layout>
            <div className={styles.container}>
                <main className={styles.main}>
                    <div>
                        <h2>This is the marketplace page</h2>
                    </div>
                    <div className="flex flex-wrap justify-center m-4">{loading ? generateLoadingCards() : generateCards(protocols)}</div>
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
                `}</style>
            </div>
        </Layout>
    );
};