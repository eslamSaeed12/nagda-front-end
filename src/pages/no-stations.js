import React from "react"
import ErrorPage from "../containers/common/Error-wrapper"
import ErrorEventImg from "../assets/images/svgs/undraw_empty_xct9.svg"

const Page = props => {
  return (
    <ErrorPage
      header="خطأ في مزود البيانات"
      img={ErrorEventImg}
      content={
        "نعتذر بيانات نقاط الشرطه غيرر متاحة الان , سوف نعمل علي اصلاح ذلك"
      }
      {...props}
    />
  )
}

export default Page
