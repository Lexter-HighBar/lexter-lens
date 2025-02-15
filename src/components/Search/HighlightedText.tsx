import React from 'react'
import { Typography } from '@mui/material'

interface HighlightedTextProps {
  text: string
  highlight: string
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlight,
}) => {
  if (!highlight.trim()) {
    return <Typography>{text}</Typography>
  }

  const regex = new RegExp(`(${highlight})`, 'gi')
  const parts = text.split(regex)

  return (
    <Typography component="span">
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} style={{ backgroundColor: 'yellow' }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </Typography>
  )
}

export default HighlightedText
