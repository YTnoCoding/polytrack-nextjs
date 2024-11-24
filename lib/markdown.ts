import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

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

  return {
    contentHtml,
    ...matterResult.data
  };
}
