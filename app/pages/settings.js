import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';

export default function MarketPlace({}) {
    return (
        <Layout>
            <div className={styles.container}>
                <main className={styles.main}>
                    <div>
                        <h2>This is the settings page</h2>
                    </div>
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