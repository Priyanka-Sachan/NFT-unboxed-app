const Moralis = require("moralis/node")
require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")

let chainId = process.env.chainId || 31337
let moralisChainId = chainId == "31337" ? "1337" : chainId
const contractAddress = contractAddresses[chainId]["NftMarketplace"][0]

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
const appId = process.env.NEXT_PUBLIC_APP_ID
const masterKey = process.env.moralisMasterKey

async function main() {
	await Moralis.start({ serverUrl, appId, masterKey })
	console.log(`Working with contract address ${contractAddress}`)

	let itemListedOptions = {
		// Moralis understands a local chain is 1337
		chainId: moralisChainId,
		sync_historical: true,
		topic: "ItemListed(address,address,uint256,uint256)",
		address: contractAddress,
		abi: {
			"type": "event",
			"anonymous": false,
			"name": "ItemListed",
			"inputs": [
				{
					"type": "address",
					"name": "owner",
					"indexed": true
				},
				{
					"type": "address",
					"name": "nftAddress",
					"indexed": true
				},
				{
					"type": "uint256",
					"name": "tokenId",
					"indexed": true
				},
				{
					"type": "uint256",
					"name": "price",
					"indexed": false
				}
			]
		},
		tableName: "ItemListed",
	}

	let itemSoldOptions = {
		chainId: moralisChainId,
		address: contractAddress,
		sync_historical: true,
		topic: "ItemSold(address,address,uint256,uint256)",
		abi: {
			"type": "event",
			"anonymous": false,
			"name": "ItemSold",
			"inputs": [
				{
					"type": "address",
					"name": "owner",
					"indexed": true
				},
				{
					"type": "address",
					"name": "nftAddress",
					"indexed": true
				},
				{
					"type": "uint256",
					"name": "tokenId",
					"indexed": true
				},
				{
					"type": "uint256",
					"name": "price",
					"indexed": false
				}
			]
		},
		tableName: "ItemSold",
	}

	let itemCanceledOptions = {
		chainId: moralisChainId,
		address: contractAddress,
		topic: "ItemCanceled(address,uint256)",
		sync_historical: true,
		abi: {
			"type": "event",
			"anonymous": false,
			"name": "ItemCanceled",
			"inputs": [
				{
					"type": "address",
					"name": "nftAddress",
					"indexed": true
				},
				{
					"type": "uint256",
					"name": "tokenId",
					"indexed": true
				}
			]
		},
		tableName: "ItemCanceled",
	}

	const listedResponse = await Moralis.Cloud.run("watchContractEvent", itemListedOptions, {
		useMasterKey: true,
	})
	const soldResponse = await Moralis.Cloud.run("watchContractEvent", itemSoldOptions, {
		useMasterKey: true,
	})
	const canceledResponse = await Moralis.Cloud.run("watchContractEvent", itemCanceledOptions, {
		useMasterKey: true,
	})
	if (listedResponse.success && canceledResponse.success && soldResponse.success)
		console.log("Success! Database Updated with watching events")
	else {
		console.log('Something went wrong... ')
		console.log(listedResponse)
		console.log(soldResponse)
		console.log(canceledResponse)
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.log(error)
		process.exit(1)
	})
