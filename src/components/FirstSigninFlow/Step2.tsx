import { useEffect, useState } from 'react'
import { useLawyers } from '../../hooks/useLawyers'
import TagsManager from '../TagsManager'
import { Lawyer } from '../../lib/types'

import TagSelector from '../tagsSelector'
import { CircularProgress, Typography } from '@mui/material'

interface Step2Props {
  lawyerId: number
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
}

const Step2: React.FC<Step2Props> = ({
  lawyerId,
  selectedTags,
  setSelectedTags,
}) => {
  const lawyers = useLawyers({ page: 1, count: 200 })
  const [lawyerTags, setLawyerTags] = useState<{ id: number; name: string }[]>(
    [],
  )

  useEffect(() => {
    if (lawyers.data?.items) {
      const lawyer = lawyers.data.items.find(
        (lawyer: Lawyer) => lawyer.id === Number(lawyerId),
      )
      if (!lawyer) {
        console.error(`No lawyer found with id ${lawyerId}`)
      }
      if (lawyer?.tags) {
        setLawyerTags(
          lawyer.tags.map((tag) => ({ id: tag.id, name: tag.name })),
        )
      }
    }
  }, [lawyerId, lawyers.data?.items])

  return (
    
    <>
    {lawyerTags && lawyerTags.length > 0 ? (
      <>
        <TagsManager
          defaultTags={lawyerTags.map((tag) => tag.name)}
          title="Authority Tags"
          tooltip="Authority tags are tags that you are most confident in. These tags will be used to create posts and questions that are most relevant to you."
        />
        <Typography mt={2} p={1} variant="body1" sx={{ fontWeight: 'medium' }}>
          Interst Tags
        </Typography>
        
        <TagSelector
          selectedTags={
            selectedTags && selectedTags.length > 0
              ? selectedTags
              : lawyerTags.map((tag) => tag.name)
          }
          setSelectedTags={setSelectedTags}
        />
      </>
    ) : (
      <CircularProgress />
    )}
  </>
  )
}
export default Step2
