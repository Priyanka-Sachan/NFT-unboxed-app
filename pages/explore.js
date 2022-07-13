import styles from '../styles/Explore.module.css';
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTCard from "../components/NFTCard"
import {Header} from "../components/Header"

export default function Home() {
  const { isWeb3Enabled } = useMoralis()
  const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
    // TableName
    "ActiveItem",
        // Function for the query
    (query) => query.limit(10).descending("tokenId")
  )
  console.log(listedNfts)

  return (
    <div className="container mx-auto">
      <Header/>
      <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      <div className="flex flex-wrap">
        {isWeb3Enabled ? (
          fetchingListedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.map((nft) => {
              console.log(nft.attributes)
              const { price, nftAddress, tokenId, marketplaceAddress, sellerAddress } =
                nft.attributes
              console.log(`Marketplace address: ${marketplaceAddress}`)
              return (
                <NFTCard
                  price={price}
                  nftAddress={nftAddress}
                  tokenId={tokenId}
                  marketplaceAddress={marketplaceAddress}
                  sellerAddress={sellerAddress}
                  key={`${nftAddress}${tokenId}`}
                />
              )
            })
          )
        ) : (
          <div>Web3 Currently Not Enabled</div>
        )}
      </div>
    </div>
  )
}