import { Box, Typography, Tooltip, Button, TextField, Chip } from '@mui/material';
interface TagsManagerProps {
  defaultTags: string[];
  selectedDefaultTags: string[];
  onDefaultTagClick: (tag: string) => void;
  tags: { [key: string]: string[] };
  onTagRemove: (category: string, tag: string) => void;
  onTagAdd: (category: string, newTag: string) => void;
}
const TagsManager: React.FC<TagsManagerProps> = ({
  defaultTags,
  selectedDefaultTags,
  onDefaultTagClick,
  tags,
  onTagRemove,
  onTagAdd,
}) => {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
            Authority Tags
          </Typography>
          <Tooltip title="Authority Tags help identify the expertise, location, and industry of a legal professional.">
            <Button variant="text" sx={{ color: 'primary.main' }}>LEARN MORE</Button>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {defaultTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => onDefaultTagClick(tag)}
              sx={{
                backgroundColor: selectedDefaultTags.includes(tag) ? 'primary.main' : 'grey.200',
                color: selectedDefaultTags.includes(tag) ? 'white' : 'text.primary',
                '&:hover': {
                  backgroundColor: selectedDefaultTags.includes(tag) ? 'primary.dark' : 'grey.300',
                },
              }}
            />
          ))}
        </Box>
      </Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
          Suggested Tags
        </Typography>
        <Tooltip title="Suggested Tags provide additional context about your professional profile.">
          <Button variant="text" sx={{ color: 'primary.main' }}>LEARN MORE</Button>
        </Tooltip>
      </Box>
{Object.entries(tags).map(([category, tagList]) => (
        <Box key={category} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {category}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {tagList.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => onTagRemove(category, tag)}
              />
            ))}
          </Box>
          <TextField
            placeholder={`Add ${category.toLowerCase()}...`}
            fullWidth
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const newTag = (e.target as HTMLInputElement).value.trim();
                if (newTag) {
                  onTagAdd(category, newTag);
                  (e.target as HTMLInputElement).value = '';
                }
              }
            }}
          />
        </Box>
      ))}
    </>
  );
};
export default TagsManager;
