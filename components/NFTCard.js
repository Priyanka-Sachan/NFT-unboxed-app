import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import Image from "next/image"
import { Card, useNotification } from "@web3uikit/core"
import { ethers } from "ethers"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/BasicNft.json"
import UpdateListingModal from "./UpdateListingModal"

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
	const { isWeb3Enabled, account } = useMoralis()
	const [imageURI, setImageURI] = useState("")
	const [tokenName, setTokenName] = useState("")
	const [tokenDescription, setTokenDescription] = useState("")
	const [showModal, setShowModal] = useState(false)
	const hideModal = () => setShowModal(false)
	const dispatch = useNotification()

	const { runContractFunction: getTokenURI } = useWeb3Contract({
		abi: nftAbi,
		contractAddress: nftAddress,
		functionName: "tokenURI",
		params: {
			tokenId: tokenId,
		},
	})

	const { runContractFunction: buyItem } = useWeb3Contract({
		abi: nftMarketplaceAbi,
		contractAddress: marketplaceAddress,
		functionName: "buyItem",
		msgValue: price,
		params: {
			nftAddress: nftAddress,
			tokenId: tokenId,
		},
	})

	async function updateUI() {
		const tokenURI = await getTokenURI()
		console.log(`The TokenURI is ${tokenURI}`)
		if (tokenURI) {
			// IPFS Gateway: A server that will return IPFS files from a "normal" URL.
			const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
			const tokenURIResponse = await (await fetch(requestURL)).json()
			const imageURI = tokenURIResponse.image
			const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
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
		isOwnedByUser
			? setShowModal(true)
			: buyItem({
					onError: (error) => {
						console.log(error)
					},
					onSuccess: handleBuyItemSuccess,
			  })
	}

	const handleBuyItemSuccess = async (tx) => {
		await tx.wait(1)
		dispatch({
			type: "success",
			message: "Item bought!",
			title: "Item Bought",
			position: "topR",
		})
	}

	return (
		<div>
			<div>
				{imageURI ? (
					<div>
						<UpdateListingModal
							isVisible={showModal}
							marketplaceAddress={marketplaceAddress}
							nftAddress={nftAddress}
							tokenId={tokenId}
							onClose={hideModal}
						/>
						<Card
							title={tokenName}
							description={tokenDescription}
							onClick={handleCardClick}
						>
							<div>
								<div>
									<div>#{tokenId}</div>
									<div>Owned by {formattedSellerAddress}</div>
									<Image
										loader={() => imageURI}
										src={imageURI}
										height="200"
										width="200"
									/>
									<div>{ethers.utils.formatUnits(price, "ether")} ETH</div>
								</div>
							</div>
						</Card>
					</div>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</div>
	)
}
