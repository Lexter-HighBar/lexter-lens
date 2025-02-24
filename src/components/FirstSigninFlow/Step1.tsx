import { TextField, Typography } from '@mui/material'

interface Step1Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  formUserName: string
}

const Step1 = ({ onChange, onIdChange, formUserName }: Step1Props) => {
  return (
    <>
      <Typography>Welcome, </Typography>
      <Typography>Let's create a user name:</Typography>
      <TextField
        required
        fullWidth
        margin="normal"
        name="userName"
        label="User Name"
        onChange={onChange}
        defaultValue={formUserName}
      />

      <TextField
        required
        type="number"
        fullWidth
        margin="normal"
        name="Enter your confirmation number"
        label="Confirmation number"
        onChange={onIdChange}
      />
    </>
  )
}
export default Step1
