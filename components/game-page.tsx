'use client';

import { Bell, Heart, Menu, Search, Share2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import GameFrame from './GameFrame'
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
    return gamesConfig.games.filter(g => gamesConfig.featuredGames.includes(g.id))
  }, [])

  const relatedGames = useMemo(() => {
    return gamesConfig.games
      .filter(g => g.id !== game.id && g.category === game.category)
      .slice(0, 5)
  }, [game])

  const renderGameCard = useCallback((game: Game) => {
    const href = game.id === gamesConfig.games[0].id ? '/' : `/${game.id}`
    return (
      <Link
        key={game.id}
        href={href}
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
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-xl font-bold">Game Portal</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-4">
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
            {/* First Ad Placement */}
            <div className="mt-8 w-full h-[120px] bg-muted flex items-center justify-center rounded-lg">
              <span className="text-muted-foreground">Advertisement</span>
            </div>
            <div className="mt-6">
              <div className="flex gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold">{game.title}</h1>
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
                {/* Vertical Ad Space */}
                <div className="hidden w-[300px] lg:block">
                  <div className="sticky top-4">
                    <div className="w-full h-[600px] bg-muted flex items-center justify-center rounded-lg">
                      <span className="text-muted-foreground">Advertisement</span>
                    </div>
                  </div>
                </div>
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
          {/* Ad Placement */}
          <div className="mb-6 w-full h-[336px] bg-muted flex items-center justify-center rounded-lg">
            <span className="text-muted-foreground">Advertisement</span>
          </div>
          <h2 className="font-semibold">Featured Games</h2>
          <div className="mt-4 grid gap-4">
            {featuredGames.map(renderGameCard)}
          </div>
        </aside>
      </div>
      <footer className="bg-background border-t mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <div className="text-center text-sm text-muted-foreground">
            &copy; 2024 Game Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}