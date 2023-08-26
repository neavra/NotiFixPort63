import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';


export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.logo}>
              <img src="/NotiFiLogo.svg" alt="Logo" />
            </div>
            <div className={styles.slogan}>
              <h2>Your Slogan Here</h2>
            </div>
            <div className={styles.text}>
              <button>Connect Wallet</button>
            </div>
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
      `}</style>
    </div>
    </Layout> 
  )
}
