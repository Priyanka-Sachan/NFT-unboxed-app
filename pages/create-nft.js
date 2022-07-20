import { useState } from "react"
import Moralis from "moralis-v1"
import { ethers } from "ethers"
import { IPFSInput } from "@web3uikit/web3"
import { Form } from "@web3uikit/core"
import styles from "../styles/CreateNft.module.css"

export default function CreateNft() {
	const [nftImageUri, setNftImageUri] = useState("")

	async function mintNft(data) {
		console.log("Minting...")
		const collection = data.data[0].inputResult
		const name = data.data[1].inputResult
		const description = data.data[2].inputResult
		const attributes = {}
		const price = ethers.utils.parseUnits(data.data[3].inputResult, "ether").toString()

		const nftMetadata = {
			name: name,
			description: description,
			image: nftImageUri,
			attributes: attributes,
		}
		const file = new Moralis.File("file.json", { base64: btoa(JSON.stringify(nftMetadata)) })
		await file.saveIPFS() 
		const nftTokenUri = file.ipfs()

		// const mintOptions = {
		// 	abi: nftAbi,
		// 	contractAddress: nftAddress,
		// 	functionName: "mintNft",
		// 	params: {
		// 		tokenUri: nftTokenUri,
		// 		price: price,
		// 	},
		// }

		// await runContractFunction({
		// 	params: mintOptions,
		// 	onSuccess: (data) => {
		// 		console.log(data)
		// 	},
		// 	onError: (error) => {
		// 		console.log(error)
		// 	},
		// })
	}
	return (
		<div>
			<h1>Create NFT</h1>
			<IPFSInput
				onFinish={function noRefCheck(data) {
					setNftImageUri(data._ipfs)
				}}
				theme="withIcon"
			/>
			<Form
				data={[
					{
						name: "Collection",
						selectOptions: [
							{
								id: "dnf",
								label: "Devil and Fairy",
							},
							{
								id: "vw",
								label: "Virtual World",
							},
							{
								id: "ani",
								label: "Jungle Book",
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
							numberMin: 0.1,
							required: true,
						},
						value: "",
					},
				]}
				onSubmit={mintNft}
			/>
		</div>
	)
}
