import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

import { LogoImg } from '../LogoImg'
import NavigationMenu from '../NavigationMenu' 

import { UserButton } from '@clerk/clerk-react'


const pages = [
 
  { label: 'Example', path: '/example' },
  { label: 'Lawyers', path: '/lawyers' },
]





interface ResponsiveAppBarProps {
  children?: React.ReactNode
}

function ResponsiveAppBar({ children }: ResponsiveAppBarProps) {
  
 

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'flex-end', flexDirection: {xs: 'row-reverse', md: 'row'}}}>
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
          {/* Navigation Menu */}
          <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'flex', md: 'none' },
            
          }}
          >
            <NavigationMenu pages={pages} />
          </Box>{' '}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center', flexDirection: 'row-reverse'
            }}
          >
            <LogoImg />
          </Box>
          <Box>
            <UserButton/>
            {/* <NavigationMenu pages={authLinks} /> */}
          </Box>
         
        </Toolbar>

        {children}
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar
