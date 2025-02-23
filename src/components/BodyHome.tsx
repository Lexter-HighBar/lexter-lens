import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BodyHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "70vh",
        width: "100%",
        display: "flex",
        justifyContent: "space-between", // Align text on the left and image on the right
        alignItems: "center", // Vertically center the content
        backgroundImage: "url('/assets/golexter-web-pattern.png')",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "0 20px", // Adds some padding for spacing
      }}
    >
      <Box sx={{ flex: 1, textAlign: "left" }}>
        <Typography variant="h3" sx={{ color: "primary.main", fontWeight: "bold", mb: 2 }}>
          Welcome to Lexter Lens
        </Typography>
        <Typography variant="h5" sx={{ color: "primary.dark", mb: 4 }}>
          Driving a new era in legal career decisions.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/discussion")}
        >
          Join the Discussion
        </Button>
      </Box>

      {/* Feature image */}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src={"assets/golexter_smiling_lawyer_male_shape.png"}
          alt="Feature"
          style={{
            height: "110%",
          }}
        />
      </Box>
    </Box>
  );
};

export default BodyHome;
