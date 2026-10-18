import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ShopLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-700/20 ${sizeClasses[size]} ${className}`}>
      {/* Basket SVG with leaf accent */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/5 h-3/5"
      >
        {/* Basket handles */}
        <path
          d="M10 13L16 5L22 13"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Basket body */}
        <path
          d="M5 13H27L24.5 24C24.2 25.5 22.8 26.5 21.2 26.5H10.8C9.2 26.5 7.8 25.5 7.5 24L5 13Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Horizontal basket weave lines */}
        <path
          d="M6.5 19H25.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Vertical weave ribs */}
        <path
          d="M12 13V26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 13V26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Small fresh leaf popping out */}
        <path
          d="M16 6C17.5 3 21 3.5 21 6C21 8.5 18 8 16 6Z"
          fill="#86EFAC"
        />
      </svg>
      {/* Little green organic badge dot */}
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-white"></span>
      </span>
    </div>
  );
};
