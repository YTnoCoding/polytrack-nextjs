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
    <div className="relative w-full h-full min-h-[90px]">
      <ins
        ref={adRef}
        className={`adsbygoogle ${className || ''}`}
        style={{
          display: 'block',
          minHeight: '90px',
          background: '#f4f4f5',
          ...style,
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
      <div className="absolute top-0 right-0 bg-muted/80 px-2 py-0.5 text-[10px] text-muted-foreground">
        Advertisement
      </div>
    </div>
  );
}
