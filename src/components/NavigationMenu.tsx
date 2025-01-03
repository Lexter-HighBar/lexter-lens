import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Box,

  Drawer,

  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Flex } from '@radix-ui/themes'

interface NavigationMenuProps {
  pages: { label: string; path: string }[]
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const location = useLocation() // Get the current location

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <>
      {/* Mobile Navigation */}
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          flexDirection: 'row-reverse',
        }}
      >
        <IconButton
          size="large"
          aria-label="open navigation menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          id="menu-appbar"
        
         
          anchor='right'
         
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
         
        >
          {pages.map(({ label, path }) => (
            <MenuItem key={label} onClick={handleCloseNavMenu}>
              <Typography>
                <Link
                  to={path}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    fontWeight: location.pathname === path ? 'bold' : 'normal', // Highlight current page
                  }}
                >
                  {label}
                </Link>
              </Typography>
            </MenuItem>
          ))}
        </Drawer>
      </Box>

      {/* Desktop Navigation */}
      <Box
        sx={{
          flexGrow: 0,
          display: { xs: 'none', md: 'flex' },
          margin: '0 1.5em',
        }}
      >
        <Flex>
          {pages.map(({ label, path }) => (
            <IconButton key={label}>
              <Link to={path} style={{ textDecoration: 'none' }}>
                <Typography variant="body1">
                  <Box
                    component="span"
                    sx={{
                      padding: '.5em',
                      fontWeight: location.pathname === path ? '800' : '350', 
                      color: 'primary.contrastText',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: 'secondary.main',
                      },
                    }}
                  >
                    {label}
                  </Box>
                </Typography>
              </Link>
            </IconButton>
          ))}
        </Flex>
      </Box>
    </>
  )
}

export default NavigationMenu
