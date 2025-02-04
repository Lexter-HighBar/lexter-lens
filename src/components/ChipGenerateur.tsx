import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
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

  const handleTagChange = (event: React.SyntheticEvent, newTags: string[]) => {
    event.preventDefault()
    setSelectedTags(newTags)
    onTagChange(newTags)
  }

  return (
    <Stack spacing={2}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <Autocomplete
        multiple
        options={validTags ? Object.keys(validTags) : []}
        value={selectedTags}
        onChange={handleTagChange}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} label="Suggested Tags" placeholder="Select tags" onFocus={handleFetchTags} />
        )}
        fullWidth
      />
    </Stack>
  )
}

export default ChipGenerator
