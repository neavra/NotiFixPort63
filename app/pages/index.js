//import styles from '../styles/Home.module.css';
import styles from '../styles/table.module.css'
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import Notificationboard from '../components/Notificationboard';
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  const walletAddress = useSelector((state) => state.wallet.walletAddress);

  return (
    <Layout>
      <div className={styles.container}>
          {walletAddress ? (
            <div>
              <h2 className="ml-10 mt-10 z-50 text-4xl">Dashboard</h2>
              <h3 className="ml-10 mt-2 text-lg text-gray-400">
                {new Date().toLocaleString()}
              </h3>
              <hr className="border-gray-300 ml-10 mt-2 w-25 mr-5" />
              <div className='flex-grow mt-10 p-1 rounded-[1rem] bg-[#1F1D2B]'>
                    <p className='ml-10 text-3xl mt-5'>Subscriptions</p>
                    <Dashboard walletAddress={ walletAddress }/>
              </div>
              <div className='flex-grow p-1 mt-10 rounded-[1rem] bg-[#1F1D2B]'>
                <Notificationboard recipient={ walletAddress }/>
              </div>  
            </div>
          ) : (
            <div className={styles.content}>
              <div className={styles.logo}>
                <img src="/NotiFiLogo.svg" alt="Logo" />
              </div>
              <div className={styles.slogan}>
                <h2>Your Slogan Here</h2>
              </div>
            </div>
          )}
      </div>
    </Layout> 
  );
}


