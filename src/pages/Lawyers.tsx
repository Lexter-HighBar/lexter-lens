import { Box, Flex, Grid } from '@radix-ui/themes'
import { useLawyers } from '../hooks/useLawyers'

export const Lawyers = () => {
  // todo: manage pagination through state, or search params
  const lawyers = useLawyers({ page: 1, count: 20 })

  if (lawyers.isFetching) return <div>Loading...</div>
  if (lawyers.error) return <div>Error</div>

  return (
    <Grid>
      {lawyers.data?.items.map((lawyer) => (
        <Flex key={`lawyer-${lawyer.id}`}>
          <Box>
            {lawyer.first_name} {lawyer.last_name}
          </Box>
        </Flex>
      ))}
    </Grid>
  )
}
