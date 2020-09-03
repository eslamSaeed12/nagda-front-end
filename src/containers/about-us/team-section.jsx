import React, { useState } from "react"
import { StyleSheet, css } from "aphrodite"
import clsx from "clsx"
import {
  Col,
  Container,
  Row,
  Badge,
  Button,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
} from "reactstrap"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faGithub,
  faBehance,
} from "@fortawesome/free-brands-svg-icons"
import { faAt } from "@fortawesome/free-solid-svg-icons"

const icons = {
  facebook: faFacebook,
  github: faGithub,
  behance: faBehance,
  email: faAt,
}
const styles = StyleSheet.create({
  card: {
    borderRadius: "50px",
    transition: "transform 0.25s ease",
    boxShadow: `20px 20px 60px #bdbdbd, 
    -20px -20px 60px #ffffff`,
    ":hover": {
      transform: "scale(1,1.1)",
    },
  },
  cardImg: {
    width: "100%",
    height: "200px",
    borderRadius: "29px",
  },
  headersWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
})

const TeamCard = props => {
  return (
    <Col
      lg={5}
      sm={8}
      xs={8}
      className={clsx(css(styles.card), "py-4", "mx-lg-2 mx-auto", "my-4")}
    >
      <Row className="flex-sm-row flex-column">
        <Col sm={6} xs={10} className="mx-sm-0 mx-auto">
          <img src={props.img} className={css(styles.cardImg)} />
        </Col>
        <Col sm={6} xs={12} className={clsx(css(styles.headersWrapper),"my-sm-0 my-3")}>
          <h5>{props.fullname}</h5>
          <h5>
            <Badge
              color="warning"
              className="text-white"
              style={{ direction: "ltr" }}
            >
              {props.jobTitle} - {props.age}
            </Badge>
          </h5>
          <p className="text-muted">{props.role}</p>
          <div className="d-flex flex-row">
            {props.social.map((s, i) => {
              if (s.icon === "email") {
                let id =
                  s.icon + (Math.round(Math.random() * 1000) + i).toString()
                return (
                  <div>
                    <Button
                      color="outlined-warning mx-1"
                      className="rounded-pill"
                      key={s.fullname + i}
                      id={id}
                    >
                      <FontAwesomeIcon icon={icons[s.icon]} size={"1x"} />
                    </Button>
                    <UncontrolledPopover target={id}>
                      <PopoverHeader
                        className="text-left"
                        style={{ direction: "ltr" }}
                      >
                        {s.icon}
                      </PopoverHeader>
                      <PopoverBody>{s.link}</PopoverBody>
                    </UncontrolledPopover>
                  </div>
                )
              }
              return (
                <Button
                  color="outlined-warning mx-1"
                  className="rounded-pill"
                  key={s.fullname + i}
                >
                  <a href={s.link} target="_blank">
                    <FontAwesomeIcon icon={icons[s.icon]} size={"1x"} />
                  </a>
                </Button>
              )
            })}
          </div>
        </Col>
      </Row>
    </Col>
  )
}

export const CardsWrapper = props => {
  return (
    <section className="mt-5 py-4">
      <Container>
        <h2 className="text-center">فريقنا</h2>
        <Row style={{ justifyContent: "space-between" }}>
          {props.team.map((t, i) => {
            return (
              <TeamCard
                img={t.img}
                key={t.fullname + i}
                jobTitle={t.jobTitle}
                age={t.age}
                role={t.role}
                fullname={t.fullname}
                social={t.social}
              />
            )
          })}
        </Row>
      </Container>
    </section>
  )
}

CardsWrapper.propTypes = {
  team: PropTypes.array.isRequired,
}
