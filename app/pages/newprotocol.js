import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import ProtocolForm from '../components/ProtocolForm';

export default function Settings({}) {
    return (
        <Layout>
            <div className={styles.container}>
                <main className={styles.main}>
                    <div>
                        <ProtocolForm></ProtocolForm>
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
    );
};