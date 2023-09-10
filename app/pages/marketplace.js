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
    // for (let i = 0; i < 4; i++) {
    //     loadingCards.push(
    //         <h1 key={i}>LOADING</h1>
    //     );
    // }
    loadingCards.push(
        <h1>LOADING</h1>
    );
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
                <h2 className="ml-10 mt-20 z-50 font-bold text-4xl">Market Place</h2>
                <div className='m-10 flex-grow rounded-[1.5rem] bg-[#1F1D2B]'>
                    <p className='ml-10 mt-[3rem] font-medium text-3xl'>Protocols</p>

                    <form>
                        <input
                                type="text"
                                className="m-10 h-[3.4rem] w-[73.5rem] px-4 flex items-center text-center border-2 border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring focus:ring-gray-500"
                                placeholder="Search Protocol"
                        />
                    </form>
                    
                    
                    <div className='border border-2 border-gray-700 rounded-md bg-gray-900 p-4 m-10 text-center rounded-lg'>
                        <div className="flex flex-wrap justify-center m-4">{loading ? generateLoadingCards() : generateCards(protocols)}</div>
                    </div>

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
            </div>
        </Layout>
    );
};