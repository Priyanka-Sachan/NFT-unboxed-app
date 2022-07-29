import React, { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from "reactstrap"
import { ConnectButton } from "@web3uikit/web3"
import { useMoralis } from "react-moralis"
import EnableWeb3 from "./EnableWeb3"

export default function Header() {
	const { isWeb3Enabled } = useMoralis()
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const toggle = () => setIsOpen(!isOpen)
	return (
		<div>
			<Head>
				<title>NFT Unboxed</title>
				<meta name="description" content="Rummage through the NFTs in ETH ecosystem" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="topbar" id="top">
				<div className="header6">
					<Container className="po-relative">
						<Navbar className="navbar-expand-lg h6-nav-bar">
							<NavbarBrand href="/">
								<h1 style={{ margin: "0px" }}>NFT Unboxed</h1>
							</NavbarBrand>
							<NavbarToggler onClick={toggle}>
								<span className="ti-menu"></span>
							</NavbarToggler>
							<Collapse
								isOpen={isOpen}
								navbar
								className="hover-dropdown ml-auto"
								id="h6-info"
								style={{ justifyContent: "flex-end" }}
							>
								<Nav navbar className="ml-auto">
									<NavItem>
										<Link href="/explore">
											<a
												className={
													router.pathname == "/explore"
														? "nav-link text-dark"
														: "nav-link text-muted"
												}
											>
												Explore
											</a>
										</Link>
									</NavItem>
									<NavItem>
										<Link href="/create-nft">
											<a
												className={
													router.pathname == "/create-nft"
														? "nav-link text-dark"
														: "nav-link text-muted"
												}
											>
												Create
											</a>
										</Link>
									</NavItem>
									<NavItem>
										<Link href="/your-nft">
											<a
												className={
													router.pathname == "/your-nft"
														? "nav-link text-dark"
														: "nav-link text-muted"
												}
											>
												View
											</a>
										</Link>
									</NavItem>
									<NavItem>
										<Link href="/sell-nft">
											<a
												className={
													router.pathname == "/sell-nft"
														? "nav-link text-dark"
														: "nav-link text-muted"
												}
											>
												Sell
											</a>
										</Link>
									</NavItem>
								</Nav>
								<ConnectButton />
							</Collapse>
						</Navbar>
					</Container>
				</div>
			</div>
			{isWeb3Enabled || router.asPath == "/" ? (
				router.asPath == "/" ? null : (
					<div style={{ height: "50px" }}></div>
				)
			) : (
				<EnableWeb3 />
			)}
		</div>
	)
}
