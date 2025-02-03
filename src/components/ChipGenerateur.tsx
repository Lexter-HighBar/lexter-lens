import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useFetchTagsFromAI } from '../hooks/useFetchTagsFromAI'
import { useState, useCallback } from 'react'

interface ChipGeneratorProps {
  inputText: string
  onTagChange: (tags: string[]) => void
}

const ChipGenerator: React.FC<ChipGeneratorProps> = ({
  inputText,
  onTagChange,
}) => {
  const { loading, error, validTags, fetchTags } = useFetchTagsFromAI(inputText)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleFetchTags = useCallback(() => {
    if (inputText.trim() && fetchTags) {
      fetchTags()
    }
  }, [inputText, fetchTags])

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newSelectedTags = [...selectedTags, tag]
      setSelectedTags(newSelectedTags)
      onTagChange(newSelectedTags)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim())
    setSelectedTags(tags)
    onTagChange(tags)
  }

  return (
    <Stack spacing={2}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {validTags &&
          Object.keys(validTags).map((key) => (
            <Chip
              sx={{ m: 2 }}
              key={key}
              label={key}
              onClick={() => handleTagClick(key)}
              color={selectedTags.includes(key) ? 'primary' : 'default'}
            />
          ))}
      </Stack>
      <TextField
        fullWidth
        margin="normal"
        label="Tags (comma-separated)"
        value={selectedTags.join(', ')}
        onChange={handleInputChange}
        onFocus={handleFetchTags}
      />
    </Stack>
  )
}

export default ChipGenerator
