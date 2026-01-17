const RooslyLogo = ({ className = "", size = 200 }: { className?: string; size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background rounded square */}
      <rect x="20" y="20" width="160" height="160" rx="24" fill="#E8E8E8" />
      
      {/* Top-left quadrant - coral/salmon */}
      <path
        d="M44 20H156C169.255 20 180 30.7452 180 44V100H100V20H44Z"
        fill="#F4A896"
      />
      
      {/* Top-right quadrant - bright red */}
      <path
        d="M100 20H156C169.255 20 180 30.7452 180 44V100H100V20Z"
        fill="#E53935"
      />
      
      {/* Bottom-left quadrant - deep red */}
      <path
        d="M20 100H100V180H44C30.7452 180 20 169.255 20 156V100Z"
        fill="#C62828"
      />
      
      {/* Bottom-right quadrant - medium red */}
      <path
        d="M100 100H180V156C180 169.255 169.255 180 156 180H100V100Z"
        fill="#D32F2F"
      />
      
      {/* Top-left coral piece */}
      <path
        d="M20 44C20 30.7452 30.7452 20 44 20H100V100H20V44Z"
        fill="#FF8A80"
      />
      
      {/* Green leaf accent */}
      <path
        d="M60 145C60 145 75 165 100 165C85 155 75 140 75 140L60 145Z"
        fill="#2E7D32"
      />
      <path
        d="M55 150C55 150 70 175 100 175C80 162 68 145 68 145L55 150Z"
        fill="#388E3C"
      />
      
      {/* White rose spiral */}
      <g fill="white">
        {/* Outer rose petals */}
        <path
          d="M100 45C100 45 130 45 145 70C160 95 155 125 145 140C135 155 115 165 100 165C85 165 65 155 55 140C45 125 40 95 55 70C70 45 100 45 100 45Z"
          fillOpacity="0"
          stroke="white"
          strokeWidth="3"
        />
        
        {/* Inner spiral path */}
        <path
          d="M100 55C115 55 135 65 140 85C145 105 135 130 120 140C105 150 85 145 75 130C65 115 70 90 85 80C95 72 110 75 115 85C120 95 115 110 105 115C95 120 85 115 82 105C79 95 85 85 95 85"
          fill="none"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Center rose bud */}
        <ellipse cx="100" cy="95" rx="12" ry="15" fill="white" fillOpacity="0.9" />
        
        {/* Rose petals layer 1 */}
        <path
          d="M88 80C88 80 92 65 100 60C108 65 112 80 112 80C112 80 120 75 128 82C125 92 115 98 115 98"
          fill="white"
          fillOpacity="0.95"
        />
        
        {/* Rose petals layer 2 */}
        <path
          d="M72 95C72 95 65 85 68 75C78 72 88 78 88 78"
          fill="white"
          fillOpacity="0.9"
        />
        
        <path
          d="M128 95C128 95 135 85 132 75C122 72 112 78 112 78"
          fill="white"
          fillOpacity="0.9"
        />
        
        {/* Rose petals layer 3 */}
        <path
          d="M75 115C75 115 62 110 58 100C65 92 78 95 78 95"
          fill="white"
          fillOpacity="0.85"
        />
        
        <path
          d="M125 115C125 115 138 110 142 100C135 92 122 95 122 95"
          fill="white"
          fillOpacity="0.85"
        />
        
        {/* Bottom petals */}
        <path
          d="M85 125C85 125 78 138 85 148C95 145 100 135 100 135C100 135 105 145 115 148C122 138 115 125 115 125"
          fill="white"
          fillOpacity="0.8"
        />
      </g>
    </svg>
  );
};

export default RooslyLogo;