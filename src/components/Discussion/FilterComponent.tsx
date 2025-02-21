import { useState } from 'react';
import { Box, Menu, MenuItem, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const filterOptions = [
  { value: 'new', label: 'New' },
  { value: 'relevant', label: 'Relevant' },
  { value: 'trending', label: 'Trending' },
];

interface FilterProps {
  onFilterChange: (filter: string) => void;
}

const FilterComponent = ({ onFilterChange }: FilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState('new');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (newFilter?: string) => {
    setAnchorEl(null);
    if (newFilter) {
      setSelectedFilter(newFilter);
      onFilterChange(newFilter);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', marginBottom: '10px' }}>
      <IconButton onClick={handleOpenMenu}>
        <FilterListIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleCloseMenu()}>
        {filterOptions.map((option) => (
          <MenuItem key={option.value} onClick={() => handleCloseMenu(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default FilterComponent;
