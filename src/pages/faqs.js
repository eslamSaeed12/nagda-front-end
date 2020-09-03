import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout } from "../Layouts/app-layout";
import { Header } from "../containers/faqs/header";
import { Questions } from "../containers/faqs/questions";
import { WithPublicWrapper } from "../wrappers/public-wrapper";
import FaqsForms from "../forms/faq-forms";
import { faqService } from "../services/faq-services";
import { Facebook } from "react-content-loader";
import { clientErrCatcher } from "../utils/client-error-catcher";
import { useHistory } from "react-router-dom";

const Page = (props) => {
  const [faqsLoading, setFaqsLoading] = useState(true);
  const [faqsList, setFaqsList] = useState(null);
  const [faqsClientErr, setFaqsClientErr] = useState(null);
  const navigate = useHistory().push;
  useEffect(() => {
    faqService
      .getFaqs(FaqsForms.allFaqs)
      .then((clientResponse) => {
        setFaqsList(clientResponse.data.body);
        setFaqsLoading(false);
      })
      .catch((clientErr) => {
        setFaqsClientErr(clientErrCatcher(clientErr));
        navigate("/internal-server-down");
      });
  }, []);

  return (
    <Layout activeUrl="/faqs" {...props}>
      <Header />
      {faqsLoading && !faqsClientErr ? (
        <Facebook />
      ) : (
        <Questions questionList={faqsList || []} navigate={navigate} />
      )}
    </Layout>
  );
};

const FaqsComponent = (props) => {
  return <WithPublicWrapper Component={Page} {...props} />;
};

export default connect((st) => st)(FaqsComponent);
