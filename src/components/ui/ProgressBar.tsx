import React from 'react';
import { cn } from '../../utils/helpers';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  className,
  variant = 'primary',
  showValue = false,
  size = 'md',
  label,
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const variantClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-300',
    accent: 'bg-accent-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  };
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && (
            <span className="text-sm text-gray-500">{`${value} / ${max}`}</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('transition-all duration-300 ease-in-out rounded-full', variantClasses[variant])}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {showValue && !label && (
        <div className="mt-1 text-right">
          <span className="text-xs text-gray-500">{`${Math.round(percentage)}%`}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;