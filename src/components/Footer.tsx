import React, { useState } from 'react'
import logoDark from '../../assets/logoDark.svg'
import { Box, Link, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PrivacyPolicy from './PrivacyPolicy'

const linkStyle = {
  fontWeight: 500,
  color: 'primary.main',
  transition: 'color 0.3s ease',
  '&:hover': { color: 'secondary.main' },
  cursor: 'pointer',
  textDecoration: 'none'
}

const Footer: React.FC = () => {
  const [open, setOpen] = useState(false)

  const links = ['Home', 'Discussion']

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }}>
      <Container>
        {/* Main Links Section */}
        <Grid
          container
          direction="row"
          spacing={3}
          sx={{
            justifyContent: 'left',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Grid>
            <img src={logoDark} alt="Lexter Logo" />
          </Grid>

          {/* Navigation Links */}
          {links.map((text, index) => (
            <Grid key={index}>
              <Link href={`/${text.toLowerCase()}`} sx={linkStyle}>
                {text}
              </Link>
            </Grid>
          ))}

          {/* Privacy Policy Link */}
          <Grid>
            <Link onClick={() => setOpen(true)} sx={linkStyle}>
              Privacy Policy
            </Link>
          </Grid>

          {/* LinkedIn Icon */}
          <Grid display="flex" justifyContent="flex-end" flexGrow={1}>
            <Link
              href="https://www.linkedin.com/company/lexter-legal-recruiting"
              target="_blank"
              rel="noopener"
            >
              <LinkedInIcon />
            </Link>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Grid container justifyContent="flex-end">
          <Grid textAlign="right">
            <Box>© {new Date().getFullYear()} Lexter</Box>
            <Box>All rights reserved</Box>
          </Grid>
        </Grid>
      </Container>

      {/* Privacy Policy Dialog */}
      <PrivacyPolicy open={open} handleClose={() => setOpen(false)} />
    </Box>
  )
}

export default Footer
