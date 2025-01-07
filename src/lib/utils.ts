import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PostData } from '../types/analytics'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const processEngagementByType = (data: PostData[]) => {
  const engagementByType = data.reduce((acc, post) => {
    if (!acc[post.type]) {
      acc[post.type] = { name: post.type, likes: 0, shares: 0, comments: 0, count: 0 }
    }
    acc[post.type].likes += post.likes
    acc[post.type].shares += post.shares
    acc[post.type].comments += post.comments
    acc[post.type].count += 1
    return acc
  }, {} as Record<string, { name: string; likes: number; shares: number; comments: number; count: number }>)

  // Convert the object to an array and calculate averages
  return Object.values(engagementByType).map(type => ({
    name: type.name,
    likes: Math.round(type.likes / type.count),
    shares: Math.round(type.shares / type.count),
    comments: Math.round(type.comments / type.count)
  }))
}

// Other functions remain unchanged
export const processReachData = (data: PostData[]) => {
  return data.slice(0, 30).map(post => ({
    name: post.date,
    value: post.reach
  }))
}

export const processEngagementRate = (data: PostData[]) => {
  const engagementRateByType = data.reduce((acc, post) => {
    if (!acc[post.type]) {
      acc[post.type] = { total: 0, count: 0 }
    }
    acc[post.type].total += post.engagement_rate
    acc[post.type].count += 1
    return acc
  }, {} as Record<string, { total: number; count: number }>)

  return Object.entries(engagementRateByType).map(([type, data]) => ({
    name: type,
    value: Number((data.total / data.count).toFixed(2))
  }))
}

