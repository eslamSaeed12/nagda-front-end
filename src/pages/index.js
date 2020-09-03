import React from "react";
import { connect } from "react-redux";
import { Layout } from "../Layouts/app-layout";
import { Shape } from "../components/shape";
import { StyleSheet, css } from "aphrodite";
import headerShape from "../assets/images/svgs/opacity-shape.svg";
import { Header } from "../containers/index/header-section";
import { AboutApp } from "../containers/index/about-app-section";
import { Download } from "../containers/index/download-section";
import { WithPublicWrapper } from "../wrappers/public-wrapper";
import clsx from "clsx";
const styles = StyleSheet.create({
  shapeWrapper: {
    position: "absolute",
    left: 0,
    top: 0,
    "@media(max-width:1199px)": {
      width: "60%",
    },
  },
  whiteLinks: {
    "@media(min-width:991px)": {
      color: "#ffff",
    },
  },
});

const HomeComponent = (props) => {
  return (
    <Layout activeUrl="/" itemsClassName={css(styles.whiteLinks)} {...props}>
      <Shape
        img={headerShape}
        wrapperClass={clsx(css(styles.shapeWrapper), "d-lg-block d-none")}
      />
      <Header />
      <Download />
      <AboutApp />
    </Layout>
  );
};
function Home(props) {
  return <WithPublicWrapper {...props} Component={HomeComponent} />;
}

export default connect((st) => st)(Home);
