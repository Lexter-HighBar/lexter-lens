import React from "react";
import { TextField, InputAdornment, IconButton, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const FirmSearch: React.FC = () => {
  return (
    <Box
    sx={{
        margin: "20px auto",
        maxWidth: "100%",
        width: "50vw",
        textAlign: "center",
    }}
    >
    
    <Typography 
        variant="h6" 
        sx={{ marginBottom: "10px", fontWeight: "bold" }}
    >
        Search for Law Firms
    </Typography>

    {/* <TextField fullWidth label="Type the name of the law firm:" /> */}

    <TextField
        fullWidth={true}
        variant="outlined"
        label="Type the name of the law firm here..."
        InputProps={{
        endAdornment: (
            <InputAdornment position="end">
            <IconButton>
                <SearchIcon />
            </IconButton>
            </InputAdornment>
        ),
        }}
    />
    
    </Box>
  );
};

export default FirmSearch;