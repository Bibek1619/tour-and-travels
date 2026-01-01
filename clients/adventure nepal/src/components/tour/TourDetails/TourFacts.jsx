import { Card, CardContent } from "@/components/ui/card"

export default function TourFacts({ facts = [] }) {
  // 🔹 Debug: check what facts is
 

  if (!facts.length) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {facts.map((fact, i) => {
        const Icon = fact.icon
        return (
          <Card key={i} className="border-2 hover:border-emerald-200 hover:shadow-md transition">
            <CardContent className="p-4 text-center">
              {Icon && <Icon className="h-6 w-6 mx-auto mb-2 text-green-600" />}
              <p className="text-xs text-muted-foreground mb-1">{fact.label}</p>
              <p className="font-semibold text-sm">{fact.value}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
