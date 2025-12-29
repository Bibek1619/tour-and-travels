"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontal, X } from "lucide-react"

 export  default function TourFilter() {
  const [selectedDifficulty, setSelectedDifficulty] = useState([])
  const [selectedDuration, setSelectedDuration] = useState([])

  const difficulties = ["Easy", "Moderate", "Challenging", "Difficult"]
  const durations = ["1-5 Days", "6-10 Days", "11-15 Days", "15+ Days"]

  const toggleFilter = (type, value) => {
    if (type === "difficulty") {
      setSelectedDifficulty((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      )
    } else {
      setSelectedDuration((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      )
    }
  }

  const clearFilters = () => {
    setSelectedDifficulty([])
    setSelectedDuration([])
  }

  const hasFilters =
    selectedDifficulty.length > 0 || selectedDuration.length > 0

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            Filter Tours
          </h3>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Difficulty Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Difficulty Level
            </label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <Badge
                  key={difficulty}
                  variant={
                    selectedDifficulty.includes(difficulty)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() =>
                    toggleFilter("difficulty", difficulty)
                  }
                >
                  {difficulty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Duration
            </label>
            <div className="flex flex-wrap gap-2">
              {durations.map((duration) => (
                <Badge
                  key={duration}
                  variant={
                    selectedDuration.includes(duration)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() =>
                    toggleFilter("duration", duration)
                  }
                >
                  {duration}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
