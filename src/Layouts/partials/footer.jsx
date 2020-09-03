import React from "react"
import { Container } from "reactstrap"

export const Footer = props => {
  return (
    <footer className="bgc-secondary py-4">
      <Container>
        <div
          className="d-flex flex-row justify-content-between text-capitalize"
          style={{ direction: "ltr" }}
        >
          <h6 className="text-white d-inline">
            جميع الحقوق محفوظه - فريق عمل <bdi>think-first</bdi>
          </h6>
          <h6
            className="text-white d-inline text-capitalize"
            style={{ direction: "ltr" }}
          >
            تطبيق نجده للوصول الي النقاط الشرطيه
          </h6>
        </div>
      </Container>
    </footer>
  )
}
