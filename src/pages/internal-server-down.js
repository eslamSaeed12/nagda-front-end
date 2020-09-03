import React from "react"
import ErrorPage from "../containers/common/Error-wrapper"
import ErrorEventImg from "../assets/images/svgs/undraw_server_down_s4lk.svg"

const Page = props => {
  return <ErrorPage header="حدث عطل ما في مزود الخدمة" img={ErrorEventImg} />
}

export default Page
