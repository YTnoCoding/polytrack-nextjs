import { Metadata } from 'next'
import { GamePage } from '@/components/game-page'
import gamesConfig from '@/config/games.json'

export const metadata: Metadata = {
  title: 'PolyTrack - 🎮 Play Free Online Games',
  description: 'Play PolyTrack, an exciting low-poly racing game featuring custom track creation, thrilling loops, and high-speed action. Challenge yourself in this TrackMania-inspired racing experience!',
}

export default function Home() {
  const defaultGame = gamesConfig.games[0]
  return <GamePage initialGameId={defaultGame.id} />
}