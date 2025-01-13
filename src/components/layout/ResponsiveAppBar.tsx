import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

import { LogoImg } from '../LogoImg'
import NavigationMenu from '../NavigationMenu' 

import { UserButton } from '@clerk/clerk-react'

// Define the navigation menu items
const pages = [
  { label: 'Home', path: '/' },
  { label: 'Lawyers', path: '/lawyers' },
  { label: 'Discussion', path: '/discussion' },
]

interface ResponsiveAppBarProps {
  children?: React.ReactNode
}

// ResponsiveAppBar component
function ResponsiveAppBar({ children }: ResponsiveAppBarProps) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'flex-end', flexDirection: { xs: 'row-reverse', md: 'row' } }}>
          {/* Display logo and navigation menu on medium and larger screens */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
            }}
          >
            <LogoImg />
            <NavigationMenu pages={pages} />
          </Box>

          {/* Display navigation menu on small screens */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <NavigationMenu pages={pages} />
          </Box>

          {/* Display logo on small screens */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              flexDirection: 'row-reverse',
            }}
          >
            <LogoImg />
          </Box>

          {/* Display user button */}
          <Box>
            <UserButton />
          </Box>
        </Toolbar>

        {/* Render any children components passed to ResponsiveAppBar */}
        {children}
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar
