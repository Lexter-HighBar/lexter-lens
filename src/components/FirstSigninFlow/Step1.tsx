import { TextField, Typography } from '@mui/material'
import { UseClerkStorage } from '../../hooks/UseClerkStorage'

interface Step1Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Step1 = ({ onChange, onIdChange }: Step1Props) => {
  const { firstName, userName } = UseClerkStorage()

  if (userName)
    return (
      <>
        <Typography>Welcome, {firstName || ''}</Typography>
        <Typography>Create a user name:</Typography>
        <TextField
          required
          fullWidth
          margin="normal"
          name="userName"
          label="User Name"
          defaultValue={userName}
          onChange={onChange}
        />

        <TextField
          required
          type="number"
          fullWidth
          margin="normal"
          name="Confirmation number"
          label="lawyer"
          onChange={onIdChange}
        />

        <Typography>Privacy Policies</Typography>
        <ul>
          <li>Bullet point 1</li>
          <li>Bullet point 2</li>
          <li>Bullet point 3</li>
        </ul>
      </>
    )
}
export default Step1
