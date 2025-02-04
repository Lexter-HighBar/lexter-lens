import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useFetchTagsFromAI } from '../hooks/useFetchTagsFromAI'
import React, { useState, useCallback } from 'react'
import { CircularProgress } from '@mui/material'

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
        autoComplete={true}
        loadingText="Loading..."
        loading={loading}
        multiple
        freeSolo
        options={validTags ? Object.keys(validTags) : []}
        value={selectedTags}
        onChange={handleTagChange}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
            <TextField
            {...params}
            label="Suggested Tags"
            placeholder="Select tags or enter manually"
            onFocus={handleFetchTags}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps?.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Stack>
  )
}

export default ChipGenerator
