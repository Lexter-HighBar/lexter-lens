import { styled } from '@mui/material';
import { Flex } from '@radix-ui/themes';

export const Page = styled(Flex)({
  flexDirection: 'column',
  alignItems: 'center',
 
  margin: '0 auto',
  padding: 20,
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
});
