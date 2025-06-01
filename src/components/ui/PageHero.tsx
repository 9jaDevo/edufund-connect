import React from 'react';
import { cn } from '../../utils/helpers';

interface PageHeroProps {
  title: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
}

const PageHero = ({ title, description, image, children, className }: PageHeroProps) => {
  return (
    <div className={cn(
      'relative bg-gradient-to-br from-primary-500 to-primary-700 py-16',
      image ? 'bg-cover bg-center' : '',
      className
    )}>
      {image && (
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-white/90">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageHero;