import React from 'react';

interface Logo92EatsProps {
  className?: string;
  size?: number;
}

export function Logo92Eats({ className = "", size = 32 }: Logo92EatsProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Light gray circular background */}
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="#E5E7EB"
          stroke="#D1D5DB"
          strokeWidth="2"
        />
        
        {/* Orange dining set graphic */}
        <g transform="translate(16, 12)">
          {/* Plate outline */}
          <ellipse
            cx="16"
            cy="20"
            rx="12"
            ry="8"
            fill="none"
            stroke="#F97316"
            strokeWidth="2"
          />
          
          {/* Fork */}
          <g transform="translate(8, 16)">
            <rect x="0" y="0" width="1.5" height="8" fill="#F97316" rx="0.5" />
            <rect x="-0.5" y="0" width="2.5" height="1" fill="#F97316" />
            <rect x="-0.5" y="1.5" width="2.5" height="1" fill="#F97316" />
            <rect x="-0.5" y="3" width="2.5" height="1" fill="#F97316" />
            <rect x="-0.5" y="4.5" width="2.5" height="1" fill="#F97316" />
          </g>
          
          {/* Knife */}
          <g transform="translate(24, 16)">
            <rect x="0" y="0" width="1.5" height="8" fill="#F97316" rx="0.5" />
            <polygon points="0,0 3,0 0,3" fill="#F97316" />
          </g>
        </g>
        
        {/* 92 Eats text */}
        <text
          x="32"
          y="50"
          textAnchor="middle"
          fontSize="8"
          fontWeight="600"
          fill="#F97316"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          92 Eats
        </text>
      </svg>
    </div>
  );
}
