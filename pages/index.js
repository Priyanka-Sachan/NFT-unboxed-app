import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>NFT Unboxed</title>
        <meta
          name="description"
          content="Rummage through the NFTs in ETH ecosystem"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>NFT Unboxed</h1>
    </div>
  );
}
