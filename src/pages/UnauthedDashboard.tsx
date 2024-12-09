import { Link } from 'react-router-dom'
import { Page } from '../components/layout/Page'
import { Typography } from '@mui/material'

export const UnauthedDashboard = () => {
  return (
    <Page>
      <Typography>You must be signed in to view this page</Typography>
      <Link to="/sign-in">Sign In</Link>
    </Page>
  )
}
