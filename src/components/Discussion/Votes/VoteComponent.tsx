import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Stack,
  Divider,
} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useState, useContext, useEffect } from 'react'
import { useVotes } from '../../../hooks/useVotes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserdataApiContext } from '../../../lib/contexts/UserdataApiContext'

interface VoteComponentProps {
  questionId: string
  ownerId: string
}

const VoteComponent = ({ questionId, ownerId }: VoteComponentProps) => {
  const { useVotes: useVotesHook } = useVotes()
  const { data: votes, isLoading, error } = useVotesHook(questionId, ownerId)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)
  const queryClient = useQueryClient()
  const api = useContext(UserdataApiContext)

  useEffect(() => {
    if (votes) {
      setUserVote(votes.voteDirection)
    }
  }, [votes])

  const voteMutation = useMutation({
    mutationFn: async (voteType: number) => {
      if (!api) throw new Error('API is not available')
      return await api.post(`/votes/${questionId}/${ownerId}/${voteType}`, {
        voteType,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['votes', questionId] })
    },
  })

  const handleUpVote = () => {
    if (!votes) return
    const newVote = userVote === 'up' ? null : 'up'
    setUserVote(newVote)
    voteMutation.mutate(newVote === 'up' ? 1 : 0)
  }

  const handleDownVote = () => {
    if (!votes) return
    const newVote = userVote === 'down' ? null : 'down'
    setUserVote(newVote)
    voteMutation.mutate(newVote === 'down' ? -1 : 0)
  }

  if (isLoading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Error loading votes</Typography>

  return (
    <Stack
    mt={2}
      direction="row"
      borderRadius={'60px'}
      alignItems="center"
      spacing={1}
    >
      <ToggleButtonGroup
        size="small"
        sx={{ height: '30px', border: '1px solid #ccc', borderRadius: '60px' }}
        value={userVote}
        exclusive
      >
        <ToggleButton
          sx={{ borderRadius: '60px' }}
          value="up"
          onClick={handleUpVote}
        >
          <ArrowUpwardIcon color={userVote === 'up' ? 'primary' : 'inherit'} />

          <Typography variant="body1">{votes?.totalUps}</Typography>
        </ToggleButton>
        <Divider orientation="vertical" flexItem />

        <ToggleButton
          sx={{ borderRadius: '60px' }}
          value="down"
          onClick={handleDownVote}
        >
          <Typography variant="body1">{votes?.totalDowns}</Typography>

          <ArrowDownwardIcon
            color={userVote === 'down' ? 'error' : 'inherit'}
          />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  )
}

export default VoteComponent
