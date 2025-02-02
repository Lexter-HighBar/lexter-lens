import { Box, Grid2, Skeleton, Stack } from "@mui/material";

export const LoadingSkelton = () => {
return (
    

<Grid2  display={'flex'} alignItems={'center'} flexDirection="column" gap="1" width={'100%'}>
      <Box sx={{marginTop: 2}}>
      <Stack spacing={1}>
     {/* For other variants, adjust the size with `width` and `height` */}
     
     <Box display={'flex'} gap={2} alignItems={'center'}>
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="text" width={80} height={20} />
      </Box>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rounded" width={'80vw'} sx={{maxWidth: '750px'}} height={120} />
      <Box display={'flex'}  gap={1} alignItems={'center'}>
      <Skeleton variant='text' width={60}  height={45} sx={{borderRadius:'15px'}} /> 
      <Skeleton variant='text' width={60}  height={45} sx={{borderRadius:'15px'}} />
      <Skeleton variant='text' width={60}  height={45} sx={{borderRadius:'15px'}} />
      </Box>
      <Box display={'flex'} gap={2} alignItems={'center'}>
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="text" width={80} height={20} />
      </Box>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rounded" width={'80vw'} sx={{maxWidth: '750px'}} height={120} />
      <Skeleton variant="rounded" width={'80vw'} sx={{maxWidth: '750px'}} height={120} />
    </Stack></Box>
    </Grid2>
    )
}