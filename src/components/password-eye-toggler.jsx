import propTypes from "prop-types"
import React from "react"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StyleSheet, css } from "aphrodite"
import clsx from "clsx"

const styles = props =>
  StyleSheet.create({
    wrapper: {
      top: props.top,
      left: props.left,
    },
    eyeIcon: {
      opacity: 0.7,
      cursor: "pointer",
      transition: "opacity 0.15s ease",
      ":hover": {
        opacity: 1,
      },
    },
  })

export const PasswordEyeToggler = props => {
  const invokdedStyles = styles({ top: props.top, left: props.left })
  return (
    <div className={clsx(css(invokdedStyles.wrapper), "position-absolute")}>
      <FontAwesomeIcon
        icon={faEye}
        size={props.size}
        className={clsx("position-absolute", css(invokdedStyles.eyeIcon))}
        onClick={props.onClick}
      />
    </div>
  )
}

PasswordEyeToggler.propTypes = {
  top: propTypes.string.isRequired,
  left: propTypes.string.isRequired,
  size: propTypes.string.isRequired,
  onClick: propTypes.func,
}
