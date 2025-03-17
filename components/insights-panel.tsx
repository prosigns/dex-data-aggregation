"use client"

import { ArrowRight, BarChart3, LineChart, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for insights
const insights = [
  {
    id: "1",
    title: "ETH trading volume surges 15% in the last 24 hours",
    description:
      "Ethereum has seen a significant increase in trading activity across all major DEXs, with Uniswap leading the volume.",
    category: "Volume",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "New liquidity pool for SOL/USDC launched on SushiSwap",
    description:
      "The new pool has already attracted over $5M in liquidity, offering competitive swap rates for traders.",
    category: "Liquidity",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    title: "BTC/ETH pair showing unusual price correlation",
    description:
      "The trading pattern between Bitcoin and Ethereum has shown a divergence from historical trends in the past 48 hours.",
    category: "Correlation",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    title: "PancakeSwap volume exceeds Uniswap for BNB-based tokens",
    description:
      "For the first time this month, PancakeSwap has overtaken Uniswap in trading volume for BNB ecosystem tokens.",
    category: "Market Share",
    timestamp: "1 day ago",
  },
]

export function InsightsPanel() {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md dark:hover:shadow-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Market Insights</CardTitle>
            <CardDescription>AI-powered trading insights and analysis</CardDescription>
          </div>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid gap-1 p-4 md:grid-cols-2">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="group flex cursor-pointer flex-col gap-2 rounded-lg border p-4 transition-all hover:border-primary hover:bg-muted/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  {insight.category === "Volume" && <BarChart3 className="h-4 w-4 text-primary" />}
                  {insight.category === "Liquidity" && <LineChart className="h-4 w-4 text-primary" />}
                  {insight.category === "Correlation" ||
                    (insight.category === "Market Share" && <TrendingUp className="h-4 w-4 text-primary" />)}
                </div>
                <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
              </div>
              <div>
                <h4 className="font-medium">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-medium text-primary">{insight.category}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 px-2 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <span className="text-xs">View Details</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

