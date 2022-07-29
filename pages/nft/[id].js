import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useMoralis, useMoralisQuery, useWeb3Contract } from "react-moralis"
import { useNotification, Button } from "@web3uikit/core"
import UpdateListingModal from "../../components/UpdateListingModal"
import nftMarketplaceAbi from "../../constants/NftMarketplace.json"
import nftAbi from "../../constants/NftCollection.json"
import Image from "next/image"
import { Container } from "reactstrap"

export default function Nft({ nftAddress, tokenId }) {
	const router = useRouter()
	const { isWeb3Enabled, account } = useMoralis()
	const { fetch: getNft } = useMoralisQuery(
		"ActiveItem",
		(query) => query.equalTo("nftAddress", nftAddress).equalTo("tokenId", tokenId),
		[],
		{ autoFetch: false }
	)
	const [marketplaceAddress, setMarketplaceAddress] = useState("")
	const [seller, setSeller] = useState("")
	const [price, setPrice] = useState("")
	const [imageURI, setImageURI] = useState("")
	const [tokenName, setTokenName] = useState("")
	const [tokenDescription, setTokenDescription] = useState("")
	const [tokenAttributes, setTokenAttributes] = useState("")

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

	async function updateUI() {
		console.log(`NFT Address ${nftAddress}`)
		console.log(`TokenId ${tokenId}`)
		const nfts = await getNft()
		console.log(nfts)
		if (nfts[0]) {
			// {marketplaceAddress,seller,price}=nfts[0].attributes
			setMarketplaceAddress(nfts[0].attributes.marketplaceAddress)
			setSeller(nfts[0].attributes.seller)
			setPrice(nfts[0].attributes.price)
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
				// setTokenAttributes(tokenURIResponse.attributes)
			}
		}
	}

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

	function buyNftHandler() {
		buyItem({
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

	function updateNftHandler() {
		setShowModal(true)
	}

	const { runContractFunction: cancelItem } = useWeb3Contract({
		abi: nftMarketplaceAbi,
		contractAddress: marketplaceAddress,
		functionName: "cancelItem",
		params: {
			nftAddress: nftAddress,
			tokenId: tokenId,
		},
	})

	function cancelNftHandler() {
		cancelItem({
			onError: (error) => {
				console.log(error)
			},
			onSuccess: handleCancelItemSuccess,
		})
	}

	const handleCancelItemSuccess = async (tx) => {
		await tx.wait(1)
		dispatch({
			type: "success",
			message: "Item canceled!",
			title: "Item Canceled",
			position: "topR",
		})
		router.replace("/your-nft")
	}

	useEffect(() => {
		if (isWeb3Enabled) updateUI()
	}, [isWeb3Enabled])

	return (
		<Container className="pt-5">
			<div style={{ height: "100px" }}></div>
			{isWeb3Enabled ? (
				<div>
					<UpdateListingModal
						isVisible={showModal}
						marketplaceAddress={marketplaceAddress}
						nftAddress={nftAddress}
						tokenId={tokenId}
						onClose={hideModal}
					/>
					<div>
						<h1>{tokenName}</h1>
						<h3>
							{nftAddress}#{tokenId}
						</h3>
						<h4 className="italics"> Owned by {seller}</h4>
						<h4>Buy at {price}</h4>
						<Image
							loader={() => imageURI}
							src={imageURI}
							width="400"
							height="400"
						></Image>
						<h5>{tokenDescription}</h5>
						<h4>{tokenAttributes}</h4>
						{account == seller ? (
							<div>
								<Button
									text="UPDATE"
									theme="secondary"
									onClick={updateNftHandler}
								/>
								<Button text="CANCEL" theme="outline" onClick={cancelNftHandler} />
							</div>
						) : (
							<Button text="BUY NFT" theme="secondary" onClick={buyNftHandler} />
						)}
					</div>
				</div>
			) : (
				<h3>Connect to Wallet</h3>
			)}
		</Container>
	)
}

export async function getServerSideProps(context) {
	const id = context.params.id
	const nftAddress = id.split("^")[0]
	const tokenId = id.split("^")[1]
	console.log(`Got ${nftAddress} ^ ${tokenId}`)
	return {
		props: {
			nftAddress: nftAddress,
			tokenId: tokenId,
		},
	}
}
