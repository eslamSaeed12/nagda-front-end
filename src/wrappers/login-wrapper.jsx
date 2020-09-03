import React from "react";
import { Loader } from "../components/loader";
import { Auth_Events } from "../store/actions/jobs";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const LoginHookWrapper = (props) => {
  const navigate = useHistory().push;

  const [loading, setLoading] = useState(true);
  const [authentcated, setauthentcated] = useState(false);

  useEffect(() => {
    props.dispatch(Auth_Events.JWT_COOKIE_CHECKER_FN());
  }, []);

  useEffect(() => {
    if (
      props.auth.JWT_COOKIE_CHECKER_LOAD &&
      props.auth.JWT_COOKIE_CHECKER_SUCCESS
    ) {
      navigate("/");
    }
    if (
      props.auth.JWT_COOKIE_CHECKER_LOAD &&
      props.auth.JWT_COOKIE_CHECKER_FAIL
    ) {
      setauthentcated(false);
      setLoading(false);
    }
  }, [props.auth]);

  if (!authentcated && !loading) {
    return (
      <props.Component
        authenticated={authentcated}
        dispatch={props.dispatch}
        {...props}
      />
    );
  }

  return <Loader size={90} />;
};
