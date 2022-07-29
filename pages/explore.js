import styles from "../styles/Explore.module.css"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTCard from "../components/NFTCard"
import { Container } from "reactstrap"
import { Loading, Illustration } from "@web3uikit/core"

export default function Explore() {
	const { isWeb3Enabled } = useMoralis()
	const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
		// TableName
		"ActiveItem",
		// Function for the query
		(query) => query.limit(10).descending("tokenId")
	)

	return isWeb3Enabled ? (
		<Container className="pt-5">
			<h1>Recently Listed</h1>
			<div style={{ display: "flex" }}>
				{fetchingListedNfts ? (
					<Loading size={12} spinnerColor="#2E7DAF" spinnerType="wave" />
				) : listedNfts.length == 0 ? (
					<div style={{ margin: "0px auto 0px", paddingTop: "50px" }}>
						<Illustration logo="marketplace" />
						<h3 style={{ textAlign: "center" }}>Nothing to buy.. come back later!</h3>
					</div>
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
				)}
			</div>
		</Container>
	) : null
}
