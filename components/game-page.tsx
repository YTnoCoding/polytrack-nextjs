'use client';

import { Bell, Heart, Menu, Search, Share2, Shuffle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import GameFrame from './GameFrame'
import GoogleAd from './GoogleAd'
import gamesConfig from '@/config/games.json'
import { Game } from '@/types/game'
import { useCallback, useMemo } from 'react'

interface GamePageProps {
  initialGameId: string
}

export function GamePage({ initialGameId }: GamePageProps) {
  const router = useRouter()
  
  const game = useMemo(() => {
    return gamesConfig.games.find(g => g.id === initialGameId) || gamesConfig.games[0]
  }, [initialGameId])

  const featuredGames = useMemo(() => {
    return gamesConfig.games
      .filter(g => g.id !== game.id)
      .slice(0, 5);
  }, [game.id]);

  const relatedGames = useMemo(() => {
    return gamesConfig.games
      .filter(g => g.category === game.category && g.id !== game.id)
      .slice(0, 5);
  }, [game.category, game.id]);

  const renderGameCard = useCallback((game: Game) => {
    const href = game.id === gamesConfig.games[0].id ? '/' : `/${game.id}`
    return (
      <Link
        key={game.id}
        href={href}
        prefetch={false}
        className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted"
      >
        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-sm font-medium text-white group-hover:text-transparent transition-colors">
            {game.title}
          </h3>
        </div>
        <Image
          src={game.thumbnailUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </Link>
    )
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <Button variant="ghost" size="icon" className="mr-4 md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            <Link href="/" prefetch={false} className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-xl font-bold">Polytrack</span>
            </Link>
          </div>
          
          {/* Center section */}
          <div className="flex-1 flex justify-center items-center">
            <Button 
              variant="ghost" 
              onClick={() => {
                const games = gamesConfig.games;
                const randomGame = games[Math.floor(Math.random() * games.length)];
                const href = randomGame.id === gamesConfig.games[0].id ? '/' : `/${randomGame.id}`;
                router.push(href);
              }}
              className="hidden md:flex items-center gap-2"
            >
              <Shuffle className="h-5 w-5" />
              Random Game
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search games..."
                className="w-[200px] pl-8"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button>Log in</Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="w-full p-6">
          <div className="mx-auto max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
              <GameFrame game={game} />
            </div>
            {/* First Ad Placement - Game Banner */}
            <div className="mt-8 min-h-[120px]">
              <GoogleAd
                client="ca-pub-8190429661460302"
                slot="6006140807"
                className="w-full h-[120px]"
                responsive={true}
              />
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
              {/* Game Info */}
              <div>
                <h1 className="text-2xl font-bold">{game.title}</h1>
                <div className="mt-4 flex items-center gap-4">
                  <Button className="rounded-full px-8">Play Now</Button>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="mt-8 grid gap-6">
                  <div>
                    <h2 className="text-xl font-semibold">About the Game</h2>
                    <p className="mt-2 text-muted-foreground">
                      {game.description}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Game Details</h2>
                    <dl className="mt-2 grid gap-2 text-sm">
                      <div className="grid grid-cols-2 gap-1">
                        <dt className="font-medium">Category:</dt>
                        <dd className="text-muted-foreground">{game.category}</dd>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <dt className="font-medium">Developer:</dt>
                        <dd className="text-muted-foreground">{game.author.name}</dd>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <dt className="font-medium">Controls:</dt>
                        <dd className="text-muted-foreground">
                          {game.controls.keyboard && 'Keyboard'}
                          {game.controls.mouse && ', Mouse'}
                          {game.controls.touch && ', Touch'}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">How to Play</h2>
                    <ol className="mt-2 list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Use the arrow keys or WASD to control your vehicle</li>
                      <li>Navigate through the track carefully</li>
                      <li>Try to reach the finish line as fast as possible</li>
                      <li>Avoid obstacles and stay on the track</li>
                      <li>Challenge yourself to beat your best time</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              {/* Vertical Banner Ad */}
              <div className="min-h-[600px]">
                <GoogleAd
                  client="ca-pub-8190429661460302"
                  slot="5868579434"
                  className="w-full h-[600px]"
                  responsive={true}
                />
              </div>
            </div>
            
            {/* Related Games */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold">You May Also Like</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {relatedGames.map(renderGameCard)}
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden w-[336px] border-l p-4 lg:block">
          {/* Right Sidebar Ad */}
          <div className="mb-6 min-h-[600px]">
            <GoogleAd
              client="ca-pub-8190429661460302"
              slot="5868579434"
              className="w-full h-[600px]"
              responsive={true}
            />
          </div>
          <h2 className="font-semibold">Featured Games</h2>
          <div className="mt-4 grid gap-4">
            {featuredGames.map(renderGameCard)}
          </div>
        </aside>
      </div>
      {/* Footer */}
      <footer className="mt-12 border-t py-6">
        <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between px-24">
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">
              &copy; 2024 PolyTrack all rights reserved
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" prefetch={false} className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" prefetch={false} className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Polytrack.me
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}