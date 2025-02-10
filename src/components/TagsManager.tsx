import { Box, Typography, Tooltip, Button,Chip } from '@mui/material';
interface TagsManagerProps {
  defaultTags?: string[];
  selectedDefaultTags?: string[];
  onDefaultTagClick?: (tag: string) => void;
  tags: { [key: string]: string[] };
  onTagRemove?: (category: string, tag: string) => void;
  onTagAdd?: (category: string, newTag: string) => void;
  title: string
  disabled?: boolean
}
const TagsManager: React.FC<TagsManagerProps> = ({
  defaultTags,
  selectedDefaultTags,
  onDefaultTagClick,
  

  title,
  disabled
}) => {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
            {title}
          </Typography>
          <Tooltip title="Authority Tags help identify the expertise, location, and industry of a legal professional.">
            <Button variant="text" sx={{ color: 'primary.main' }}>LEARN MORE</Button>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {defaultTags?.map((tag) => (
            <Chip
              disabled={disabled}
              key={tag}
              label={tag}
              onClick={() => onDefaultTagClick?.(tag)}
              sx={{
                backgroundColor: selectedDefaultTags?.includes(tag) ? 'primary.main' : 'grey.200',
                color: selectedDefaultTags?.includes(tag) ? 'white' : 'text.primary',
                '&:hover': {
                  backgroundColor: selectedDefaultTags?.includes(tag) ? 'primary.dark' : 'grey.300',
                },
              }}
            />
          ))}
        </Box>
      </Box>

    </>
  );
};
export default TagsManager;
