import Head from 'next/head';
import styles from '../styles/SellNft.module.css';
import { Header } from '../components/Header';

export default function SellNft() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sell NFT</title>
        <meta name="description" content="Rummage throug the NFTs in ETH ecosystem" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <h1 style={{color:'white'}}>SellNFT page!</h1>
    </div>);
}