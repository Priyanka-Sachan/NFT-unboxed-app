import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { useRouter } from "next/router"
import Image from "next/image"
import { Card, Loading } from "@web3uikit/core"
import { ethers } from "ethers"
import nftAbi from "../constants/NftCollection.json"

const truncateString = (fullStr, strLen) => {
	if (fullStr.length <= strLen) return fullStr
	const separator = "..."
	const seperatorLength = separator.length
	const charsToShow = strLen - seperatorLength
	const frontChars = Math.ceil(charsToShow / 2)
	const backChars = Math.floor(charsToShow / 2)
	return (
		fullStr.substring(0, frontChars) +
		separator +
		fullStr.substring(fullStr.length - backChars)
	)
}

export default function NFTCard({ marketplaceAddress, nftAddress, tokenId, seller, price }) {
	const router = useRouter()
	const { isWeb3Enabled, account } = useMoralis()
	const [imageURI, setImageURI] = useState("")
	const [tokenName, setTokenName] = useState("")
	const [tokenDescription, setTokenDescription] = useState("")

	const { runContractFunction: getTokenURI } = useWeb3Contract({
		abi: nftAbi,
		contractAddress: nftAddress,
		functionName: "tokenURI",
		params: {
			tokenId: tokenId,
		},
	})

	async function updateUI() {
		const tokenURI = await getTokenURI()
		console.log(`The TokenURI is ${tokenURI}`)
		if (tokenURI) {
			// IPFS Gateway: A server that will return IPFS files from a "normal" URL.
			let requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
			requestURL = tokenURI.replace("ipfs.moralis.io:2053", "gateway.moralisipfs.com")
			const tokenURIResponse = await (await fetch(requestURL)).json()
			const imageURI = tokenURIResponse.image
			let imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
			imageURIURL = imageURI.replace("ipfs.moralis.io:2053", "gateway.moralisipfs.com")
			setImageURI(imageURIURL)
			setTokenName(tokenURIResponse.name)
			setTokenDescription(tokenURIResponse.description)
		}
	}

	useEffect(() => {
		if (isWeb3Enabled) updateUI()
	}, [isWeb3Enabled])

	const isOwnedByUser = seller === account || seller === undefined
	const formattedSellerAddress = isOwnedByUser ? "you" : truncateString(seller || "", 15)

	const handleCardClick = () => {
		router.push(`/nft/${nftAddress}^${tokenId}`)
	}

	return (
		<div className="m-2">
			<div>
				{imageURI ? (
					<div>
						<Card
							title={tokenName}
							description={ethers.utils.formatUnits(price, "ether") + " ETH"}
							onClick={handleCardClick}
						>
							<div className="p-2">
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-end",
									}}
								>
									<div>#{tokenId}</div>
									<div className="italic text-sm">
										Owned by {formattedSellerAddress}
									</div>
									<Image
										loader={() => imageURI}
										src={imageURI}
										height="200"
										width="200"
									/>
								</div>
							</div>
						</Card>
					</div>
				) : (
					<Loading size={12} spinnerColor="#2E7DAF" spinnerType="wave" />
				)}
			</div>
		</div>
	)
}
