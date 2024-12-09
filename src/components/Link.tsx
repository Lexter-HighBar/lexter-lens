import { LinkProps, Link as MuiLink } from '@mui/material'
import { Link as RRLink } from 'react-router-dom'

type Props = {
  to: string
} & LinkProps

export const Link = (props: Props) => {
  return <MuiLink {...props} component={RRLink} />
}
