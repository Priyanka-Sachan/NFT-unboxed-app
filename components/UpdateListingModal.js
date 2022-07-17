import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import { Modal, Input, useNotification } from "@web3uikit/core"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"

export default function UpdateListingModal({
	isVisible,
	marketplaceAddress,
	nftAddress,
	tokenId,
	onClose,
}) {
	const dispatch = useNotification()

	const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0)

	const handleUpdateListingSuccess = async (tx) => {
		await tx.wait(1)
		dispatch({
			type: "success",
			message: "listing updated",
			title: "Listing updated - please refresh (and move blocks)",
			position: "topR",
		})
		onClose && onClose()
		setPriceToUpdateListingWith("0")
	}

	const { runContractFunction: updateItem } = useWeb3Contract({
		abi: nftMarketplaceAbi,
		contractAddress: marketplaceAddress,
		functionName: "updateItem",
		params: {
			nftAddress: nftAddress,
			tokenId: tokenId,
			newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0"),
		},
	})

	return (
		<Modal
			isVisible={isVisible}
			onCancel={onClose}
			onCloseButtonPressed={onClose}
			onOk={() => {
				updateItem({
					onError: (error) => {
						console.log(error)
						console.log(updateItem)
					},
					onSuccess: handleUpdateListingSuccess,
				})
			}}
		>
			<Input
				label="Update listing price in L1 Currency (ETH)"
				name="New listing price"
				type="number"
				onChange={(event) => {
					setPriceToUpdateListingWith(event.target.value)
				}}
			/>
		</Modal>
	)
}
