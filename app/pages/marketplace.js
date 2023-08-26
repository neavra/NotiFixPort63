import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import conn from '../db/db.js';

export async function getServerSideProps() {
    try {
      const result = await conn.query('SELECT * FROM test');
      const data = result.rows;
      return { props: { data } };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { props: { data: [] } };
    }
  }

export default function MarketPlace({data}) {
    return (
        <Layout>
            <div className={styles.container}>
                <main className={styles.main}>
                    <div>
                        <h2>This is the marketplace page</h2>
                    </div>
                    <h2>Example of how to get data from the Database</h2>
                        <ul>
                        {data.map((row, index) => (
                            <li key={index}>{JSON.stringify(row)}</li>
                        ))}
                        </ul>
                </main>
                <footer className={styles.footer}>
                        <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Powered by{' '}
                        <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
                        </a>
                    </footer>
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