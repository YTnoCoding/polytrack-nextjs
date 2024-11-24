import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function GET(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const gamesDirectory = path.join(process.cwd(), 'content/games');
    const fullPath = path.join(gamesDirectory, `${params.gameId}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return NextResponse.json({
      contentHtml,
      ...matterResult.data
    });
  } catch (error) {
    console.error(`Failed to load game content for ${params.gameId}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
