import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gamesConfig from '@/config/games.json';

export interface GameContent {
  contentHtml: string;
  title: string;
  description: string;
  [key: string]: any;
}

export async function getGameContent(gameId: string): Promise<GameContent> {
  const gamesDirectory = path.join(process.cwd(), 'content/games');
  const fullPath = path.join(gamesDirectory, `${gameId}.md`);
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 从 games.json 获取游戏信息
  const game = gamesConfig.games.find(g => g.id === gameId);
  if (!game) {
    throw new Error(`Game with id ${gameId} not found in games.json`);
  }

  return {
    contentHtml,
    title: game.title,
    description: game.description,
    ...matterResult.data,
  };
}
