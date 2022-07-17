import Link from "next/link"
import { ConnectButton } from "@web3uikit/web3"

export function Header() {
	return (
		<nav>
			<Link href="/">
				<a>NFT Unboxed</a>
			</Link>
			<Link href="/explore">
				<a>Explore</a>
			</Link>
			<Link href="/sell-nft">
				<a>Sell NFT</a>
			</Link>
			<ConnectButton />
		</nav>
	)
}
