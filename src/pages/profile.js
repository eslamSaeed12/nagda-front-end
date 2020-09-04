import React from "react";
import { connect } from "react-redux";
import { Layout } from "../Layouts/app-layout";
import { HookAuthWrapper } from "../wrappers/Auth-wrapper";
import { ProfileContent } from "../containers/profile/container";

const ProfilePage = (props) => {
  return (
    <Layout activeUrl="/profile" {...props}>
      <ProfileContent
        usage={{
          max: {
            web: process.env.REACT_APP_MAX_WEB_USAGE,
            mob: process.env.REACT_APP_MAX_MOB_USAGE,
          },
        }}
        {...props}
      />
    </Layout>
  );
};

const HookAuth = (props) => {
  return <HookAuthWrapper Component={ProfilePage} {...props} />;
};

export default connect((st) => st)(HookAuth);
