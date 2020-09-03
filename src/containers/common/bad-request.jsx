import React from "react"
import ErrorPage from "./Error-wrapper"
import ErrorEventImg from "../../assets/images/svgs/undraw_bug_fixing_oc7a.svg"

const Page = props => {
  return (
    <ErrorPage
      header="نأسف لحدوث خطا ما"
      img={ErrorEventImg}
      content={props.state.params.error}
      {...props}
    />
  )
}

export default Page
