import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis } from "recharts"

const dailyData = [
  { day: "Mon", value: 340 },
  { day: "Tue", value: 280 },
  { day: "Wed", value: 420 },
  { day: "Thu", value: 380 },
  { day: "Fri", value: 290 },
  { day: "Sat", value: 360 },
  { day: "Sun", value: 400 },
]

export function DailyStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Posts",
              color: "hsl(var(--warning))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <XAxis dataKey="day" />
              <Bar
                dataKey="value"
                fill="hsl(var(--warning))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

