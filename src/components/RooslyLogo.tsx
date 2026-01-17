const RooslyLogo = ({ className = "", size = 200 }: { className?: string; size?: number }) => {
  return (
    <img src="/logo.svg" alt="Roosly Logo" className={className} style={{ width: size, height: size }} />
  );
};

export default RooslyLogo;