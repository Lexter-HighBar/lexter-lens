import { Link } from 'react-router-dom';

interface LogoImgProps {
  variant?: 'Dark' | 'Light'; 
  Size? :  number 
}

export const LogoImg: React.FC<LogoImgProps> = ({ variant = 'Light' , Size = 25 }) => {
  const logoSrc = variant === 'Dark' ? '../../assets/logoDark.svg' : '../../assets/logoLight.svg';
 
  return (
    <Link to="/">
      <img height={Size} src={logoSrc} alt={`logo-${variant}`} />
    </Link>
  );
};
