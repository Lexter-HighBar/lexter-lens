import { styled } from '@mui/material';
import { Flex } from '@radix-ui/themes';

export const Page = styled(Flex)({
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  width: '90%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 20,
  marginTop:60,
  backgroundColor: '#fff',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
});
