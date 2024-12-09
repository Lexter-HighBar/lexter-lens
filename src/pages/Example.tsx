import { Button } from '@mui/material'
import { Page } from '../components/layout/Page'

// Content added directly into the Page component
export const Example = () => {
  return (
    <Page>
      <h1>Welcome to Lexter Lens</h1>
      <p>Simple example of styled content with Radix and MUI.</p>
      <Button
        variant="outlined"
        // use material sx to customize material components in place (for unique cases)
        sx={{ py: 20 }}
        onClick={() => alert('Button clicked!')}
      >
        Click Me
      </Button>
    </Page>
  )
}
