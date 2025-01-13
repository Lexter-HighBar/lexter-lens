import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useMediaQuery } from '@mui/material';

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)'); // Detect screens 600px wide or smaller

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Search Button */}
      {isMobile ? (
        <IconButton
          type="button"
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'secondary.main' },
          }}
          aria-label="search"
          onClick={handleOpen} // Open modal on click
        >
          <SearchIcon />
        </IconButton>
      ) : (
        <Paper
          component="button"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 200,
            borderRadius: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          onClick={handleOpen} // Open modal on click
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            readOnly // Make input read only so the modal is used for typing
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      )}

      {/* Search Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
            overflow: 'hidden',
          }}
        >
          {/* Search Input in Modal */}
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: '100%', 
              borderRadius: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
}
