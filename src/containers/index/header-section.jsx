import React, { Fragment } from "react"
import { StyleSheet, css } from "aphrodite"
import { Shape } from "../../components/shape"
import responsiveHeaderImg from "../../assets/images/svgs/responsie-header-img.svg"
import glassSvg from "../../assets/images/svgs/glass-img-effect.svg"
import { Col, Row, Container, Button } from "reactstrap"
import propTypes from "prop-types"
import clsx from "clsx"
const styles = StyleSheet.create({
  responsiveHeaderImg: {
    width: "85%",
  },
  imgWrapper: {
    "@media(max-width:991px)": {
      textAlign: "center",
    },
  },
  glassWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    "@media(max-width:991px)": {
      display: "none",
    },
  },
})

const LeftSection = props => {
  return (
    <Col lg={6}>
      <Shape
        img={responsiveHeaderImg}
        wrapperClass={clsx(css(styles.imgWrapper), "mt-lg-0 mt-5")}
        imgClass={css(styles.responsiveHeaderImg)}
      />
    </Col>
  )
}

const RightSection = props => {
  return (
    <Col lg={6}>
      <div>
        <h1 className="display-3 text-lg-right text-center">التطبيق الأول</h1>
        <h1 className="display-4 text-lg-right text-center">من نوعه في مصر</h1>
        <p className="text-lg-right text-center lead mt-4">
          حيث يمكن للمستخدم الوصول الي اقرب نقطه شرطه من موقعه الحالي في اسرع
          وقت ممكن
        </p>
        <div className="text-lg-left text-center">
          <Button
            color="outlined-primary"
            size="lg"
            className="text-right"
            onClick={() =>
              window.scrollTo({
                behavior: "smooth",
                top: 1100,
              })
            }
          >
            أقراء المزيد
          </Button>
        </div>
      </div>
    </Col>
  )
}

const GlassEffect = props => {
  return (
    <Fragment>
      <Shape img={props.img} wrapperClass={css(styles.glassWrapper)} />
    </Fragment>
  )
}

GlassEffect.propTypes = {
  img: propTypes.string.isRequired,
}

export const Header = props => {
  return (
    <div style={{ paddingTop: "5rem" }}>
      <Container>
        <Row>
          <RightSection />
          <LeftSection />
        </Row>
      </Container>
      <GlassEffect img={glassSvg} />
    </div>
  )
}
