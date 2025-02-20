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
  Dialog
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Flex } from '@radix-ui/themes'
import { UserButton } from '@clerk/clerk-react'
import Leaderboard from '../components/Leaderboard' // import Leaderboard

interface NavigationMenuProps {
  pages: { label: string; path: string }[]
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ pages }) => {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = React.useState(false) // status control Leaderboard Dialog
  const location = useLocation()
  const userProfileUrl = '/profile'

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
          anchor="right"
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          <Box sx={{ padding: '1em', display: 'flex', justifyContent: 'center' }}>
            <UserButton showName userProfileUrl={userProfileUrl} />
          </Box>

          {/* page menu */}
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

          <Divider />

          {/* Leaderboard menu botton */}
          <MenuItem
            onClick={() => {
              handleCloseNavMenu()
              setIsLeaderboardOpen(true) // open Leaderboard Dialog
            }}
          >
            <Typography variant="h6">Leaderboard</Typography>
          </MenuItem>
        </Drawer>
      </Box>

      {/* Leaderboard Dialog */}
      <Dialog
        open={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <Leaderboard />
      </Dialog>

      {/* Desktop Navigation */}
      <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, margin: '0 1.5em' }}>
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
