"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Search, SlidersHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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

// Mock data for the table
const tokens = [
  {
    id: "1",
    name: "Ethereum",
    symbol: "ETH",
    price: 3245.67,
    change24h: 5.43,
    volume24h: 12500000,
    marketCap: 389000000000,
    exchanges: ["Uniswap", "SushiSwap", "PancakeSwap"],
  },
  {
    id: "2",
    name: "Bitcoin",
    symbol: "BTC",
    price: 51234.89,
    change24h: 2.18,
    volume24h: 28700000,
    marketCap: 980000000000,
    exchanges: ["Uniswap", "SushiSwap"],
  },
  {
    id: "3",
    name: "Solana",
    symbol: "SOL",
    price: 123.45,
    change24h: 8.92,
    volume24h: 5600000,
    marketCap: 49000000000,
    exchanges: ["Uniswap", "PancakeSwap"],
  },
  {
    id: "4",
    name: "Cardano",
    symbol: "ADA",
    price: 0.58,
    change24h: -2.34,
    volume24h: 3200000,
    marketCap: 20500000000,
    exchanges: ["SushiSwap", "PancakeSwap"],
  },
  {
    id: "5",
    name: "Polkadot",
    symbol: "DOT",
    price: 7.82,
    change24h: -1.23,
    volume24h: 1800000,
    marketCap: 9800000000,
    exchanges: ["Uniswap", "SushiSwap"],
  },
  {
    id: "6",
    name: "Chainlink",
    symbol: "LINK",
    price: 14.32,
    change24h: 3.67,
    volume24h: 980000,
    marketCap: 7600000000,
    exchanges: ["Uniswap", "PancakeSwap"],
  },
]

export function TokenComparisonTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("volume24h")
  const [sortDirection, setSortDirection] = useState("desc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedTokens = [...filteredTokens].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md dark:hover:shadow-primary/5">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Token Comparison</CardTitle>
            <CardDescription>Compare trading activity across DEXs</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tokens..."
                className="w-full pl-8 sm:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>All Exchanges</DropdownMenuItem>
                  <DropdownMenuItem>Uniswap</DropdownMenuItem>
                  <DropdownMenuItem>SushiSwap</DropdownMenuItem>
                  <DropdownMenuItem>PancakeSwap</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
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
                <TableHead className="text-right">Available On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTokens.map((token) => (
                <TableRow key={token.id} className="group">
                  <TableCell className="font-medium">
                    <div>
                      <div>{token.name}</div>
                      <div className="text-xs text-muted-foreground">{token.symbol}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ${token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className={`text-right ${token.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {token.change24h >= 0 ? "+" : ""}
                    {token.change24h.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">${(token.volume24h / 1000000).toFixed(1)}M</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {token.exchanges.map((exchange) => (
                        <div key={exchange} className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium">
                          {exchange.replace("Swap", "")}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

