import * as React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Flex } from '@radix-ui/themes'
import { UserButton, useClerk } from '@clerk/clerk-react' // Import UserButton and Clerk hook

interface NavigationMenuProps {
  pages: { label: string; path: string }[]
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ pages }) => {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const location = useLocation()
  const { signOut } = useClerk()
  const userProfileUrl = '/profile'

  // Open the mobile navigation menu
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  // Close the mobile navigation menu
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
          anchor="right"
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {/* User Avatar */}
          <Box
            sx={{ padding: '1em', display: 'flex', justifyContent: 'center' }}
          >
            <UserButton showName userProfileUrl={userProfileUrl} />
          </Box>

          {/* User Options */}
          <MenuItem
            onClick={() => {
              window.location.href = userProfileUrl
            }}
          >
            <Typography variant='body2'>Manage Account</Typography>
          </MenuItem>
          <MenuItem onClick={() => signOut()}>
            <Typography variant='body2'>Sign Out</Typography>
          </MenuItem>
          <Divider orientation="horizontal" />
          {/* Navigation Pages */}
          {pages.map(({ label, path }) => (
            <MenuItem
              key={label}
              onClick={() => {
                handleCloseNavMenu()
                navigate(path)
              }}
            >
              <Typography variant="h6">{label}</Typography>
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
            <Button sx={{ textTransform: 'none' }} size="small" variant="text" key={label}>
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
            </Button>
          ))}
        </Flex>
      </Box>
    </>
  )
}

export default NavigationMenu
