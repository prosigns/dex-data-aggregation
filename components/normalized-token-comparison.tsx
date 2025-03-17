"use client"

import { useState, useMemo } from "react"
import { ArrowDown, ArrowUp, ChevronDown, Info, Search, SlidersHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface NormalizedTokenComparisonProps {
  tokenSymbol: string
  tokenAddress: string
  normalizedData: NormalizedTokenData[]
}

export function NormalizedTokenComparison({
  tokenSymbol,
  tokenAddress,
  normalizedData,
}: NormalizedTokenComparisonProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<keyof NormalizedTokenData>("price")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [chain, setChain] = useState("all")
  const [comparisonMetric, setComparisonMetric] = useState<
    "price" | "supply" | "volume24h" | "liquidity" | "marketCap"
  >("price")

  const handleSort = (field: keyof NormalizedTokenData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filterByChain = (data: NormalizedTokenData[]) => {
    if (chain === "all") return data
    return data.filter((item) => item.chain.toLowerCase() === chain.toLowerCase())
  }

  const filterBySearch = (data: NormalizedTokenData[]) => {
    if (!searchQuery) return data
    return data.filter(
      (item) =>
        item.dexName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.chain.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const sortData = (data: NormalizedTokenData[]) => {
    return [...data].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })
  }

  const processedData = useMemo(() => {
    const filteredByChain = filterByChain(normalizedData)
    const filteredBySearch = filterBySearch(filteredByChain)
    return sortData(filteredBySearch)
  }, [normalizedData, chain, searchQuery, sortField, sortDirection])

  // Find the reference value (median) for the comparison metric
  const referenceValue = useMemo(() => {
    if (processedData.length === 0) return 0

    const values = processedData.map((item) => item[comparisonMetric] as number)
    values.sort((a, b) => a - b)

    const mid = Math.floor(values.length / 2)
    return values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid]
  }, [processedData, comparisonMetric])

  // Calculate percentage difference from the reference value
  const calculateDifference = (value: number) => {
    if (referenceValue === 0) return 0
    return ((value - referenceValue) / referenceValue) * 100
  }

  // Get unique chains for the filter
  const chains = useMemo(() => {
    const uniqueChains = new Set<string>()
    normalizedData.forEach((item) => uniqueChains.add(item.chain))
    return Array.from(uniqueChains)
  }, [normalizedData])

  return (
    <Card className="w-full overflow-hidden border-none shadow-md transition-all hover:shadow-lg dark:shadow-primary/5">
      <CardHeader className="bg-card pb-2 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">Normalized Token Comparison</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-sm">
                    <p>
                      Compare normalized data for {tokenSymbol} across different DEXes. Percentage differences are
                      calculated relative to the median value.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription className="mt-1">
              Token Address: {tokenAddress.substring(0, 8)}...{tokenAddress.substring(tokenAddress.length - 6)}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search DEXes..."
                className="w-full pl-9 sm:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search DEXes"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[220px]">
                <DropdownMenuLabel>Filter by Chain</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[300px]">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setChain("all")} className={chain === "all" ? "bg-muted" : ""}>
                      All Chains
                    </DropdownMenuItem>
                    {chains.map((c) => (
                      <DropdownMenuItem key={c} onClick={() => setChain(c)} className={chain === c ? "bg-muted" : ""}>
                        {c}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
            <Tabs
              value={comparisonMetric}
              onValueChange={(value) => setComparisonMetric(value as any)}
              className="hidden sm:block"
            >
              <TabsList>
                <TabsTrigger
                  value="price"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Price
                </TabsTrigger>
                <TabsTrigger
                  value="supply"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Supply
                </TabsTrigger>
                <TabsTrigger
                  value="volume24h"
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
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto">
          <Table className="w-full">
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[180px]">Exchange</TableHead>
                <TableHead>Chain</TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("price")}>
                  <div className="flex items-center justify-end">
                    Price (USD)
                    {sortField === "price" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("supply")}>
                  <div className="flex items-center justify-end">
                    Supply
                    {sortField === "supply" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("volume24h")}>
                  <div className="flex items-center justify-end">
                    24h Volume
                    {sortField === "volume24h" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("liquidity")}>
                  <div className="flex items-center justify-end">
                    Liquidity
                    {sortField === "liquidity" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-right">Difference</TableHead>
                <TableHead className="text-right">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.map((item) => {
                const difference = calculateDifference(item[comparisonMetric] as number)
                return (
                  <TableRow key={item.dexId} className="group transition-colors hover:bg-muted/50">
                    <TableCell className="font-medium">{item.dexName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {item.chain}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      ${item.price.toFixed(4)}
                      {comparisonMetric === "price" && difference !== 0 && (
                        <span className={`ml-2 text-xs ${difference > 0 ? "text-green-500" : "text-red-500"}`}>
                          {difference > 0 ? "+" : ""}
                          {difference.toFixed(2)}%
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {item.supply.toLocaleString()}
                      {comparisonMetric === "supply" && difference !== 0 && (
                        <span className={`ml-2 text-xs ${difference > 0 ? "text-green-500" : "text-red-500"}`}>
                          {difference > 0 ? "+" : ""}
                          {difference.toFixed(2)}%
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      ${(item.volume24h / 1000).toFixed(1)}K
                      {comparisonMetric === "volume24h" && difference !== 0 && (
                        <span className={`ml-2 text-xs ${difference > 0 ? "text-green-500" : "text-red-500"}`}>
                          {difference > 0 ? "+" : ""}
                          {difference.toFixed(2)}%
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      ${(item.liquidity / 1000).toFixed(1)}K
                      {comparisonMetric === "liquidity" && difference !== 0 && (
                        <span className={`ml-2 text-xs ${difference > 0 ? "text-green-500" : "text-red-500"}`}>
                          {difference > 0 ? "+" : ""}
                          {difference.toFixed(2)}%
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {difference !== 0 ? (
                        <Badge
                          variant="outline"
                          className={`font-medium ${
                            difference > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {difference > 0 ? "+" : ""}
                          {difference.toFixed(2)}%
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 font-medium">
                          Median
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs">{item.lastUpdated}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

