import styles from "../styles/YourNft.module.css"
import { useMoralis } from "react-moralis"
import { NFTBalance } from "@web3uikit/web3"
import { Container } from "reactstrap"

export default function YourNft() {
	const { chainId, account, isWeb3Enabled } = useMoralis()
	const address = account
	// const chainString = parseInt(chainId).toString()
	const chainString = "0x61"
	return isWeb3Enabled ? (
		<Container className="pt-5">
			<h1>Your NFTs</h1>
			<div>
				<NFTBalance
					address={address}
					chain={chainString}
					style={{ padding: "0px", margin: "0px" }}
				/>
			</div>
		</Container>
	) : null
}
