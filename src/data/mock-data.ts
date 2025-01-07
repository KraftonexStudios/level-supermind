import { PostData, PostType } from '../types/analytics'

const generateMockData = (): PostData[] => {
  const postTypes: PostType[] = ['Carousel', 'Reels', 'Static Image']
  const data: PostData[] = []

  for (let i = 0; i < 180; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    const type = postTypes[Math.floor(Math.random() * postTypes.length)]
    const baseEngagement = type === 'Reels' ? 1.5 : type === 'Carousel' ? 1.2 : 1

    const likes = Math.floor(Math.random() * 1000 * baseEngagement)
    const shares = Math.floor(Math.random() * 200 * baseEngagement)
    const comments = Math.floor(Math.random() * 100 * baseEngagement)
    const impressions = Math.floor(Math.random() * 5000 * baseEngagement)
    const reach = Math.floor(impressions * 0.7)
    
    data.push({
      id: `post-${i}`,
      type,
      date: date.toISOString().split('T')[0],
      likes,
      shares,
      comments,
      impressions,
      reach,
      engagement_rate: ((likes + shares + comments) / impressions) * 100
    })
  }

  console.log(data);
  return data
  
}

export const mockData = generateMockData()

