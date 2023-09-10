import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

export default function MarketPlace() {
  const [loading, setLoading] = useState(true);
  const [protocols, setProtocols] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredProtocols, setFilteredProtocols] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8001/getProtocols");
        const data = await res.json();
        setProtocols(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching protocols:', error);
      }
    }

    fetchData();
  }, []);

  const [walletProtocols, setData] = useState([]);

  const walletAddress = useSelector((state) => state.wallet.walletAddress);
  console.log(walletAddress)

  const requestBody = {
    walletAddress: walletAddress,
  };

  useEffect(() => {
    fetch('http://localhost:8001/getSubscriptionsByWallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [walletAddress]);


  useEffect(() => {
    // Filter protocols based on the query
    const results = protocols.filter(protocol =>
      protocol.id.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProtocols(results);
  }, [protocols, query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className="ml-10 mt-20 z-50 font-bold text-4xl">Market Place</h2>
        <div className='m-10 flex-grow rounded-[1.5rem] bg-[#1F1D2B]'>
          <p className='ml-10 mb-10 mt-[3rem] font-medium text-3xl'>Protocols</p>

          <input
            type="search"
            className="h-[3.4rem] w-[94%] mx-auto px-4 flex items-center text-center border-2 border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring focus:ring-gray-500"
            placeholder="Search Protocol"
            value={query}
            onChange={handleChange}
          />

          <div className='border border-2 border-gray-700 rounded-md bg-gray-900 p-4 m-10 text-center rounded-lg'>
            <div className="flex flex-wrap justify-center m-4">
              {loading ? (
                <h1>Loading...</h1>
              ) : filteredProtocols.length === 0 ? (
                <p>No matches found</p>
              ) : (
                filteredProtocols.map((protocol, i) => {
                    // Extract protocolName values from walletProtocols and form a new array
                    const walletProtocolNames = walletProtocols.map((walletProtocol) => walletProtocol.protocolName);
                  
                    // Check if protocol name exists in walletProtocolNames
                    const isSubscribed = walletProtocolNames.includes(protocol.name);
                  
                    // console.log(isSubscribed);
                    return (
                      <div key={i} className="m-2">
                        <Card
                          key={i}
                          name={protocol.name}
                          description={protocol.description}
                          disableSubscribe={isSubscribed} // Pass the prop to disable the subscription button
                        />
                      </div>
                    );
                })
              )}
            </div>
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
