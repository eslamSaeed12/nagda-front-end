import React, { useState } from "react";
import Nav from "./partials/nav-bar";
import { Footer } from "./partials/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import clsx from "clsx";
import StrictErrorWrapper from "../containers/common/Strict-Error-Wrapper";
import LogoImg from "../assets/images/logo.png";

const ToTopScroller = (props) => {
  return (
    <div style={{ position: "fixed", bottom: "1rem", right: "1rem" }}>
      <Button
        color="primary"
        className={clsx(
          "rounded shadow-lg",
          props.isOpen ? "d-blokc" : "d-none"
        )}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FontAwesomeIcon size="2x" icon={faArrowUp} />
      </Button>
    </div>
  );
};

const LayoutComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [Hrefs, setHrefs] = useState([
    "/",
    "/login",
    "/contact-us",
    "/about-us",
    "/faqs",
  ]);
  const [AuthHrefs, setAuthHrefs] = useState([
    "/",
    "/profile",
    "/web-app",
    "/contact-us",
    "/about-us",
    "/faqs",
    "/logout",
  ]);

  const [navList, setNavList] = useState([
    "الرئيسية",
    "تسجيل دخول",
    "تواصل معنا",
    "من نحن",
    "اسئلة مكرره",
  ]);
  const [AuthnavList, setAuthnavList] = useState([
    "الرئيسية",
    "الصفحة الشخصية",
    "التطبيق",
    "تواصل معنا",
    "من نحن",
    "اسئلة مكرره",
    "تسجيل الخروج",
  ]);

  return (
    <StrictErrorWrapper>
      <div className="position-relative">
        <Nav
          headline="نجدة"
          subHeadline="nagdaa"
          listItems={!props.authenticated ? navList : AuthnavList}
          hrefs={!props.authenticated ? Hrefs : AuthHrefs}
          URL_acitve={props.activeUrl}
          itemsClassName={props.itemsClassName}
          logoImage={LogoImg}
        />

        {props.children}
        <ToTopScroller isOpen={isOpen} />
        <Footer />
      </div>
    </StrictErrorWrapper>
  );
};

export const Layout = (props) => {
  return <LayoutComponent {...props}>{props.children}</LayoutComponent>;
};

export default Layout;
