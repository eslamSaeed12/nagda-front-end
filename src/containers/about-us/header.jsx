import React from "react"
import { Shape } from "../../components/shape"
import { StyleSheet, css } from "aphrodite"
import clsx from "clsx"
import WhoWeAreImg from "../../assets/images/svgs/2498169.svg"
import { Col, Container } from "reactstrap"
const styles = StyleSheet.create({
  img: {
    width: "100%",
    /*    "@media(max-width:776px)": {
      height: "350px",
    }, */
  },
  headersWrapper: {
    height: "100%",
    width: "100%",
    top: 0,
    right: 0,
  },
  display3Responsive: {
    "@media(max-width:776px)": {
      fontSize: "3rem",
    },
  },
  display4Responsive: {
    "@media(max-width:776px)": {
      fontSize: "2rem",
    },
  },
})

export const Header = props => {
  return (
    <div>
      <Col xs={12} className="position-relative">
        <Shape img={WhoWeAreImg} imgClass={css(styles.img)} />
        <Container>
          <div
            className={clsx(css(styles.headersWrapper), "position-absolute")}
          >
            <div className="mt-lg-5 mt-0">
              <h2
                className={clsx(
                  "display-3 text-center text-uppercase",
                  css(styles.display3Responsive)
                )}
                style={{ direction: "ltr" }}
              >
                who we are ?
              </h2>
              <h2
                className={clsx(
                  "display-4 text-warning text-center",
                  css(styles.display4Responsive)
                )}
              >
                من نحن
              </h2>
            </div>
          </div>
        </Container>
      </Col>
    </div>
  )
}
