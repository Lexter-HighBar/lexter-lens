import { createContext } from "react";

export interface ClerkContextType {
  lawyerId: number ;
  email: string | undefined;
  firstName: string | undefined;
  userName: string | undefined;
  phone: string | undefined;
  isLoading: boolean;
  setLawyerData: React.Dispatch<React.SetStateAction<ClerkContextType>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateUser: () => void;
}

export const ClerkContext = createContext<ClerkContextType | undefined>(undefined);
