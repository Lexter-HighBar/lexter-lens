import { Typography, Chip, Box, Link, Grid2 } from '@mui/material'
import { Question } from '../lib/types'
import { Flex } from '@radix-ui/themes'

interface Props {
  post: Question
  openDialog: (post: Question) => void
  key: string
}

const PostItem = ({ post, openDialog }: Props) => (
  <>
    <Box maxWidth={750} width={'90%'} m={1} p={2} border={1} borderRadius={2} borderColor={'#D3D3D3'} key={post.question_id}>
      <Typography mt={2} variant="h6">{post.content}</Typography>
      <Grid2 mt='1' gap='1'>
      <Box mt={2} border={1} borderColor="grey.300" borderRadius={2} p={2}>
        <Typography variant="body1">{post.content}</Typography>
      </Box>
      <Box mt={2} mb={2} >
        <Link underline='hover'  alignContent="end"  onClick={() => openDialog(post)}> Add comment</Link>
      </Box>
      </Grid2>

    <Flex>
      {post.tags.map((tag, index) => (
        <Chip key={index} label={tag} color="primary" />
      ))}
    </Flex>
    </Box>
  </>
)

export default PostItem
