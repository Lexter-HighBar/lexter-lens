import { Link } from 'react-router-dom'

export const LogoImg = () => {
  return (
    <Link to="/">
      <img height={'25px'} src="../../assets/logo.svg" alt="logo" />
    </Link>
  )
}
