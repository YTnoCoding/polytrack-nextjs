'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdProps {
  client: string;
  slot: string;
  format?: 'auto' | 'fluid';
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function GoogleAd({
  client,
  slot,
  format = 'auto',
  responsive = true,
  style,
  className,
}: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (err) {
      console.error('Error loading ad:', err);
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <ins
        ref={adRef}
        className={`adsbygoogle ${className || ''}`}
        style={{
          display: 'block',
          background: '#f4f4f5',
          ...style,
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
      <div className="absolute top-1 right-1 text-[10px] text-muted-foreground bg-background/80 px-1.5 py-0.5 rounded-sm select-none">
        Advertisement
      </div>
    </div>
  );
}
