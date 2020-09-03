import React, { useState } from "react"
import { Col, Container, Collapse, Button } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import propTypes from "prop-types"
const Question = props => {
  const [open, setOpen] = useState(false)
  return (
    <Col className="my-5 mx-md-0 mx-auto" md={12} xs={11}>
      <div
        className="d-flex flex-row justify-content-between"
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <h4>{props.title}</h4>
        <Button color="warning" className="rounded-pill text-white">
          <FontAwesomeIcon icon={faArrowDown} size="2xl" />
        </Button>
      </div>
      <Collapse isOpen={open}>
        <p
          className="lead text-right py-2 px-2 rounded mt-4"
          style={{ backgroundColor: "#f8f8f8" }}
        >
          {props.description}
        </p>
      </Collapse>
      <hr />
    </Col>
  )
}

const IfProblem = props => {
  return (
    <Col>
      <p className="lead  text-center">
        في حالة ظهور اي اعطال او مشكله ما يمكنك التواصل معنا علي الرابط الاتي
        <br />
        <Button
          color="primary"
          onClick={() => props.navigate(props.url)}
          className="mt-4"
        >
          تواصل معنا
        </Button>
      </p>
    </Col>
  )
}

export const Questions = props => {
  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center display-4">الاسئلة</h2>
        {props.questionList.map((q, i) => {
          return <Question title={q.title} description={q.description} />
        })}
        <IfProblem url="/contact-us" navigate={props.navigate} />
      </Container>
    </section>
  )
}

Questions.propTypes = {
  questionList: propTypes.array.isRequired,
}
