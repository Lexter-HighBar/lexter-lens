import React, { useState } from 'react';
import { Chip, TextField, Box, Typography, Button } from '@mui/material';

export const Discussion = () => {
  const [cities, setCities] = useState(['Calgary', 'Toronto', 'Ottawa']);
  const [expertise, setExpertise] = useState(['Corporate & Commercial', 'Litigation', 'Torts', 'Divorce']);
  const [industries, setIndustries] = useState(['Corporate & Commercial', 'Litigation']);
  const [firmOffices, setFirmOffices] = useState(['BDP - Calgary', 'Ogilvie - Calgary', 'Ogilvie - Toronto']);

  const handleAddTag = (tag, setTags) => {
    if (tag && !setTags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleDeleteTag = (tag, setTags) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <Box padding={4}>
      <Typography variant="h5">Let's Make Lexter Lens Relevant</Typography>
      <Typography variant="body1" gutterBottom>
        Short text about tags, what they're used for.
      </Typography>

      <Box marginBottom={2}>
        <Typography variant="subtitle1">Cities:</Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {cities.map((city) => (
            <Chip
              key={city}
              label={city}
              onDelete={() => handleDeleteTag(city, setCities)}
              color="success"
            />
          ))}
        </Box>
        <TextField
          label="Add city"
          size="small"
          variant="outlined"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTag(e.target.value, setCities);
              e.target.value = '';
            }
          }}
        />
      </Box>

      <Box marginBottom={2}>
        <Typography variant="subtitle1">Expertise:</Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {expertise.map((exp) => (
            <Chip
              key={exp}
              label={exp}
              onDelete={() => handleDeleteTag(exp, setExpertise)}
              color="success"
            />
          ))}
        </Box>
        <TextField
          label="Add expertise"
          size="small"
          variant="outlined"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTag(e.target.value, setExpertise);
              e.target.value = '';
            }
          }}
        />
      </Box>

      <Box marginBottom={2}>
        <Typography variant="subtitle1">Industries:</Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {industries.map((industry) => (
            <Chip
              key={industry}
              label={industry}
              onDelete={() => handleDeleteTag(industry, setIndustries)}
              color="success"
            />
          ))}
        </Box>
        <TextField
          label="Add industry"
          size="small"
          variant="outlined"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTag(e.target.value, setIndustries);
              e.target.value = '';
            }
          }}
        />
      </Box>

      <Box marginBottom={2}>
        <Typography variant="subtitle1">Firm Offices:</Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {firmOffices.map((office) => (
            <Chip
              key={office}
              label={office}
              onDelete={() => handleDeleteTag(office, setFirmOffices)}
              color="success"
            />
          ))}
        </Box>
        <TextField
          label="Add firm office"
          size="small"
          variant="outlined"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTag(e.target.value, setFirmOffices);
              e.target.value = '';
            }
          }}
        />
      </Box>

      <Button variant="contained" color="primary">
        Next
      </Button>
    </Box>
  );
};
