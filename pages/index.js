import styles from "../styles/Home.module.css"
import React from "react"
import { Row, Col, Container, Card, CardBody } from "reactstrap"
import Image from "next/image"
import herobanner from "../assets/images/hero-banner.jpg"
import img from "../assets/images/feature-img.jpg"
import f1 from "../assets/images/f1.svg"
import f2 from "../assets/images/f2.svg"
import f3 from "../assets/images/f3.svg"
import f4 from "../assets/images/f4.svg"
import img1 from "../assets/images/img1.svg"
import img2 from "../assets/images/img2.png"
import img3 from "../assets/images/img3.png"
import img4 from "../assets/images/img4.png"
import img5 from "../assets/images/img5.png"
import img6 from "../assets/images/img6.svg"

export default function Home() {
	return (
		<div>
			<div className="static-slider10">
				<Container>
					<Row className="">
						<Col md="6" className="align-self-center ">
							<span className="label label-rounded label-inverse">
								NFT MARKETPLACE
							</span>
							<h1 className="title">Trade without platform fees on NFT Unboxed</h1>
							<h5 className="subtitle op-8">
								NFT Unboxed is an NFT marketplace built on Ethereum. Create and
								trade NFTs instantly with low network costs.
							</h5>
							<a
								className="btn btn-light btn-rounded btn-md m-t-20"
								data-toggle="collapse"
								href="/explore"
							>
								<span>Explore trending NFTs?</span>
							</a>
						</Col>
						<Col md="6">
							<Image src={herobanner} alt="herobanner"></Image>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="spacer ">
				<Container className="feature30">
					<Row>
						<Col lg="10">
							<Image src={img} className="rounded img-responsive" alt="wrappixel" />
						</Col>
						<Col lg="5" md="7" className="wrap-feature30-box">
							<Card className="card-shadow">
								<CardBody>
									<div className="p-20">
										<span className="label label-info label-rounded">
											USE CASE
										</span>
										<h3 className="title">
											What does NFT Unboxed help you do?
										</h3>
										<ol>
											<li>View your on-chain NFTs</li>
											<li>Create and mint NFTs in existing collections</li>
											<li>Sell and buy NFTs that you ❤️</li>
										</ol>
										<a
											className="btn btn-danger btn-md btn-arrow m-t-20"
											href="/your-nft"
										>
											<span>
												VIEW NFTs <i className="ti-arrow-right"></i>
											</span>
										</a>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="testimonial3 spacer bg-light blog-home2">
				<Container>
					<Row className="justify-content-center">
						<Col md="7" className="text-center">
							<h2 className="title">Why NFT Unboxed</h2>
						</Col>
					</Row>
					<Row className="testi3 m-t-40 justify-content-center">
						<Col lg="3" md="6">
							<Card className="card-shadow">
								<CardBody>
									<span className="thumb-img m-b-10 ">
										<Image src={f1} alt="wrapkit" className="circle" />
									</span>
									<h4 className="font-medium ">Easy Connect</h4>
									<h6 className="font-light m-b-30">
										Using Metamask or CoinBase Wallet. Just click 'Connect
										Wallet' on the top right to start.
									</h6>
								</CardBody>
							</Card>
						</Col>
						<Col lg="3" md="6">
							<Card className="card-shadow">
								<CardBody>
									<span className="thumb-img m-b-10 ">
										<Image src={f2} alt="wrapkit" className="circle" />
									</span>
									<h4 className="font-medium ">Super Fast</h4>
									<h6 className="font-light m-b-30">
										Since Unboxed runs on the Ethereum Network, transactions
										are confirmed within 1-2 seconds.
									</h6>
								</CardBody>
							</Card>
						</Col>
						<Col lg="3" md="6">
							<Card className="card-shadow">
								<CardBody>
									<span className="thumb-img m-b-10 ">
										<Image src={f3} alt="wrapkit" className="circle" />
									</span>
									<h4 className="font-medium ">Low Transaction Fees</h4>
									<h6 className="font-light m-b-30">
										Transactions are just a few cents, allowing users to create
										& trade NFTs without high network fees.
									</h6>
								</CardBody>
							</Card>
						</Col>
						<Col lg="3" md="6">
							<Card className="card-shadow">
								<CardBody>
									<span className="thumb-img m-b-10 ">
										<Image src={f4} alt="wrapkit" className="circle" />
									</span>
									<h4 className="font-medium ">Zero Platform Fees</h4>
									<h6 className="font-light m-b-30">
										Trade NFTs via auction or direct offer without any fees
										taken by Unboxed.
									</h6>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="spacer">
				<Container>
					<Row className="justify-content-center">
						<Col md="7" className="text-center">
							<h2 className="title">Our Trending collections</h2>
						</Col>
					</Row>
					<Row className="m-t-40">
						<Col md="4">
							<Card className="card-shadow">
								<a href="#" className="img-ho" style={{ height: "250px" }}>
									<Image
										className="card-img-top"
										src={img1}
										alt="wrappixel kit"
									/>
								</a>
								<CardBody>
									<h5 className="font-medium m-b-0">
										Witch with the purple hat
									</h5>
									<p className="m-b-0 font-14">DevilNFairyClub</p>
								</CardBody>
							</Card>
						</Col>
						<Col md="4">
							<Card className="card-shadow">
								<a href="#" className="img-ho" style={{ height: "250px" }}>
									<Image
										className="card-img-top"
										src={img2}
										alt="wrappixel kit"
									/>
								</a>
								<CardBody>
									<h5 className="font-medium m-b-0">House with 10 windows</h5>
									<p className="m-b-0 font-14">FourthWorld</p>
								</CardBody>
							</Card>
						</Col>
						<Col md="4">
							<Card className="card-shadow">
								<a href="#" className="img-ho" style={{ height: "250px" }}>
									<Image
										className="card-img-top"
										src={img3}
										alt="wrappixel kit"
									/>
								</a>
								<CardBody>
									<h5 className="font-medium m-b-0">The Learned Elephant</h5>
									<p className="m-b-0 font-14">JungleBookShelf</p>
								</CardBody>
							</Card>
						</Col>
						<Col md="4">
							<Card className="card-shadow">
								<a href="#" className="img-ho" style={{ height: "250px" }}>
									<Image
										className="card-img-top"
										src={img4}
										alt="wrappixel kit"
									/>
								</a>
								<CardBody>
									<h5 className="font-medium m-b-0">One storey boutique shop</h5>
									<p className="m-b-0 font-14">FourthWorld</p>
								</CardBody>
							</Card>
						</Col>
						<Col md="4">
							<Card className="card-shadow">
								<a href="#" className="img-ho" style={{ height: "250px" }}>
									<Image
										className="card-img-top"
										src={img5}
										alt="wrappixel kit"
									/>
								</a>
								<CardBody>
									<h5 className="font-medium m-b-0">Bear with honey combo</h5>
									<p className="m-b-0 font-14">JungleBookShelf</p>
								</CardBody>
							</Card>
						</Col>
						<Col md="4">
							<Card className="card-shadow">
								<a href="#" className="img-ho" style={{ height: "250px" }}>
									<Image
										className="card-img-top"
										src={img6}
										alt="wrappixel kit"
									/>
								</a>
								<CardBody>
									<h5 className="font-medium m-b-0">Knight with armor</h5>
									<p className="m-b-0 font-14">DevilNFairyClub</p>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="static-slider3 bg-light">
				<Container>
					<Row className="justify-content-center">
						<Col md="10" className="align-self-center text-center">
							<h1 className="title">
								I’m Priyanka Sachan, an{" "}
								<b className="font-bold">
									Student, Full-stack developer & Blockchain enthusiast
								</b>
								, Making{" "}
							</h1>
							<a
								className="btn btn-danger btn-md btn-arrow m-t-20"
								data-toggle="collapse"
								href="https://github.com/Priyanka-Sachan/"
							>
								<span>
									Checkout My Work <i className="ti-arrow-right"></i>
								</span>
							</a>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	)
}
