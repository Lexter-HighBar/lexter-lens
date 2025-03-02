import { ClerkProvider } from '@clerk/clerk-react'
import { RootRouter } from './RootRouter'
import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from '@mui/material'
import { theme } from './lib/theme'
import { ApiContextProvider } from './lib/contexts/ApiContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { UserDataApiProvider } from './lib/contexts/UserdataApiContextProvider'
import { ClerkContextProvider } from './lib/contexts/ClerkContextProvider'

// Import Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
})

function App() {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInFallbackRedirectUrl={'/'}
    >
      <QueryClientProvider client={queryClient}>
        <ApiContextProvider>
          <ClerkContextProvider>
            <UserDataApiProvider>
                <ThemeProvider theme={theme}>
                  <Theme radius="large" accentColor="blue">
                    <RootRouter />
                  </Theme>
                </ThemeProvider>
            </UserDataApiProvider>
          </ClerkContextProvider>
        </ApiContextProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default App
