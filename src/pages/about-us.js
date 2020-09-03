import React from "react"
import { connect } from "react-redux"
import { Layout } from "../Layouts/app-layout"
import { Header } from "../containers/about-us/header"
import Team from "../data/about-us.json"
import { CardsWrapper } from "../containers/about-us/team-section"
import { WithPublicWrapper } from "../wrappers/public-wrapper"

const Page = props => {
  return (
    <Layout activeUrl="/about-us" {...props}>
      <Header />
      <CardsWrapper team={Team} />
    </Layout>
  )
}

const Wrapper = props => {
  return <WithPublicWrapper Component={Page} {...props} />
}

export default connect(st => st)(Wrapper)
