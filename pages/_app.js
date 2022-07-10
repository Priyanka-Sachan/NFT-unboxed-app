import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis';

const APP_ID = process.env.NEXT_PUBLIC_APP_ID
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

function MyApp({ Component, pageProps }) {
  return (<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
    <Component {...pageProps} />
  </MoralisProvider>);
}

export default MyApp
