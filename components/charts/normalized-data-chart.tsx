"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Info } from "lucide-react"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NormalizedTokenData {
  dexId: string
  dexName: string
  chain: string
  price: number
  priceChange24h: number
  volume24h: number
  liquidity: number
  supply: number
  marketCap: number
  trades24h: number
  fees: string
  lastUpdated: string
}

interface NormalizedDataChartProps {
  tokenSymbol: string
  data: NormalizedTokenData[]
  metric: "price" | "supply" | "volume24h" | "liquidity" | "marketCap"
}

export function NormalizedDataChart({ tokenSymbol, data, metric }: NormalizedDataChartProps) {
  // Find the reference value (median) for the comparison metric
  const referenceValue = useMemo(() => {
    if (data.length === 0) return 0

    const values = data.map((item) => item[metric] as number)
    values.sort((a, b) => a - b)

    const mid = Math.floor(values.length / 2)
    return values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid]
  }, [data, metric])

  // Calculate percentage difference from the reference value
  const calculateDifference = (value: number) => {
    if (referenceValue === 0) return 0
    return ((value - referenceValue) / referenceValue) * 100
  }

  // Prepare chart data
  const chartData = useMemo(() => {
    return data
      .map((item) => ({
        name: item.dexName,
        value: item[metric] as number,
        difference: calculateDifference(item[metric] as number),
        chain: item.chain,
      }))
      .sort((a, b) => a.value - b.value)
  }, [data, metric, referenceValue])

  const getMetricLabel = () => {
    switch (metric) {
      case "price":
        return "Price (USD)"
      case "supply":
        return "Supply"
      case "volume24h":
        return "24h Volume"
      case "liquidity":
        return "Liquidity"
      case "marketCap":
        return "Market Cap"
      default:
        return metric
    }
  }

  const formatValue = (value: number) => {
    if (metric === "price") return `$${value.toFixed(4)}`
    if (metric === "supply") return value.toLocaleString()
    if (["volume24h", "liquidity", "marketCap"].includes(metric)) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  const getBarColor = (difference: number) => {
    if (difference === 0) return "hsl(var(--chart-4))"
    return difference > 0 ? "hsl(var(--chart-2))" : "hsl(var(--chart-3))"
  }

  return (
    <Card className="w-full overflow-hidden border-none shadow-md transition-all hover:shadow-lg dark:shadow-primary/5">
      <CardHeader className="bg-card pb-2 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">
                {tokenSymbol} {getMetricLabel()} Comparison
              </CardTitle>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-sm">
                    <p>
                      Comparing {getMetricLabel().toLowerCase()} for {tokenSymbol} across different DEXes. Values are
                      shown relative to the median value.
                    </p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <CardDescription className="mt-1">
              Median {getMetricLabel()}: {formatValue(referenceValue)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <ChartContainer
            config={{
              value: {
                label: getMetricLabel(),
                color: "hsl(var(--chart-1))",
              },
              difference: {
                label: "% Difference",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  domain={["dataMin - 10", "dataMax + 10"]}
                  tickFormatter={(value) => `${value.toFixed(0)}%`}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value, name, props) => {
                    if (name === "difference") return [`${value.toFixed(2)}%`, "% Difference"]
                    return [formatValue(value as number), getMetricLabel()]
                  }}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend />
                <Bar dataKey="difference" name="% Difference from Median" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.difference)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

