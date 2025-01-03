import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const FirmSearch: React.FC = () => {
  return (
    <div style={{ margin: "20px", maxWidth: "400px" }}>
      <h2>Firm Search</h2>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Look up law firm here"
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
    </div>
  );
};

export default FirmSearch;