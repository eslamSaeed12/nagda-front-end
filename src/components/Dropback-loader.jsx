import React from "react"
import { HashLoader } from "react-spinners"

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
    backgroundColor: "#0a0a0a80",
    zIndex: 9999,
    overflow: "hidden",
  },
})
export const DropbBackLoader = props => {
  return (
    <div className={css(styles.loaderWrapper)}>
      <HashLoader
        size={props.size ? props.size : 60}
        color={props.color ? props.color : "#ffff"}
      />
      <h5 className="mt-4 text-white">جاري التحميل</h5>
    </div>
  )
}

DropbBackLoader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}
