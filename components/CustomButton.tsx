import React from 'react';
import { Button as ShadcnButton, ButtonProps } from '@/components/ui/button';

interface CustomButtonProps extends ButtonProps {
  gradient?: 'purple-pink' | 'blue-green' | 'orange-red';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  variant,
  gradient = 'purple-pink',
  ...props
}) => {
  const gradientClasses = {
    'purple-pink': 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500',
    'blue-green': 'bg-gradient-to-r from-blue-400 via-teal-500 to-green-500',
    'orange-red': 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-500',
  };

  return (
    <ShadcnButton
      variant={variant}
      className={`
        relative overflow-hidden rounded font-bold text-white transition-all duration-300 ease-out
        ${gradientClasses[gradient]}
        hover:scale-105 hover:shadow-lg active:scale-95
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shine" />
    </ShadcnButton>
  );
};


export default CustomButton;