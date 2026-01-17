import Image from 'next/image';

interface RooslyLogoProps {
  className?: string;
  size?: number;
}

const RooslyLogo = ({ className = "", size = 200 }: RooslyLogoProps) => {
  return (
    <Image 
      src="/logo.svg" 
      alt="Roosly Logo" 
      className={className} 
      width={size} 
      height={size}
      priority
    />
  );
};

export default RooslyLogo;