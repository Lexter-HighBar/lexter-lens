import { Box, Typography, Tooltip, Chip, CircularProgress } from '@mui/material'
import { Info } from 'lucide-react'

interface TagsManagerProps {
  defaultTags: string[]
  selectedTags?: string[]
  onTagClick?: (tag: string) => void
  title?: string
  disabled?: boolean
  tooltip?: string
  loading: boolean
}

const TagsManager: React.FC<TagsManagerProps> = ({
  defaultTags,
  selectedTags,
  onTagClick,
  title,
  disabled,
  tooltip,
  loading,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' , gap: 1}}>
            <Typography variant="body1">{title}</Typography>
            {tooltip && (
              <Tooltip title={tooltip}>
                <Info size={20} />
              </Tooltip>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {defaultTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => onTagClick?.(tag)}
                disabled={disabled}
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: selectedTags?.includes(tag) ? 'primary.main' : 'grey.200',
                  color: selectedTags?.includes(tag) ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: selectedTags?.includes(tag) ? 'primary.dark' : 'grey.300',
                  },
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}

export default TagsManager

