import React, { useState, useRef } from "react";
import propTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  Container,
} from "reactstrap";

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    top: 0,
    transition: "background-color 0.15s ease",
  },
  logoWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  hedings: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
  },
  UColorfulLink: {
    color: "unset",
  },
  navLinkWhite: {
    color: "#ffff",
  },
});

const NavbarComponent = (props) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const navBarRef = useRef(null);

  return (
    <div ref={navBarRef}>
      <Navbar expand="lg">
        <Container>
          <NavbarBrand href="/" color="primary" className="mr-0">
            <span className={clsx(css(styles.logoWrapper))}>
              <span className={clsx(css(styles.hedings), "ml-2")}>
                <h1 className={clsx("display-4 font-body", props.headingClass)}>
                  {props.headline}
                </h1>
                <h1 className={clsx("h3 text-uppercase font-body")}>
                  {props.subHeadline}
                </h1>
              </span>
              <span className="mt-3">
                <img src={props.logoImage} style={{ width: "72px" }} />
              </span>
            </span>
          </NavbarBrand>
          <button
            onClick={() => setCollapseOpen(!collapseOpen)}
            className="navbar-toggler btn btn-primary"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Collapse isOpen={collapseOpen} navbar>
            <Nav className="mr-auto" navbar>
              {props.listItems.map((n, id) => {
                return (
                  <NavItem
                    key={`${n}-${id}`}
                    className={clsx(
                      props.itemsClassName,
                      props.URL_acitve === props.hrefs[id]
                        ? "active-primary"
                        : ""
                    )}
                  >
                    <Link to={props.hrefs[id]}>
                      <a
                        className={clsx(
                          "text-lg-right text-center",
                          "nav-link"
                        )}
                        style={{ fontSize: "18px" }}
                      >
                        {n}
                      </a>
                    </Link>
                  </NavItem>
                );
              })}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
