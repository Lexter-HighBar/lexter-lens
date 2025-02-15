import { Box, Typography, Tooltip, Chip } from '@mui/material'
interface TagsManagerProps {
  defaultTags: string[]
  selectedDefaultTags?: string[]
  onDefaultTagClick?: (tag: string) => void
  title?: string
  disabled?: boolean
  tooltip?: string
}
const TagsManager: React.FC<TagsManagerProps> = ({
  defaultTags,
  selectedDefaultTags,
  onDefaultTagClick,
  title,
  disabled,
  tooltip,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
          {title}
        </Typography>
        <Tooltip title={tooltip}>
          <Typography variant="body1">LEARN MORE</Typography>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {defaultTags.map((tag) => (
          <Chip
            disabled={disabled}
            key={tag}
            label={tag}
            onClick={() => onDefaultTagClick && onDefaultTagClick(tag)}
            sx={{
              backgroundColor: selectedDefaultTags?.includes(tag)
                ? 'primary.main'
                : 'grey.200',
              color: selectedDefaultTags?.includes(tag)
                ? 'white'
                : 'text.primary',
              '&:hover': {
                backgroundColor: selectedDefaultTags?.includes(tag)
                  ? 'primary.dark'
                  : 'grey.300',
              },
            }}
          />
        ))}
      </Box>
    </>
  )
}
export default TagsManager
