import React from "react"
import { connect } from "react-redux"
import { Layout } from "../Layouts/app-layout"
import { Header } from "../containers/contact-us/header"
import { ConnectionSection } from "../containers/contact-us/section"
import { WithPublicWrapper } from "../wrappers/public-wrapper"
const Page = props => {
  return (
    <Layout activeUrl="/contact-us" {...props}>
      <Header />
      <ConnectionSection />
    </Layout>
  )
}

const Wrapper = props => {
  return <WithPublicWrapper Component={Page} {...props} />
}

export default connect(st => st)(Wrapper)
