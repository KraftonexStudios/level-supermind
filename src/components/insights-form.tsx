"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PostType } from "@/types/analytics"

export function InsightsForm() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    postType: "Carousel"
  })

  const [insights, setInsights] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mock API call
    setInsights("Based on the data analysis, Carousel posts show 20% higher engagement compared to Static Images, while Reels generate 2x more comments on average.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              placeholder="Start Date"
            />
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              placeholder="End Date"
            />
            <Select
              value={formData.postType}
              onValueChange={(value: PostType) => setFormData({ ...formData, postType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Post Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Carousel">Carousel</SelectItem>
                <SelectItem value="Reels">Reels</SelectItem>
                <SelectItem value="Static Image">Static Image</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Generate Insights</Button>
        </form>
        {insights && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            {insights}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

