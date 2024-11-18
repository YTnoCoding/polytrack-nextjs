import { Metadata } from 'next'
import { GamePage } from '@/components/game-page'
import gamesConfig from '@/config/games.json'

export const metadata: Metadata = {
  title: 'Game Portal - Play Free Online Games',
  description: 'Play the best free online games at Game Portal. Racing games, action games, multiplayer games and more!',
}

export default function Home() {
  const defaultGame = gamesConfig.games[0]
  return <GamePage initialGameId={defaultGame.id} />
}