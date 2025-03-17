"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Info, PieChartIcon, BarChart3 } from "lucide-react"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface DexComparisonChartProps {
  dexes: Array<{
    id: string
    name: string
    chain: string
    volume24h: number
    liquidity: number
    priceUSD: number
    priceChange: number
    trades: number
    fees: string
  }>
  tokenSymbol: string
}

export function DexComparisonChart({ dexes, tokenSymbol }: DexComparisonChartProps) {
  const [metric, setMetric] = useState<"volume" | "liquidity" | "trades">("volume")
  const [chartType, setChartType] = useState<"bar" | "pie">("bar")

  const formatData = () => {
    return dexes.map((dex) => ({
      name: dex.name,
      volume: dex.volume24h / 1000, // Convert to K
      liquidity: dex.liquidity / 1000, // Convert to K
      trades: dex.trades,
      chain: dex.chain,
    }))
  }

  const chartData = formatData()

  const getYAxisLabel = () => {
    switch (metric) {
      case "volume":
        return "24h Volume (USD, thousands)"
      case "liquidity":
        return "Liquidity (USD, thousands)"
      case "trades":
        return "Number of Trades (24h)"
      default:
        return ""
    }
  }

  const getChartTitle = () => {
    switch (metric) {
      case "volume":
        return `${tokenSymbol} 24h Trading Volume by DEX`
      case "liquidity":
        return `${tokenSymbol} Liquidity by DEX`
      case "trades":
        return `${tokenSymbol} 24h Trades by DEX`
      default:
        return ""
    }
  }

  const getChartDescription = () => {
    switch (metric) {
      case "volume":
        return "Total trading volume in the last 24 hours"
      case "liquidity":
        return "Total liquidity available in pools"
      case "trades":
        return "Number of trades executed in the last 24 hours"
      default:
        return ""
    }
  }

  // Generate colors for pie chart
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5, 330 100% 50%))",
    "hsl(var(--chart-6, 190 100% 50%))",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
  ]

  // Custom legend formatter to show DEX names
  const renderLegend = (props: any) => {
    const { payload } = props

    return (
      <ul className="flex flex-wrap justify-center gap-4 pt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm">{entry.value}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Card className="w-full overflow-hidden border-none shadow-md transition-all hover:shadow-lg dark:shadow-primary/5">
      <CardHeader className="bg-card pb-2 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{getChartTitle()}</CardTitle>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-sm">
                    <p>
                      Comparing the top 10 DEXs by {metric} for {tokenSymbol}.
                    </p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <CardDescription className="mt-1">{getChartDescription()}</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Tabs
              value={metric}
              onValueChange={(value) => setMetric(value as "volume" | "liquidity" | "trades")}
              className="w-full sm:w-auto"
            >
              <TabsList className="w-full grid grid-cols-3 sm:w-auto">
                <TabsTrigger
                  value="volume"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Volume
                </TabsTrigger>
                <TabsTrigger
                  value="liquidity"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Liquidity
                </TabsTrigger>
                <TabsTrigger
                  value="trades"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Trades
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex rounded-md border">
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setChartType("bar")}
                aria-label="Bar chart view"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "pie" ? "default" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setChartType("pie")}
                aria-label="Pie chart view"
              >
                <PieChartIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[450px]">
          <ChartContainer
            config={{
              volume: {
                label: "Volume",
                color: "hsl(var(--chart-1))",
              },
              liquidity: {
                label: "Liquidity",
                color: "hsl(var(--chart-2))",
              },
              trades: {
                label: "Trades",
                color: "hsl(var(--chart-3))",
              },
            }}
          >
            {chartType === "bar" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    label={{
                      value: getYAxisLabel(),
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle" },
                    }}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend formatter={(value) => value} wrapperStyle={{ paddingTop: 20 }} />
                  <Bar
                    name={`${metric.charAt(0).toUpperCase() + metric.slice(1)} by DEX`}
                    dataKey={metric}
                    fill={`var(--color-${metric})`}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={140}
                    paddingAngle={2}
                    dataKey={metric}
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={true}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend content={renderLegend} layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

