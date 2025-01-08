"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, Label } from "recharts"

const performanceData = Array.from({ length: 12 }, (_, i) => ({
  name: i + 1,
  value: Math.floor(Math.random() * 100) + 50,
}))

const chartConfig = {
  // Add your chart configuration here
}

export function PerformanceMetrics() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <Card className="bg-gradient-to-br from-indigo-500 to-purple-600">
        <CardHeader>
          <CardTitle className="text-white text-sm font-medium">Followers Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">31.6K</div>
          <ChartContainer className="h-[60px]" config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-pink-500 to-rose-600">
        <CardHeader>
          <CardTitle className="text-white text-sm font-medium">Engagement Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">18.2%</div>
          <ChartContainer className="h-[60px]" config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#fff"
                  fill="#fff"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-500 to-teal-600">
        <CardHeader>
          <CardTitle className="text-white text-sm font-medium">Reach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">52.4K</div>
          <ChartContainer className="h-[60px]" config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

