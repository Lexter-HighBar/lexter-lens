import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import webPattern from '../../assets/golexter-web-pattern.png'
import smilingLawyer from '../../assets/golexter_smiling_lawyer_male_shape.png'

import Forum from '@mui/icons-material/Forum';

const BodyHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stack content on mobile
        justifyContent: "center", // Center content for both mobile & desktop
        alignItems: "center",
        backgroundImage: "url('"+webPattern+"')",
        backgroundSize: "contain", // Keeps pattern proportional
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: { xs: "40px 20px", md: "0 40px" },
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "50%" } }}>
        <Typography
          variant="h3"
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Welcome to Lexter Lens
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "primary.dark",
            mb: 4,
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          Driving a new era in legal career decisions.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/discussion")}
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: { xs: "0.875rem", md: "1rem" },
            padding: { xs: "8px 16px", md: "12px 24px" },
          }}
          startIcon={<Forum />}
        >
          Join the Discussion
        </Button>
      </Box>

      {/* Feature image */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: { xs: 4, md: 0 },
        }}
      >
        <img
          src={smilingLawyer} 
          alt="Smiling Lawyer Feature Image"
          style={{
            width: "90%",
            maxWidth: "500px", // Prevents it from being too big
            height: "auto",
          }}
        />
      </Box>
    </Box>
  );
};

export default BodyHome;