import { useState, useEffect, ReactNode } from "react";
import { ClerkContext, ClerkContextType } from "./ClerkContext";
import { useUser } from "@clerk/clerk-react";
import { useClerkFunction } from "../../hooks/ClerkFunction";

type Props = {
  children: ReactNode;
};

export const ClerkContextProvider = ({ children }: Props) => {
  const { user, isLoaded } = useUser();
  const [lawyerData, setLawyerData] = useState<ClerkContextType>({
    lawyerId: 0, 
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
      const lawyerId = user.unsafeMetadata.lawyerId as number | undefined;


      setLawyerData((prev) => ({
        ...prev,
        email: user.primaryEmailAddress?.emailAddress || "",
        firstName: firstName || "",
        userName: userName || "",
        phone: phone || "",
        lawyerId: lawyerId || 0,
        isLoading: false,
      }));
    }
  }, [isLoaded, user]);

  const { handleChange, handleUpdateUser } = useClerkFunction(lawyerData); 
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
