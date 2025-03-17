"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, ChevronRight, Filter, Info, Search, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for trending tokens
const trendingTokens = [
  {
    id: "1",
    name: "NewFinance",
    symbol: "NFIN",
    price: 0.0567,
    change24h: 145.43,
    volume24h: 8500000,
    marketCap: 12000000,
    exchanges: 52,
    launchDate: "2 days ago",
    category: "DeFi",
    isNew: true,
    isERC20: true,
    blockchain: "Ethereum",
  },
  {
    id: "2",
    name: "MetaBlock",
    symbol: "MBLK",
    price: 0.0089,
    change24h: 87.18,
    volume24h: 6700000,
    marketCap: 8500000,
    exchanges: 48,
    launchDate: "5 days ago",
    category: "Metaverse",
    isNew: true,
    isERC20: true,
    blockchain: "Polygon",
  },
  {
    id: "3",
    name: "GreenDAO",
    symbol: "GDAO",
    price: 0.0345,
    change24h: 62.92,
    volume24h: 5200000,
    marketCap: 7800000,
    exchanges: 45,
    launchDate: "1 week ago",
    category: "DAO",
    isNew: true,
    isERC20: true,
    blockchain: "Ethereum",
  },
  {
    id: "4",
    name: "AstroSwap",
    symbol: "ASTRO",
    price: 0.0128,
    change24h: 54.34,
    volume24h: 4800000,
    marketCap: 6500000,
    exchanges: 51,
    launchDate: "3 days ago",
    category: "DEX",
    isNew: true,
    isERC20: true,
    blockchain: "BSC",
  },
  {
    id: "5",
    name: "CryptoAI",
    symbol: "CAI",
    price: 0.0782,
    change24h: 48.23,
    volume24h: 4200000,
    marketCap: 9800000,
    exchanges: 47,
    launchDate: "4 days ago",
    category: "AI",
    isNew: true,
    isERC20: true,
    blockchain: "Ethereum",
  },
  {
    id: "6",
    name: "GameVerse",
    symbol: "GVERSE",
    price: 0.0432,
    change24h: 42.67,
    volume24h: 3800000,
    marketCap: 5600000,
    exchanges: 49,
    launchDate: "6 days ago",
    category: "Gaming",
    isNew: true,
    isERC20: true,
    blockchain: "Polygon",
  },
  {
    id: "7",
    name: "DataChain",
    symbol: "DCHAIN",
    price: 0.0215,
    change24h: 38.92,
    volume24h: 3500000,
    marketCap: 4900000,
    exchanges: 46,
    launchDate: "1 week ago",
    category: "Data",
    isNew: true,
    isERC20: true,
    blockchain: "Ethereum",
  },
  {
    id: "8",
    name: "SocialToken",
    symbol: "SOCL",
    price: 0.0067,
    change24h: 35.78,
    volume24h: 3200000,
    marketCap: 4200000,
    exchanges: 44,
    launchDate: "8 days ago",
    category: "Social",
    isNew: true,
    isERC20: true,
    blockchain: "BSC",
  },
  {
    id: "9",
    name: "PrivacyShield",
    symbol: "PRIV",
    price: 0.0321,
    change24h: 32.45,
    volume24h: 2900000,
    marketCap: 5100000,
    exchanges: 50,
    launchDate: "5 days ago",
    category: "Privacy",
    isNew: true,
    isERC20: true,
    blockchain: "Ethereum",
  },
  {
    id: "10",
    name: "EcoChain",
    symbol: "ECO",
    price: 0.0178,
    change24h: 29.87,
    volume24h: 2600000,
    marketCap: 3800000,
    exchanges: 43,
    launchDate: "9 days ago",
    category: "Sustainability",
    isNew: true,
    isERC20: true,
    blockchain: "Polygon",
  },
  {
    id: "11",
    name: "QuantumFinance",
    symbol: "QFIN",
    price: 0.0456,
    change24h: 27.34,
    volume24h: 2400000,
    marketCap: 6200000,
    exchanges: 48,
    launchDate: "10 days ago",
    category: "DeFi",
    isNew: true,
    isERC20: true,
    blockchain: "Ethereum",
  },
  {
    id: "12",
    name: "NFTVerse",
    symbol: "NFTV",
    price: 0.0092,
    change24h: 25.67,
    volume24h: 2200000,
    marketCap: 3500000,
    exchanges: 45,
    launchDate: "2 weeks ago",
    category: "NFT",
    isNew: true,
    isERC20: true,
    blockchain: "BSC",
  },
]

