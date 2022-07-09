import Head from 'next/head';
import styles from '../styles/Explore.module.css';
import { Header } from '../components/Header';

export default function Explore() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Explore</title>
        <meta name="description" content="Rummage throug the NFTs in ETH ecosystem" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <h1 style={{color:'white'}}>Explore page!</h1>
    </div>);
}