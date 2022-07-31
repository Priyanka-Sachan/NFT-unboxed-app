import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import { Form, useNotification, Button } from "@web3uikit/core"
import nftAbi from "../constants/NftCollection.json"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import networkMapping from "../constants/networkMapping.json"
import { Container } from "reactstrap"
import { useRouter } from "next/router"

export default function SellNft() {
	const router = useRouter()
	const { chainId, account, isWeb3Enabled } = useMoralis()
	const chainString = chainId ? parseInt(chainId).toString() : "31337"
	const marketplaceAddress = networkMapping[chainString].NftMarketplace
	const dispatch = useNotification()
	const { runContractFunction } = useWeb3Contract()

	const [proceeds, setProceeds] = useState("0")

	async function approveAndList(data) {
		console.log("Approving...")
		const nftAddress = data.data[0].inputResult
		const tokenId = data.data[1].inputResult
		const price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString()

		const approveOptions = {
			abi: nftAbi,
			contractAddress: nftAddress,
			functionName: "approve",
			params: {
				to: marketplaceAddress,
				tokenId: tokenId,
			},
		}
		console.log(approveOptions)
		await runContractFunction({
			params: approveOptions,
			onSuccess: () => handleApproveSuccess(nftAddress, tokenId, price),
			onError: (error) => {
				console.log(error)
			},
		})
	}

	async function handleApproveSuccess(nftAddress, tokenId, price) {
		console.log("Ok! Now time to list")
		const listOptions = {
			abi: nftMarketplaceAbi,
			contractAddress: marketplaceAddress,
			functionName: "listItem",
			params: {
				nftAddress: nftAddress,
				tokenId: tokenId,
				price: price,
			},
		}

		await runContractFunction({
			params: listOptions,
			onSuccess: handleListSuccess,
			onError: (error) => console.log(error),
		})
	}

	async function handleListSuccess(tx) {
		await tx.wait(1)
		dispatch({
			type: "success",
			message: "NFT listing",
			title: "NFT listed",
			position: "topR",
		})
		router.push("/explore")
	}

	const handleWithdrawSuccess = async (tx) => {
		await tx.wait(1)
		dispatch({
			type: "success",
			message: "Withdrawing proceeds",
			position: "topR",
		})
	}

	async function setupUI() {
		const returnedProceeds = await runContractFunction({
			params: {
				abi: nftMarketplaceAbi,
				contractAddress: marketplaceAddress,
				functionName: "getProceeds",
				params: {
					seller: account,
				},
			},
			onError: (error) => console.log(error),
		})
		if (returnedProceeds) {
			setProceeds(returnedProceeds.toString())
		}
	}

	useEffect(() => {
		if (isWeb3Enabled) setupUI()
	}, [proceeds, account, isWeb3Enabled, chainId])

	return (
		<Container className="pt-5">
			{isWeb3Enabled ? (
				<div>
					<h1>Sell NFT</h1>
					<Form
						onSubmit={approveAndList}
						data={[
							{
								name: "NFT Address",
								type: "text",
								inputWidth: "50%",
								value: "",
								key: "nftAddress",
							},
							{
								name: "Token ID",
								type: "number",
								value: "",
								key: "tokenId",
							},
							{
								name: "Price (in ETH)",
								type: "number",
								value: "",
								key: "price",
							},
						]}
						id="Main Form"
					/>
					<hr></hr>
					<h1>N get your money</h1>
					{proceeds != "0" ? (
						<div>
							<div>Withdraw {proceeds} proceeds</div>
							<Button
								onClick={() => {
									runContractFunction({
										params: {
											abi: nftMarketplaceAbi,
											contractAddress: marketplaceAddress,
											functionName: "withdrawProceeds",
											params: {},
										},
										onError: (error) => console.log(error),
										onSuccess: handleWithdrawSuccess,
									})
								}}
								text="Withdraw"
								type="button"
							/>
						</div>
					) : (
						<div>No proceeds detected</div>
					)}
				</div>
			) : null}
		</Container>
	)
}
