import {
  Dialog,
  DialogContent,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
  List,
  Box,
  Chip,
  Button,
  Divider,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Question } from '../../lib/types'
import HighlightedText from './HighlightedText'

import VotePreview from './VotePreview'
import { Page } from '../layout/Page'
import TagSelector from '../tagsSelector'

interface QuestionListProps {
  open: boolean
  handleClose: () => void
  query: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  loading: boolean
  error: string | null
  questions: Question[]
  selectedTags: string[]
  handleTagClick: (tags: string[]) => void
}

const QuestionResultList: React.FC<QuestionListProps> = ({
  open,
  handleClose,
  query,
  handleSearch,
  handleKeyPress,
  loading,
  error,
  questions,
  selectedTags,
  handleTagClick,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          coverflowY: 'hidden',
          scrollbarWidth: 'thin',
          overflowX: 'scroll',
          height: '80vh',
        }}
      >
        {/* Search Input in Modal */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Box sx={{ mt: -2, width: '100%' }}>
            <TagSelector
              variant="standard"
              selectedTags={selectedTags}
              setSelectedTags={handleTagClick}
            />
          </Box>
          <Paper
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              boxShadow: 'none',
            }}
          >
            <TextField
              variant="standard"
              sx={{ ml: 3, flex: 1 }}
              placeholder="Or type to search for questions..."
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
            />

            <IconButton type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        {/* Display Loading Spinner */}
        {loading && (
          <Page>
            {' '}
            <CircularProgress />
          </Page>
        )}

        {/* Display Error Message */}
        {error && (
          <Page>
            {' '}
            <Typography color="error">Error: {error}</Typography>
          </Page>
        )}
        {questions.length !== 0 && (
          <Typography m={1} variant="body2">
            {' '}
            found {questions.length} results
          </Typography>
        )}
        {/* Display Search Results */}
        <Page>
          {questions.length > 0 ? (
            questions.map((question) => (
              <List
                key={question.QuestionId}
                sx={{
                  borderRadius: 1,
                  width: '100%',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <Box p={2}>
                  <Typography variant="subtitle2">
                    <HighlightedText
                      text={question.content}
                      highlight={query}
                    />
                  </Typography>
                  {question.tags.map((tag, index) => (
                    <Chip
                      sx={{ m: 1 }}
                      size="small"
                      key={index}
                      label={<HighlightedText text={tag} highlight={query} />}
                    />
                  ))}
                  <Divider />
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Box
                      display={'flex'}
                      flexDirection={'row'}
                      alignItems={'center'}
                    >
                      <Typography variant="caption">
                        <Typography variant="caption" fontWeight={500}>
                          {' '}
                          {question.userName}
                        </Typography>{' '}
                        |{' '}
                      </Typography>

                      <Typography variant="caption">
                        {' '}
                        {new Date(question.createdOn).toLocaleDateString()}
                      </Typography>

                      <VotePreview
                        key={question.QuestionId}
                        question={question}
                      />
                    </Box>

                    <Button
                      color="primary"
                      size="small"
                      title="Learn More"
                      variant="text"
                      onClick={() =>
                        (window.location.href = `/question/${question._id}`)
                      }
                    >
                      See More
                    </Button>
                  </Box>
                </Box>
              </List>
            ))
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '25%',
                width: '100%',
              }}
            >
              <Typography>
                Select a tag or type to search for questions...
              </Typography>
            </Box>
          )}{' '}
        </Page>
      </DialogContent>
    </Dialog>
  )
}

export default QuestionResultList
