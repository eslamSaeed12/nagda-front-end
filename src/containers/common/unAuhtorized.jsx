import React from "react"
import ErrorPage from "./Error-wrapper"
import UnAuhtorizedImg from "../../assets/images/svgs/undraw_secure_login_pdn4.svg"
const Page = props => {
  return (
    <ErrorPage header="غير مصرح لك بالدخول لهذه الصفحة" img={UnAuhtorizedImg} />
  )
}

export default Page
