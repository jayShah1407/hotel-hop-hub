import React from "react";

interface Logo92EatsProps {
  className?: string;
  size?: number;
}

export function Logo92Eats({ className = "", size = 32 }: Logo92EatsProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/logo.png"
        alt="92 Eats Logo"
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
}
