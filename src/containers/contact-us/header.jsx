import React from "react"
import { Shape } from "../../components/shape"
import { StyleSheet, css } from "aphrodite"
import clsx from "clsx"
import { Col, Container } from "reactstrap"
import connectUsImg from "../../assets/images/svgs/connectUsIMAGE.svg"
const styles = StyleSheet.create({
  img: {
    width: "100%",
  },
  headersWrapper: {
    position: "absolute",
    top: 0,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    height: "100%",
    justifyContent: "center",
  },
  responsiveHeader2: {
    "@media(max-width:991px)": {
      fontSize: "3rem",
    },
    "@media(max-width:776px)": {
      fontSize: "2.7rem",
    },
    "@media(max-width:557px)": {
      fontSize: "2rem",
    },
  },
  responsiveHeader3: {
    "@media(max-width:991px)": {
      fontSize: "2.5rem",
    },
    "@media(max-width:776px)": {
      fontSize: "2rem",
    },
    "@media(max-width:557px)": {
      fontSize: "1.5rem",
    },
  },
})

export const Header = props => {
  return (
    <header className="mt-lg-0 mt-4">
      <Col xs={12} className="position-relative">
        <Shape img={connectUsImg} imgClass={css(styles.img)} />
        <Container>
          <div className={css(styles.headersWrapper)}>
            <h2
              className={clsx(
                "display-3 text-right text-uppercase",
                css(styles.responsiveHeader2)
              )}
            >
              connect us
            </h2>
            <h2
              className={clsx(
                "display-4 text-right text-warning",
                css(styles.responsiveHeader3)
              )}
            >
              تواصل معنا
            </h2>
            <h6 className="text-right">التطبيق الاول من نوعه في مصر</h6>
          </div>
        </Container>
      </Col>
    </header>
  )
}
