import React from "react"
import { connect } from "react-redux"
import { Layout } from "../Layouts/app-layout"
import { LoginContainer } from "../containers/login/container"
import { LoginHookWrapper } from "../wrappers/login-wrapper"

const Page = props => {
  return (
    <>
      <Layout activeUrl="/login" {...props}>
        <LoginContainer dispatcher={props.dispatch} />
      </Layout>
    </>
  )
}

const LoginHookComponent = props => {
  return (
    <LoginHookWrapper Component={Page} dispatch={props.dispatch} {...props} />
  )
}

export default connect(St => St)(LoginHookComponent)
