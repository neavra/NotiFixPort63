//import styles from '../styles/Home.module.css';
import styles from '../styles/table.module.css'
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import ProtocolDashboard from '../components/ProtocolDashboard';
import Notificationboard from '../components/Notificationboard';
import ProtocolNotificationsBoard from '../components/ProtocolNotification';
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
                    <ProtocolDashboard walletAddress={ walletAddress }/>
                    {/* <Dashboard walletAddress={ walletAddress }/> */}
              </div>
              <div className='flex-grow p-1 mt-10 rounded-[1rem] bg-[#1F1D2B]'>
                {/* <Notificationboard recipient={ walletAddress }/> */}
                <ProtocolNotificationsBoard recipient={ walletAddress }/>
              </div>  
            </div>
          ) : (
          <div className="flex flex-col items-center justify-center text-center mt-[3rem]">
            {/* Image */}
            <img src="/NotiFi Logo.png" alt="Logo" className="mt-3 w-96 h-96 rounded-[1rem]" />

            {/* Text */}
            <div className="text-2xl mt-3 ml-[10rem] mr-[10rem]">
              <h3>NotiFi is a decentralized one-stop service built on Algorand that enables anonymous, cross-platform notifications for Decentralized Applications</h3>
            </div>
          </div>

          )}
      </div>
    </Layout> 
  );
}


