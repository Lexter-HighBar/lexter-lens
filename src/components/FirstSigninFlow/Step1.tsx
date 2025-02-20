import { TextField, Typography } from '@mui/material'


interface Step1Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Step1 = ({ onChange, onIdChange }: Step1Props) => {
 
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
          defaultValue="Set a user name"
          onChange={onChange}
        />

        <TextField
          required
          type="number"
          fullWidth
          margin="normal"
          name="Enter your confirmation number"
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
