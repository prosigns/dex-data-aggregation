"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ArrowDown, ArrowUp, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for the chart
const generateVolumeData = (timeframe: string) => {
  const data = []
  const now = new Date()
  const points = timeframe === "24h" ? 24 : timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 12
  const interval =
    timeframe === "24h"
      ? 60 * 60 * 1000
      : timeframe === "7d"
        ? 24 * 60 * 60 * 1000
        : timeframe === "30d"
          ? 24 * 60 * 60 * 1000
          : 30 * 24 * 60 * 60 * 1000

  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * interval)
    const uniswapVolume = Math.floor(Math.random() * 1000000) + 500000
    const sushiswapVolume = Math.floor(Math.random() * 800000) + 300000
    const pancakeswapVolume = Math.floor(Math.random() * 1200000) + 600000

    data.push({
      time:
        timeframe === "24h"
          ? time.getHours() + ":00"
          : timeframe === "7d" || timeframe === "30d"
            ? time.toLocaleDateString("en-US", { month: "short", day: "numeric" })
            : time.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
      uniswap: uniswapVolume,
      sushiswap: sushiswapVolume,
      pancakeswap: pancakeswapVolume,
      total: uniswapVolume + sushiswapVolume + pancakeswapVolume,
    })
  }

  return data
}

interface TradingVolumeChartProps {
  timeframe: string
  onTimeframeChange: (timeframe: string) => void
}

export function TradingVolumeChart({ timeframe, onTimeframeChange }: TradingVolumeChartProps) {
  const [selectedExchange, setSelectedExchange] = useState("all")
  const data = generateVolumeData(timeframe)

  // Calculate total volume and change
  const totalVolume = data.reduce((sum, item) => sum + item.total, 0)
  const formattedVolume = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(totalVolume)

  // Calculate percentage change (mock data)
  const percentChange = 8.34
  const isPositive = percentChange > 0

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md dark:hover:shadow-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Trading Volume</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <span>Real-time DEX trading activity</span>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Trading volume represents the total value of all trades executed on decentralized exchanges over
                      the selected time period.
                    </p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold">{formattedVolume}</div>
            <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              <span className="ml-1">{percentChange}%</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-b px-6 pb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Tabs defaultValue={timeframe} onValueChange={onTimeframeChange} className="w-auto">
              <TabsList>
                <TabsTrigger value="24h">24H</TabsTrigger>
                <TabsTrigger value="7d">7D</TabsTrigger>
                <TabsTrigger value="30d">30D</TabsTrigger>
                <TabsTrigger value="1y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex gap-2">
              <Button
                variant={selectedExchange === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedExchange("all")}
              >
                All DEXs
              </Button>
              <Button
                variant={selectedExchange === "uniswap" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedExchange("uniswap")}
              >
                Uniswap
              </Button>
              <Button
                variant={selectedExchange === "sushiswap" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedExchange("sushiswap")}
              >
                SushiSwap
              </Button>
              <Button
                variant={selectedExchange === "pancakeswap" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedExchange("pancakeswap")}
              >
                PancakeSwap
              </Button>
            </div>
          </div>
        </div>
        <div className="h-[350px] w-full p-4">
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
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="uniswapGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-uniswap)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-uniswap)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="sushiswapGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-sushiswap)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-sushiswap)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pancakeswapGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-pancakeswap)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-pancakeswap)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                  dx={-10}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                {(selectedExchange === "all" || selectedExchange === "uniswap") && (
                  <Area
                    type="monotone"
                    dataKey="uniswap"
                    stroke="var(--color-uniswap)"
                    fillOpacity={1}
                    fill="url(#uniswapGradient)"
                    strokeWidth={2}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                )}
                {(selectedExchange === "all" || selectedExchange === "sushiswap") && (
                  <Area
                    type="monotone"
                    dataKey="sushiswap"
                    stroke="var(--color-sushiswap)"
                    fillOpacity={1}
                    fill="url(#sushiswapGradient)"
                    strokeWidth={2}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                )}
                {(selectedExchange === "all" || selectedExchange === "pancakeswap") && (
                  <Area
                    type="monotone"
                    dataKey="pancakeswap"
                    stroke="var(--color-pancakeswap)"
                    fillOpacity={1}
                    fill="url(#pancakeswapGradient)"
                    strokeWidth={2}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

