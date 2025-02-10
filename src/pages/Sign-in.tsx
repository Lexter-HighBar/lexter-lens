import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { Page } from "../components/layout/Page";


const Signin: React.FC = () => {
  return (
    <Page sx={{mt:10}}>
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
