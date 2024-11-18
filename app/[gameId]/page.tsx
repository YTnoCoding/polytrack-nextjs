import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { GamePage } from '@/components/game-page';
import gamesConfig from '@/config/games.json';

interface GamePageProps {
  params: {
    gameId: string;
  };
}

// 预渲染所有游戏页面
export function generateStaticParams() {
  // 不为默认游戏生成页面，因为它在首页
  return gamesConfig.games
    .filter(game => game.id !== gamesConfig.games[0].id)
    .map((game) => ({
      gameId: game.id,
    }));
}

// 为每个游戏页面生成元数据
export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = gamesConfig.games.find((g) => g.id === params.gameId);

  if (!game) {
    return {
      title: 'Game Not Found - Game Portal',
      description: 'The requested game could not be found.',
    };
  }

  return {
    title: `${game.title} - Play Free Online at Game Portal`,
    description: game.description,
    openGraph: {
      title: `Play ${game.title} Online - Free at Game Portal`,
      description: game.description,
      images: [{ url: game.thumbnailUrl }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Play ${game.title} Online - Free at Game Portal`,
      description: game.description,
      images: [game.thumbnailUrl],
    },
  };
}

export default function Page({ params }: GamePageProps) {
  // 如果是默认游戏，返回 404，因为默认游戏应该在首页访问
  if (params.gameId === gamesConfig.games[0].id) {
    notFound();
  }

  const game = gamesConfig.games.find(g => g.id === params.gameId);
  if (!game) {
    notFound();
  }

  return <GamePage initialGameId={params.gameId} />;
}
