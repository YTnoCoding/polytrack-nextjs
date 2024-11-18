import { MetadataRoute } from 'next'
import gamesConfig from '@/config/games.json'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 本地开发使用 localhost，生产环境使用实际域名
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000'
    : 'https://gameportal.com'

  const currentDate = new Date().toISOString()

  // 首页
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate, 
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // 游戏页面（除了默认游戏）
  const gameRoutes = gamesConfig.games
    .filter(game => game.id !== gamesConfig.games[0].id)
    .map(game => ({
      url: `${baseUrl}/${game.id}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // 分类页面
  const categoryRoutes = gamesConfig.categories.map(category => ({
    url: `${baseUrl}/category/${category.toLowerCase()}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...routes, ...gameRoutes, ...categoryRoutes]
}
