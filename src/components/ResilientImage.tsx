import {useState} from 'react';
import {Flower2} from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F8E1E7] via-[#FFFBF5] to-[#E8A317]/20 text-[#7A1F3D] p-6 text-center ${className}`}
      >
        <Flower2 className="w-8 h-8 mb-2 text-[#E8A317]" aria-hidden="true" />
        <span className="font-display text-sm font-semibold text-[#2B2024]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
