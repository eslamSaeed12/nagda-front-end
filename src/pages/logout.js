import React, { useEffect, useState } from "react";
import { Auth_Events } from "../store/actions/jobs";
import { connect } from "react-redux";
import { Loader } from "../components/loader";
import { HookAuthWrapper } from "../wrappers/Auth-wrapper";
import { useHistory } from "react-router-dom";
const LogoutPage = (props) => {
  const dispatcher = props.dispatch;
  const [loading, setLoading] = useState(true);
  const [logOutErr, setLogdOutERR] = useState(null);
  const [logedOutDone, setLogedOutDone] = useState(null);
  const router = useHistory();
  useEffect(() => {
    dispatcher(Auth_Events.AUTH_LOGOUT_FN());
  }, []);

  useEffect(() => {
    if (props.auth.LOGOUT_LOAD && props.auth.LOGOUT_SUCCESS) {
      setLoading(false);
      setLogedOutDone(true);
    }

    if (props.auth.LOGOUT_LOAD && props.auth.LOGOUT_FAIL) {
      setLogdOutERR(true);
      setLoading(false);
    }
  }, [props.auth]);

  useEffect(() => {
    if (logOutErr) {
      router.push("/404");
    }
  }, [logOutErr]);

  useEffect(() => {
    if (!logOutErr && !loading && logedOutDone) {
      router.push("/");
    }
  }, [logedOutDone]);

  return <Loader size={90} />;
};

const WithAuthHook = (props) => {
  return (
    <HookAuthWrapper
      Component={LogoutPage}
      auth={props.auth}
      dispatch={props.dispatch}
      {...props}
    />
  );
};

export default connect((st) => st)(WithAuthHook);
