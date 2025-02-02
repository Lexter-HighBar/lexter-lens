import { useContext } from "react";
import { ClerkContext, ClerkContextType } from "../lib/contexts/ClerkContext";

export const UseClerkStorage = (): ClerkContextType => {
    const context = useContext(ClerkContext);
    if (!context) {
      throw new Error('useLawyer must be used within a LawyerProvider');
    }
    return context;
  };