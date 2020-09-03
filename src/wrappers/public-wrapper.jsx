import React from "react"
import { Loader } from "../components/loader"
import { Auth_Events } from "../store/actions/jobs"
import { useState } from "react"
import { useEffect } from "react"

export const WithPublicWrapper = ({ Component, auth, dispatch, ...args }) => {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  useEffect(() => {
    dispatch(Auth_Events.JWT_COOKIE_CHECKER_FN())
  }, [])

  useEffect(() => {
    if (auth.JWT_COOKIE_CHECKER_LOAD && auth.JWT_COOKIE_CHECKER_FAIL) {
      setAuthenticated(false)
      setLoading(false)
    }
    if (auth.JWT_COOKIE_CHECKER_LOAD && auth.JWT_COOKIE_CHECKER_SUCCESS) {
      setAuthenticated(true)
      setLoading(false)
    }
  }, [auth])

  if (loading) {
    return <Loader size={90} />
  }

  return (
    <Component
      auth={auth}
      dispatch={dispatch}
      authenticated={authenticated}
      {...args}
    />
  )
}
