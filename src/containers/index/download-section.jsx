import React, { Fragment } from "react";
import { StyleSheet, css } from "aphrodite";
import { Col, Row, Container, Button } from "reactstrap";
import clsx from "clsx";
import { faChrome, faAndroid } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chromeImg from "../../assets/images/svgs/chrome-img.svg";
import mobileImg from "../../assets/images/svgs/mobile-phone-img.svg";
import { useHistory } from "react-router-dom";

const styles = StyleSheet.create({
  shadowAbleSection: {
    boxShadow: `-20px 20px 60px #c2c2c2, 
    20px -20px 60px #ffffff`,
    borderRadius: "50px",
    "@media(min-width:991px)": {
      margin: "0 auto",
    },
  },
  textsWrapper: {
    display: "flex",
    alignItems: "center",
    "@media(max-width:991px)": {
      flexDirection: "column",
    },
  },
});

const RightSection = (props) => {
  const navigate = useHistory().push;
  const downloadable = [
    {
      title: "تطبيق الويب",
      href: "/web-app",
      icon: faChrome,
      img: chromeImg,
      id: "web-app",
    },
    {
      title: "تطبيق الاندرويد",
      href: "/download-android-version",
      icon: faAndroid,
      img: mobileImg,
      id: "android-app",
    },
  ];

  return (
    <Row>
      {downloadable.map((d) => {
        return (
          <Fragment>
            <Col
              style={{ zIndex: "50", position: "relative" }}
              key={d.id}
              className={clsx(css(styles.shadowAbleSection), "py-4", "my-3")}
              lg={5}
            >
              <div className="d-flex flex-column align-items-center">
                <img src={d.img} style={{ height: "143px", zIndex: 50 }} />
                <div className="mt-4">
                  <Button
                    onClick={() => navigate(d.href)}
                    color="warning"
                    className="rounded-pill text-white d-flex"
                    size="lg"
                    style={{ zIndex: 50 }}
                  >
                    <FontAwesomeIcon icon={d.icon} size="2x" />
                    <span className="mr-2">{d.title}</span>
                  </Button>
                </div>
              </div>
            </Col>
          </Fragment>
        );
      })}
    </Row>
  );
};

export const Download = (props) => {
  return (
    <section
      className={clsx("pt-3", "pb-5", "mt-5")}
      style={{ backgroundColor: "#f8f8f8" }}
    >
      <h2 className="display-4 text-center d-lg-block d-none">تحميل</h2>
      <Container className="mt-5">
        <Row>
          <Col lg={4} className={css(styles.textsWrapper)}>
            <h2 className="display-4 mb-lg-0 mb-5 text-lg-right text-center">
              جرب التطبيق علي المنصتين
            </h2>
          </Col>
          <Col xs={8} className="mx-lg-0 mx-auto">
            <RightSection />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
