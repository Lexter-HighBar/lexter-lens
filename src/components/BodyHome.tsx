import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import backgroundImg from '../../assets/golexter-web-pattern.png'
import heroImg from '../../assets/golexter_smiling_lawyer_male_shape.png'

const BodyHome: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between', // Align text on the left and image on the right
        alignItems: 'center', // Vertically center the content
        backgroundImage: { backgroundImg },
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '0 .5rem', // Adds some padding for spacing
       overflow: 'hidden',
       width: '100%',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h1"
          sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}
        >
          Welcome to Lexter Lens
        </Typography>
        <Typography variant="h5" sx={{ color: 'primary.dark', mb: 4 }}>
          Driving a new era in legal career decisions.
        </Typography>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          onClick={() => navigate('/discussion')}
          
        >

          <Typography noWrap variant="body1">Join the Discussion</Typography>
        </Button>
      </Box>

      {/* Feature image */}
      <Box
        sx={{
          flex: 1,
          textAlign: 'right',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <img
          src={heroImg}
          alt="Feature"
          style={{ maxWidth: '50dvw', maxHeight: '50dvh' }}
        />
      </Box>
    </Box>
  )
}

export default BodyHome
