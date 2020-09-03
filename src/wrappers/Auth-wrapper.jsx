import React from "react";
import { Loader } from "../components/loader";
import { Auth_Events } from "../store/actions/jobs";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const HookAuthWrapper = ({ dispatch, auth, Component, ...args }) => {
  const navigate = useHistory().push;
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    dispatch(Auth_Events.JWT_COOKIE_CHECKER_FN());
  }, []);

  useEffect(() => {
    if (auth.JWT_COOKIE_CHECKER_LOAD && auth.JWT_COOKIE_CHECKER_FAIL) {
      setRedirect(true);
      navigate("/login");
    }

    if (auth.JWT_COOKIE_CHECKER_LOAD && auth.JWT_COOKIE_CHECKER_SUCCESS) {
      setLoading(false);
    }
  }, [auth]);

  if (!redirect && !loading) {
    return (
      <Component
        dispatch={dispatch}
        authenticated={!redirect}
        auth={auth}
        {...args}
      />
    );
  }
  return <Loader size={90} />;
};
