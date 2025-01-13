import { Link } from 'react-router-dom';
import logoDark from '../../assets/logoDark.svg';
import logoLight from '../../assets/logoLight.svg';

interface LogoImgProps {
  variant?: 'Dark' | 'Light'; 
  Size? :  number 
}

export const LogoImg: React.FC<LogoImgProps> = ({ variant = 'Light', Size = 25 }) => {
  const logoSrc = variant === 'Dark' ? logoDark : logoLight;
 
  return (
    <Link to="/">
      <img height={Size} src={logoSrc} alt={`logo-${variant}`} />
    </Link>
  );
};
