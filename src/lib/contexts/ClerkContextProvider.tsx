import { useState, useEffect, ReactNode } from "react";
import { ClerkContext, ClerkContextType } from "./ClerkContext";
import { useClerkFunction } from "../../hooks/useClerkFunction";  // Import functions here
import { useUser } from "@clerk/clerk-react";

type Props = {
  children: ReactNode;
};

export const ClerkContextProvider = ({ children }: Props) => {
  const { user, isLoaded } = useUser();
  const [lawyerData, setLawyerData] = useState<ClerkContextType>({
    email: "",
    firstName: "",
    userName: "",
    phone: "",
    isLoading: true,
    setLawyerData: () => {},
    handleChange: () => {},
    handleUpdateUser: () => {},
  });

  useEffect(() => {
    if (isLoaded && user) {
      const firstName = user.unsafeMetadata.firstName as string | undefined;
      const userName = user.unsafeMetadata.userName as string | undefined;
      const phone = user.unsafeMetadata.phone as string | undefined;

      setLawyerData((prev) => ({
        ...prev,
        email: user.primaryEmailAddress?.emailAddress || "",
        firstName: firstName || "",
        userName: userName || "",
        phone: phone || "",
        isLoading: false,
      }));
    }
  }, [isLoaded, user]);

  const { handleChange, handleUpdateUser } = useClerkFunction(lawyerData);  // Use the functions here

  return (
    <ClerkContext.Provider
      value={{
        ...lawyerData,
        setLawyerData,
        handleChange,
        handleUpdateUser,
      }}
    >
      {children}
    </ClerkContext.Provider>
  );
};
