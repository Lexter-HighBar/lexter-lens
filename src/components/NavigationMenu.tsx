import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

import { LogoImg } from '../LogoImg'
import NavigationMenu from '../NavigationMenu'
import SearchBar from '../SearchBar'

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
        <Toolbar sx={{ justifyContent: 'flex-end', flexDirection: { xs: 'row', md: 'row' } }}>
          {/* Display logo and navigation menu on medium and larger screens */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'left',
            }}
          >
            <LogoImg />
            <NavigationMenu pages={pages} />
          </Box>

          {/* Display logo on small screens */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              justifyContent: 'flex-start', // Align logo to the left
            }}
          >
            <LogoImg />
          </Box>

          {/* Display navigation menu (hamburger) on small screens */}
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-end', // Align to the right
              order: 2, // Ensure it is the last element
            }}
          >
            <NavigationMenu pages={pages} />
            {/* Include the UserButton outside of NavigationMenu */}
            <UserButton userProfileUrl="/profile" userProfileMode="navigation" />
          </Box>

          <Box sx={{ margin: '0 1.5em' }}>
            <SearchBar />
          </Box>

          {/* Display user button on medium and larger screens */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <UserButton userProfileUrl="/profile" userProfileMode="navigation" />
          </Box>
        </Toolbar>

        {/* Render any children components passed to ResponsiveAppBar */}
        {children}
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar
