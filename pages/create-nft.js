import { useState } from "react"
import { useRouter } from "next/router"
import Moralis from "moralis-v1"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import { IPFSInput } from "@web3uikit/web3"
import { Form, useNotification } from "@web3uikit/core"
import styles from "../styles/CreateNft.module.css"
import nftCollectionAbi from "../constants/NftCollection.json"
import contractAddresses from "../constants/networkMapping.json"
import { Container } from "reactstrap"
import { TagsInput } from "react-tag-input-component"

export default function CreateNft() {
	const router = useRouter()
	const { chainId, isWeb3Enabled } = useMoralis()
	const chainString = chainId ? parseInt(chainId).toString() : "31337"
	const dispatch = useNotification()
	const { runContractFunction } = useWeb3Contract()
	const [nftImageUri, setNftImageUri] = useState("")
	const [attributes, setAttributes] = useState([])

	async function mintNft(data) {
		console.log("Minting...")
		console.log(data)
		const collection = data.data[0].inputResult.split(" ").join("")
		const name = data.data[1].inputResult
		const description = data.data[2].inputResult
		console.log(data.data[3].inputResult)
		console.log(ethers.utils.parseUnits(data.data[3].inputResult, "ether"))
		const price = ethers.utils.parseUnits(data.data[3].inputResult, "ether").toString()
		console.log(price)
		const nftMetadata = {
			name: name,
			description: description,
			image: nftImageUri,
			attributes: attributes,
		}
		const file = new Moralis.File("file.json", { base64: btoa(JSON.stringify(nftMetadata)) })
		await file.saveIPFS()
		const nftTokenUri = file.ipfs()

		console.log(contractAddresses)
		const nftAddress = contractAddresses[chainString][collection]
		const mintOptions = {
			abi: nftCollectionAbi,
			contractAddress: nftAddress,
			functionName: "mintNft",
			params: {
				tokenUri: nftTokenUri,
				price: price,
			},
		}
		console.log(mintOptions)

		await runContractFunction({
			params: mintOptions,
			onSuccess: handleMintSuccess,
			onError: (error) => {
				console.log(error)
			},
		})

		async function handleMintSuccess(tx) {
			const txReciept = await tx.wait(1)
			const tokenId = txReciept.events[0].args.tokenId.toString()
			console.log(`Minted NFT at address ${nftAddress} & token is ${tokenId}`)
			dispatch({
				type: "success",
				message: `At address ${nftAddress} & token ${tokenId}`,
				title: "NFT Minted",
				position: "topR",
			})
			router.push("/your-nft")
		}
	}

	return (
		<Container className="pt-5">
			{isWeb3Enabled ? (
				<div>
					<h1 className="mb-3">Create NFT</h1>
					<div className="row">
						<div className="col-md-6">
							<IPFSInput
								onFinish={function noRefCheck(data) {
									setNftImageUri(data._ipfs)
								}}
								theme="withIcon"
							/>
							<pre className="initialism mt-3" >Enter attributes as format name:value</pre>
							<TagsInput
								value={attributes}
								onChange={setAttributes}
								name="attributes"
								placeHolder="Attributes"
							/>
						</div>
						<div className="col-md-6">
							<Form
								data={[
									{
										name: "Collection",
										selectOptions: [
											{
												id: "dnf",
												label: "Devil N Fairy Club",
												value: "DevilNFairyClub",
											},
											{
												id: "vw",
												label: "Fourth World",
												value: "FourthWorld",
											},
											{
												id: "ani",
												label: "Jungle Book Shelf",
												value: "JungleBookShelf",
											},
										],
										type: "select",
										value: "",
									},
									{
										inputWidth: "100%",
										name: "Name",
										type: "text",
										validation: {
											required: true,
										},
										value: "",
									},
									{
										inputWidth: "100%",
										name: "Description",
										type: "textarea",
										validation: {
											required: true,
										},
										value: "",
									},
									{
										name: "Price",
										type: "number",
										validation: {
											required: true,
										},
										value: "",
									},
								]}
								onSubmit={mintNft}
							/>
						</div>
					</div>
				</div>
			) : null}
		</Container>
	)
}
