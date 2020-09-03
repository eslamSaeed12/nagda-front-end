import React from "react"
import { BounceLoader } from "react-spinners"
import PropTypes from "prop-types"
import { StyleSheet, css } from "aphrodite"

const styles = StyleSheet.create({
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    zIndex: 9999,
    overflow: "hidden",
  },
})
export const Loader = props => {
  return (
    <div className={css(styles.loaderWrapper)}>
      <BounceLoader
        size={props.size ? props.size : 60}
        color={props.color ? props.color : "#EB095E"}
      />
      <h5 className="mt-4">جاري التحميل</h5>
    </div>
  )
}

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}
