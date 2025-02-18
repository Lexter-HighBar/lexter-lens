import { useState } from 'react';
import { Box, MenuItem, Select, FormControl } from '@mui/material';

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

  const handleFilterChange = (event: any) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <Box sx={{ width: '200px', marginBottom: '10px' }}>
      <FormControl fullWidth>
        <Select value={selectedFilter} onChange={handleFilterChange}>
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterComponent;
