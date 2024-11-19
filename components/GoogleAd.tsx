'use client';

import { useEffect, useRef } from 'react';

interface GoogleAdProps {
  client: string;
  slot: string;
  format?: 'auto' | 'fluid';
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
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
  const isInitialized = useRef(false);

  useEffect(() => {
    // 避免重复初始化
    if (isInitialized.current) {
      return;
    }

    try {
      // 确保在客户端环境
      if (typeof window !== 'undefined' && adRef.current) {
        // 初始化广告
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isInitialized.current = true;

        // 添加错误处理
        const handleError = (e: ErrorEvent) => {
          if (e.target instanceof HTMLElement && adRef.current?.contains(e.target)) {
            console.error('AdSense error:', e.error);
          }
        };

        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
      }
    } catch (err) {
      console.error('Error initializing ad:', err);
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
