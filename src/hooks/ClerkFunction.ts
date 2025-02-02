import { ClerkContextType } from '../lib/contexts/ClerkContext';
import { useUser } from '@clerk/clerk-react';

export const useClerkFunction = (lawyerData: ClerkContextType) => {
  const { user } = useUser();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    lawyerData.setLawyerData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    if (user) {
      try {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            firstName: lawyerData.firstName,
            userName: lawyerData.userName,
            phone: lawyerData.phone,
          },
        });
      } catch (error) {
        console.error("Error updating user information:", error);
      }
    }
  };

  return {
    handleChange,
    handleUpdateUser,
  };
};
