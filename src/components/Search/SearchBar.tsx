import React, { useState, useEffect, useCallback } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

import { Divider, useMediaQuery } from '@mui/material'
import { useSearchQuery } from '../../hooks/useSearchQuery'

import QuestionResultList from './QuestionResultList'

export default function SearchBar() {
  const [open, setOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [query, setQuery] = useState('')
  const isMobile = useMediaQuery('(max-width:600px)')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // Using the custom hook to perform the search
  const { questions, loading, error, setParams } = useSearchQuery()
  //tags selector
  const handleTagClick = (tags: string[]) => {
    setSelectedTags(tags)
    memoizedSetParams({ tags: tags.join(',') }) // Trigger the search
  }
  // Memoize the setParams function (if you do add setParams to the dependencies, it will cause an infinite loop)
  const memoizedSetParams = useCallback(setParams, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSearchQuery(e.target.value + '&searchIn=questions,comments')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      const tagsString = selectedTags.join(',')
      memoizedSetParams({
        q: query,
        tags: tagsString,
        searchIn: 'questions,comments',
      })
    }
  }

  // Trigger search when query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500) // adjust the delay time as needed

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchQuery, selectedTags])

  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      memoizedSetParams({ q: debouncedQuery })
    }
  }, [debouncedQuery, memoizedSetParams])

  return (
    <>
      {/* Search Button */}
      {isMobile ? (
        <IconButton aria-label="search" onClick={handleOpen}>
          <SearchIcon sx={{ color: 'white' }} />
        </IconButton>
      ) : (
        <Paper
          sx={{
            height: 35,
            display: 'flex',
            alignItems: 'center',
            width: 125,
            borderRadius: '16px',
            boxShadow: 'none',
          }}
          onClick={handleOpen}
        >
          <InputBase
            sx={{ ml: 3 }}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search questions' }}
            readOnly
            onKeyPress={handleKeyPress}
            onChange={handleSearch}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      )}
      <Divider/>

      {/* Search Modal */}
      <QuestionResultList
        handleTagClick={handleTagClick}
        selectedTags={selectedTags}
        questions={questions}
        error={error}
        loading={loading}
        query={query}
        open={open}
        handleClose={handleClose}
        handleSearch={handleSearch}
        handleKeyPress={handleKeyPress}
      />
    </>
  )
}
