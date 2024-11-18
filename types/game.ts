export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  gameUrl: string;
  category: string;
  tags: string[];
  controls: {
    keyboard: boolean;
    mouse: boolean;
    touch: boolean;
  };
  author: {
    name: string;
    url: string;
  };
}

export interface GamesConfig {
  games: Game[];
  categories: string[];
  featuredGames: string[];
}