import React from "react"
import ErrorPage from "../containers/common/Error-wrapper"
import UnAuhtorizedImg from "../assets/images/svgs/undraw_investment_data_yfvt.svg"
const Page = props => {
  return (
    <ErrorPage
      header="تخطيت الحد الاقصي للاستخدام الشهري"
      img={UnAuhtorizedImg}
    />
  )
}

export default Page
