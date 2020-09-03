import React from "react"
import { Toast, ToastBody, ToastHeader } from "reactstrap"
import PropTypes from "prop-types"
export const ToastC = props => {
  return (
    <section
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "0",
        zIndex: 466,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Toast isOpen={props.isOpen} className={`${props.variant} text-white`}>
        <ToastHeader className={"text-right"}>{props.title}</ToastHeader>
        <ToastBody className="text-center">
          {Array.isArray(props.error && props.body) ? (
            <ul>
              {props.body.forEach((err, i) => {
                return (
                  <li key={i + (Math.random() * 1000).toFixed(2)}>{err}</li>
                )
              })}
            </ul>
          ) : (
            props.body
          )}
        </ToastBody>
      </Toast>
    </section>
  )
}

ToastC.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf([
    "bgc-primary",
    "bgc-success",
    "bgc-warning",
    "bgc-danger",
  ]).isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.any.isRequired,
  error: PropTypes.bool,
}