// More established tokens for comparison
const popularTokens = [
  {
    id: "101",
    name: "Ethereum",
    symbol: "ETH",
    price: 3245.67,
    change24h: 5.43,
    volume24h: 12500000000,
    marketCap: 389000000000,
    exchanges: 120,
    launchDate: "2015",
    category: "Layer 1",
    isNew: false,
    isERC20: false,
    blockchain: "Ethereum",
  },
  {
    id: "102",
    name: "Solana",
    symbol: "SOL",
    price: 123.45,
    change24h: 8.92,
    volume24h: 5600000000,
    marketCap: 49000000000,
    exchanges: 98,
    launchDate: "2020",
    category: "Layer 1",
    isNew: false,
    isERC20: false,
    blockchain: "Solana",
  },
  {
    id: "103",
    name: "Uniswap",
    symbol: "UNI",
    price: 7.82,
    change24h: 3.23,
    volume24h: 980000000,
    marketCap: 5800000000,
    exchanges: 87,
    launchDate: "2020",
    category: "DEX",
    isNew: false,
    isERC20: true,
    blockchain: "Ethereum",
  },
  {
    id: "104",
    name: "Chainlink",
    symbol: "LINK",
    price: 14.32,
    change24h: 2.67,
    volume24h: 780000000,
    marketCap: 7600000000,
    exchanges: 92,
    launchDate: "2017",
    category: "Oracle",
    isNew: false,
    isERC20: true,
    blockchain: "Ethereum",
  },
]

interface TrendingTokensPanelProps {
  onSelectToken: (tokenId: string) => void
}

