import { useState } from 'react';
import { Box, MenuItem, Select, FormControl } from '@mui/material';
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

  const handleFilterChange = (event: any) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', marginBottom: '10px' }}>
      <FormControl sx={{ width: '200px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <FilterListIcon sx={{ marginRight: '10px' }} />
        <Select value={selectedFilter} onChange={handleFilterChange} displayEmpty sx={{ width: '200px' }}>
          <MenuItem disabled value="">
            <em>Filter</em>
          </MenuItem>
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