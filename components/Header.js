import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
} from "reactstrap";
import { ConnectButton } from "@web3uikit/web3";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="topbar" id="top">
      <div className="header6">
        <Container className="po-relative">
          <Navbar className="navbar-expand-lg h6-nav-bar">
            <NavbarBrand href="/">
              <h3>NFT Unboxed</h3>
            </NavbarBrand>
            <NavbarToggler onClick={toggle}>
              <span className="ti-menu"></span>
            </NavbarToggler>
            <Collapse
              isOpen={isOpen}
              navbar
              className="hover-dropdown ml-auto"
              id="h6-info"
              style={{ justifyContent: 'flex-end' }}
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
  );
};

export default Header;

