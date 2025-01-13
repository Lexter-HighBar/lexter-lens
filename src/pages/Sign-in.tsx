import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { Page } from "../components/layout/Page";


const Signin: React.FC = () => {
  return (
    <Page>
      <SignIn
        appearance={{
          variables: {
            borderRadius: "8px",
          }
        }}
      />
    </Page>
  );
};

export default Signin;