export function TrendingTokensPanel({ onSelectToken }: TrendingTokensPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("change24h")
  const [sortDirection, setSortDirection] = useState("desc")
  const [timeframe, setTimeframe] = useState("24h")
  const [category, setCategory] = useState("all")
  const [tokenType, setTokenType] = useState("all") // "all", "erc20", "non-erc20"

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filterTokensByCategory = (tokens: typeof trendingTokens) => {
    if (category === "all") return tokens
    return tokens.filter((token) => token.category.toLowerCase() === category.toLowerCase())
  }

  const filterTokensByType = (tokens: typeof trendingTokens) => {
    if (tokenType === "all") return tokens
    if (tokenType === "erc20") return tokens.filter((token) => token.isERC20)
    return tokens.filter((token) => !token.isERC20)
  }

  const filterTokensBySearch = (tokens: typeof trendingTokens) => {
    if (!searchQuery) return tokens
    return tokens.filter(
      (token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const sortTokens = (tokens: typeof trendingTokens) => {
    return [...tokens].sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof b]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }

  const processTokens = (tokens: typeof trendingTokens) => {
    const filteredByCategory = filterTokensByCategory(tokens)
    const filteredByType = filterTokensByType(filteredByCategory)
    const searched = filterTokensBySearch(filteredByType)
    return sortTokens(searched)
  }

  const processedTrendingTokens = processTokens(trendingTokens)
  const processedPopularTokens = processTokens(popularTokens)

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "defi", label: "DeFi" },
    { value: "metaverse", label: "Metaverse" },
    { value: "dao", label: "DAO" },
    { value: "dex", label: "DEX" },
    { value: "ai", label: "AI" },
    { value: "gaming", label: "Gaming" },
    { value: "nft", label: "NFT" },
    { value: "layer 1", label: "Layer 1" },
    { value: "privacy", label: "Privacy" },
    { value: "social", label: "Social" },
    { value: "sustainability", label: "Sustainability" },
    { value: "data", label: "Data" },
    { value: "oracle", label: "Oracle" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Token Explorer</h1>
          <p className="mt-1 text-muted-foreground">Discover trending tokens and compare across 50+ DEXs</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tokens..."
              className="w-full pl-9 sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search tokens"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px]">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-[300px]">
                <DropdownMenuGroup>
                  {categories.map((cat) => (
                    <DropdownMenuItem
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={category === cat.value ? "bg-muted" : ""}
                    >
                      {cat.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </ScrollArea>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Token Type</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setTokenType("all")} className={tokenType === "all" ? "bg-muted" : ""}>
                  All Tokens
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTokenType("erc20")}
                  className={tokenType === "erc20" ? "bg-muted" : ""}
                >
                  ERC20 Tokens
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTokenType("non-erc20")}
                  className={tokenType === "non-erc20" ? "bg-muted" : ""}
                >
                  Non-ERC20 Tokens
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="mb-6 w-full justify-start sm:w-auto">
          <TabsTrigger
            value="trending"
            className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Trending New Tokens</span>
          </TabsTrigger>
          <TabsTrigger
            value="popular"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Popular Tokens
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="mt-0">
          <Card className="w-full overflow-hidden border-none shadow-md dark:shadow-primary/5">
            <CardHeader className="bg-card px-6 pb-4 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">Trending New Tokens</CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-sm">
                          <p>
                            Recently launched tokens with high trading activity and significant price movement in the
                            last 24 hours.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription className="mt-1">
                    {category !== "all" && tokenType !== "all"
                      ? `Showing ${processedTrendingTokens.length} ${tokenType === "erc20" ? "ERC20" : "Non-ERC20"} ${category.toUpperCase()} tokens`
                      : category !== "all"
                        ? `Showing ${processedTrendingTokens.length} ${category.toUpperCase()} tokens`
                        : tokenType !== "all"
                          ? `Showing ${processedTrendingTokens.length} ${tokenType === "erc20" ? "ERC20" : "Non-ERC20"} tokens across all categories`
                          : `Showing ${processedTrendingTokens.length} tokens across all categories`}
                  </CardDescription>
                </div>
                <Tabs value={timeframe} onValueChange={setTimeframe} className="hidden sm:block">
                  <TabsList>
                    <TabsTrigger value="24h">24H</TabsTrigger>
                    <TabsTrigger value="7d">7D</TabsTrigger>
                    <TabsTrigger value="30d">30D</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-auto">
                <Table className="w-full">
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="w-[180px]">Token</TableHead>
                      <TableHead className="cursor-pointer text-right" onClick={() => handleSort("price")}>
                        <div className="flex items-center justify-end">
                          Price
                          {sortField === "price" &&
                            (sortDirection === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer text-right" onClick={() => handleSort("change24h")}>
                        <div className="flex items-center justify-end">
                          24h Change
                          {sortField === "change24h" &&
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
                      <TableHead className="text-right">DEXs</TableHead>
                      <TableHead className="text-right">Type</TableHead>
                      <TableHead className="text-right">Category</TableHead>
                      <TableHead className="text-right">Launched</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {processedTrendingTokens.map((token) => (
                      <TableRow
                        key={token.id}
                        className="group cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => onSelectToken(token.id)}
                      >
                        <TableCell className="font-medium">
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{token.name}</span>
                              {token.isNew && (
                                <Badge
                                  variant="outline"
                                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600"
                                >
                                  New
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{token.symbol}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums">
                          $
                          {token.price.toLocaleString(undefined, {
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 4,
                          })}
                        </TableCell>
                        <TableCell
                          className={`text-right font-medium tabular-nums ${token.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          <div className="flex items-center justify-end">
                            {token.change24h >= 0 ? (
                              <ArrowUp className="mr-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="mr-1 h-4 w-4" />
                            )}
                            {token.change24h.toFixed(2)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          ${(token.volume24h / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{token.exchanges}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={
                              token.isERC20 ? "bg-blue-500/10 text-blue-500" : "bg-purple-500/10 text-purple-500"
                            }
                          >
                            {token.isERC20 ? "ERC20" : "Native"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary" className="font-normal">
                            {token.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">{token.launchDate}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">View details for {token.name}</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="mt-0">
          <Card className="w-full overflow-hidden border-none shadow-md dark:shadow-primary/5">
            <CardHeader className="bg-card px-6 pb-4 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">Popular Tokens</CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-sm">
                          <p>Established tokens with high market cap and liquidity across multiple DEXs.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription className="mt-1">
                    {category !== "all" && tokenType !== "all"
                      ? `Showing ${processedPopularTokens.length} ${tokenType === "erc20" ? "ERC20" : "Non-ERC20"} ${category.toUpperCase()} tokens`
                      : category !== "all"
                        ? `Showing ${processedPopularTokens.length} ${category.toUpperCase()} tokens`
                        : tokenType !== "all"
                          ? `Showing ${processedPopularTokens.length} ${tokenType === "erc20" ? "ERC20" : "Non-ERC20"} tokens across all categories`
                          : `Showing ${processedPopularTokens.length} tokens across all categories`}
                  </CardDescription>
                </div>
                <Tabs value={timeframe} onValueChange={setTimeframe} className="hidden sm:block">
                  <TabsList>
                    <TabsTrigger value="24h">24H</TabsTrigger>
                    <TabsTrigger value="7d">7D</TabsTrigger>
                    <TabsTrigger value="30d">30D</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-auto">
                <Table className="w-full">
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="w-[180px]">Token</TableHead>
                      <TableHead className="cursor-pointer text-right" onClick={() => handleSort("price")}>
                        <div className="flex items-center justify-end">
                          Price
                          {sortField === "price" &&
                            (sortDirection === "asc" ? (
                              <ArrowUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer text-right" onClick={() => handleSort("change24h")}>
                        <div className="flex items-center justify-end">
                          24h Change
                          {sortField === "change24h" &&
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
                      <TableHead className="text-right">DEXs</TableHead>
                      <TableHead className="text-right">Type</TableHead>
                      <TableHead className="text-right">Category</TableHead>
                      <TableHead className="text-right">Launched</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {processedPopularTokens.map((token) => (
                      <TableRow
                        key={token.id}
                        className="group cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => onSelectToken(token.id)}
                      >
                        <TableCell className="font-medium">
                          <div>
                            <div>{token.name}</div>
                            <div className="text-xs text-muted-foreground">{token.symbol}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums">
                          $
                          {token.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell
                          className={`text-right font-medium tabular-nums ${token.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          <div className="flex items-center justify-end">
                            {token.change24h >= 0 ? (
                              <ArrowUp className="mr-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="mr-1 h-4 w-4" />
                            )}
                            {token.change24h.toFixed(2)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          ${(token.volume24h / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{token.exchanges}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={
                              token.isERC20 ? "bg-blue-500/10 text-blue-500" : "bg-purple-500/10 text-purple-500"
                            }
                          >
                            {token.isERC20 ? "ERC20" : "Native"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary" className="font-normal">
                            {token.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">{token.launchDate}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">View details for {token.name}</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

