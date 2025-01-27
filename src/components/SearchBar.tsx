import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useMediaQuery } from '@mui/material';

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)'); 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Search Button */}
      {isMobile ? (
        <IconButton
        
          aria-label="search"
          onClick={handleOpen} // Open modal on click
        >
          <SearchIcon sx={{ color:'white'}} />
        </IconButton>
      ) : (
        <Paper
          sx={{
            height: 35,
            display: 'flex',
            alignItems: 'center',
            width: 125,
            borderRadius: '16px',
            boxShadow: 'none',
          }}
          onClick={handleOpen} // Open modal on click
        >
          <InputBase
            sx={{ ml: 3}}
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
      <Dialog open={open} onClose={handleClose}  fullWidth maxWidth="sm">
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            overflow: 'hidden',
            height: '400px',
          }}
        >
          {/* Search Input in Modal */}
          <Paper
           
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: '100%', 
              boxShadow: 'none',
              border: '1px solid grey',
            }}
          >
            <InputBase
              sx={{ ml: 3, flex: 1 }}
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
