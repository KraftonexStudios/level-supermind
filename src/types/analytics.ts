export type PostType = 'Carousel' | 'Reels' | 'Static Image'

export interface PostData {
  id: string
  type: PostType
  date: string
  likes: number
  shares: number
  comments: number
  impressions: number
  reach: number
  engagement_rate: number
}

export interface ChartData {
  name: string
  value: number
}

export interface EngagementData {
  name: string
  likes: number
  shares: number
  comments: number
}

