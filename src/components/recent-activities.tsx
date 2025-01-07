import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Share2, MessageCircle, TrendingUp, Award } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: "like",
    content: "Post reached 1k likes",
    time: "2 minutes ago",
    icon: Heart,
    iconColor: "text-red-500",
  },
  {
    id: 2,
    type: "share",
    content: "Campaign shared by influencer",
    time: "5 minutes ago",
    icon: Share2,
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    type: "comment",
    content: "New comment thread trending",
    time: "10 minutes ago",
    icon: MessageCircle,
    iconColor: "text-green-500",
  },
  {
    id: 4,
    type: "trending",
    content: "Post trending in #fashion",
    time: "15 minutes ago",
    icon: TrendingUp,
    iconColor: "text-purple-500",
  },
  {
    id: 5,
    type: "achievement",
    content: "Reached 100k followers",
    time: "1 hour ago",
    icon: Award,
    iconColor: "text-yellow-500",
  },
]

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`rounded-full p-2 ${activity.iconColor} bg-opacity-10`}>
                  <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.content}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

