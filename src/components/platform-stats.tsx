"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Instagram, Facebook, Twitter } from 'lucide-react'

const platforms = [
  {
    name: "Instagram",
    percentage: 65,
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    name: "Facebook",
    percentage: 40,
    icon: Facebook,
    color: "bg-gradient-to-r from-blue-600 to-blue-400",
  },
  {
    name: "Twitter",
    percentage: 25,
    icon: Twitter,
    color: "bg-gradient-to-r from-sky-500 to-sky-300",
  },
]

export function PlatformStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {platforms.map((platform) => (
          <div key={platform.name} className="space-y-2">
            <div className="flex items-center gap-2">
              <platform.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{platform.name}</span>
              <span className="ml-auto text-sm text-muted-foreground">
                {platform.percentage}%
              </span>
            </div>
            <Progress value={platform.percentage} className={platform.color} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

