"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for the chart
const data = [
  { name: "Uniswap", value: 45, color: "hsl(var(--chart-1))" },
  { name: "SushiSwap", value: 20, color: "hsl(var(--chart-2))" },
  { name: "PancakeSwap", value: 25, color: "hsl(var(--chart-3))" },
  { name: "Curve", value: 10, color: "hsl(var(--chart-4))" },
]

export function MarketShareChart() {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md dark:hover:shadow-primary/5">
      <CardHeader>
        <CardTitle>Market Share</CardTitle>
        <CardDescription>DEX trading volume distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              uniswap: {
                label: "Uniswap",
                color: "hsl(var(--chart-1))",
              },
              sushiswap: {
                label: "SushiSwap",
                color: "hsl(var(--chart-2))",
              },
              pancakeswap: {
                label: "PancakeSwap",
                color: "hsl(var(--chart-3))",
              },
              curve: {
                label: "Curve",
                color: "hsl(var(--chart-4))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

