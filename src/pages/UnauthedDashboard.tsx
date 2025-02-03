import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import {  UserRoundX } from 'lucide-react';
import { Page } from '../components/layout/Page';
export const UnauthedDashboard = () => {
  return (
    <Page>
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} p={10}>
      <UserRoundX size={50} />
      <Typography>Please sign in to view this page.</Typography>
      <Link to="/sign-in">Sign In</Link>
      </Box>
      </Page>
  )
}
