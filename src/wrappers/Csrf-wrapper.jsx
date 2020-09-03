import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AuthForms from "../forms/auth-forms";
import { AuthServicesInstance } from "../services/auth-services";
import { Loader } from "../components/loader";
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";

const CsrfWrapper = (props) => {
  const navigate = useHistory().push;
  const [loading, setLoading] = useState(true);
  const [CSRF_TOKEN, setCSRF_TOKEN] = useState();

  useEffect(() => {
    AuthServicesInstance.csrf_token(AuthForms.csrfToken)
      .then((response) => {
        setCSRF_TOKEN(response.data.token);
        setLoading(false);
      })
      .catch((resErr) => {
        navigate("/internal-server-down");
        setLoading(false);
      });
  }, []);

  if (!loading && CSRF_TOKEN) {
    return (
      <>
        <Helmet>
          <meta name="X-CSRF-TOKEN" content={CSRF_TOKEN} />
        </Helmet>
        {props.children}
      </>
    );
  }

  return <Loader size={90} />;
};

export default connect((st) => st)(CsrfWrapper);
