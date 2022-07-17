import styles from "../styles/Explore.module.css"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTCard from "../components/NFTCard"
import { Header } from "../components/Header"

export default function Home() {
	const { isWeb3Enabled } = useMoralis()
	const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
		// TableName
		"ActiveItem",
		// Function for the query
		(query) => query.limit(10).descending("tokenId")
	)

	return (
		<div>
			<Header />
			<h1>Recently Listed</h1>
			<div>
				{isWeb3Enabled ? (
					fetchingListedNfts ? (
						<div>Loading...</div>
					) : (
						listedNfts.map((nft) => {
							const { marketplaceAddress, nftAddress, tokenId, seller, price } =
								nft.attributes
							return (
								<NFTCard
									marketplaceAddress={marketplaceAddress}
									nftAddress={nftAddress}
									tokenId={tokenId}
									seller={seller}
									price={price}
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
