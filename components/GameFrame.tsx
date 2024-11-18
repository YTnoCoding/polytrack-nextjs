  'use client';

import { useEffect, useRef } from 'react';
import type { Game } from '@/types/game';

interface GameFrameProps {
  game: Game;
}

export default function GameFrame({ game }: GameFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Handle any postMessage events from the game if needed
      if (event.origin === new URL(game.gameUrl).origin) {
        console.log('Message from game:', event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [game.gameUrl]);

  return (
    <div className="relative w-full h-full">
      <iframe
        ref={iframeRef}
        src={game.gameUrl}
        className="w-full h-full aspect-video min-h-[600px] rounded-lg"
        frameBorder="0"
        allow="gamepad *; fullscreen *; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
