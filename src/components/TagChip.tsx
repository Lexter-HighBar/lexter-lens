import React from 'react';
import { Chip, ChipProps } from '@mui/material';

interface TagChipProps extends ChipProps {
  isSelected?: boolean;
  onTagClick?: () => void;
}

const TagChip: React.FC<TagChipProps> = ({
  label,
  isSelected = false,
  onTagClick,
  onDelete,
  ...props
}) => {
  return (
    <Chip
      label={label}
      onClick={onTagClick}
      onDelete={onDelete}
      sx={{
        backgroundColor: isSelected ? 'primary.main' : 'grey.200',
        color: isSelected ? 'white' : 'text.primary',
        '&:hover': {
          backgroundColor: isSelected ? 'primary.dark' : 'grey.300',
        },
      }}
      {...props}
    />
  );
};

export default TagChip;