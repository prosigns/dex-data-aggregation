"use client"

import { useState, useEffect } from "react"
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BarChart3,
  ChevronDown,
  Download,
  ExternalLink,
  LineChart,
  PieChart,
  Search,
  Share2,
  SlidersHorizontal,
  Star,
  Info,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
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
import { DexComparisonChart } from "@/components/charts/dex-comparison-chart"
import { Separator } from "@/components/ui/separator"
import { ERC20TokenDetails } from "@/components/erc20-token-details"
import { NormalizedTokenComparison } from "@/components/normalized-token-comparison"
import { NormalizedDataChart } from "@/components/charts/normalized-data-chart"

// Mock data for DEX comparison
const dexes = [
  {
    id: "1",
    name: "Uniswap V3",
    chain: "Ethereum",
    volume24h: 1250000,
    liquidity: 8500000,
    priceUSD: 0.0567,
    priceChange: 5.43,
    trades: 12500,
    fees: "0.3%",
  },
  {
    id: "2",
    name: "SushiSwap",
    chain: "Ethereum",
    volume24h: 980000,
    liquidity: 6200000,
    priceUSD: 0.0562,
    priceChange: 5.21,
    trades: 9800,
    fees: "0.3%",
  },
  {
    id: "3",
    name: "PancakeSwap",
    chain: "BSC",
    volume24h: 1450000,
    liquidity: 9800000,
    priceUSD: 0.0571,
    priceChange: 5.89,
    trades: 15400,
    fees: "0.25%",
  },
  {
    id: "4",
    name: "Curve",
    chain: "Ethereum",
    volume24h: 850000,
    liquidity: 5400000,
    priceUSD: 0.0564,
    priceChange: 5.32,
    trades: 7600,
    fees: "0.04%",
  },
  {
    id: "5",
    name: "Balancer",
    chain: "Ethereum",
    volume24h: 620000,
    liquidity: 4100000,
    priceUSD: 0.0559,
    priceChange: 4.98,
    trades: 5200,
    fees: "0.3%",
  },
  {
    id: "6",
    name: "QuickSwap",
    chain: "Polygon",
    volume24h: 780000,
    liquidity: 5100000,
    priceUSD: 0.0565,
    priceChange: 5.36,
    trades: 8900,
    fees: "0.3%",
  },
  {
    id: "7",
    name: "TraderJoe",
    chain: "Avalanche",
    volume24h: 540000,
    liquidity: 3800000,
    priceUSD: 0.0563,
    priceChange: 5.28,
    trades: 6700,
    fees: "0.3%",
  },
  {
    id: "8",
    name: "SpookySwap",
    chain: "Fantom",
    volume24h: 320000,
    liquidity: 2500000,
    priceUSD: 0.0561,
    priceChange: 5.12,
    trades: 4300,
    fees: "0.2%",
  },
  {
    id: "9",
    name: "Raydium",
    chain: "Solana",
    volume24h: 680000,
    liquidity: 4600000,
    priceUSD: 0.0566,
    priceChange: 5.39,
    trades: 7800,
    fees: "0.25%",
  },
  {
    id: "10",
    name: "Orca",
    chain: "Solana",
    volume24h: 490000,
    liquidity: 3400000,
    priceUSD: 0.0564,
    priceChange: 5.31,
    trades: 5900,
    fees: "0.3%",
  },
  {
    id: "11",
    name: "dYdX",
    chain: "Ethereum",
    volume24h: 920000,
    liquidity: 6100000,
    priceUSD: 0.0568,
    priceChange: 5.52,
    trades: 8200,
    fees: "0.1%",
  },
  {
    id: "12",
    name: "DODO",
    chain: "Ethereum",
    volume24h: 280000,
    liquidity: 2100000,
    priceUSD: 0.056,
    priceChange: 5.08,
    trades: 3100,
    fees: "0.3%",
  },
  {
    id: "13",
    name: "Osmosis",
    chain: "Cosmos",
    volume24h: 410000,
    liquidity: 2900000,
    priceUSD: 0.0562,
    priceChange: 5.19,
    trades: 4800,
    fees: "0.2%",
  },
  {
    id: "14",
    name: "VVS Finance",
    chain: "Cronos",
    volume24h: 250000,
    liquidity: 1800000,
    priceUSD: 0.0559,
    priceChange: 5.01,
    trades: 2900,
    fees: "0.3%",
  },
  {
    id: "15",
    name: "Astroport",
    chain: "Terra",
    volume24h: 180000,
    liquidity: 1500000,
    priceUSD: 0.0558,
    priceChange: 4.95,
    trades: 2200,
    fees: "0.3%",
  },
  {
    id: "16",
    name: "Serum",
    chain: "Solana",
    volume24h: 520000,
    liquidity: 3600000,
    priceUSD: 0.0565,
    priceChange: 5.35,
    trades: 6100,
    fees: "0.22%",
  },
  {
    id: "17",
    name: "Honeyswap",
    chain: "xDai",
    volume24h: 120000,
    liquidity: 980000,
    priceUSD: 0.0557,
    priceChange: 4.89,
    trades: 1500,
    fees: "0.3%",
  },
  {
    id: "18",
    name: "SpiritSwap",
    chain: "Fantom",
    volume24h: 290000,
    liquidity: 2200000,
    priceUSD: 0.0561,
    priceChange: 5.14,
    trades: 3800,
    fees: "0.3%",
  },
  {
    id: "19",
    name: "Pangolin",
    chain: "Avalanche",
    volume24h: 310000,
    liquidity: 2400000,
    priceUSD: 0.0562,
    priceChange: 5.18,
    trades: 4100,
    fees: "0.3%",
  },
  {
    id: "20",
    name: "Trisolaris",
    chain: "Aurora",
    volume24h: 150000,
    liquidity: 1200000,
    priceUSD: 0.0558,
    priceChange: 4.92,
    trades: 1900,
    fees: "0.3%",
  },
  // Adding more DEXes to reach 50+
  {
    id: "21",
    name: "Saber",
    chain: "Solana",
    volume24h: 280000,
    liquidity: 2100000,
    priceUSD: 0.0561,
    priceChange: 5.15,
    trades: 3300,
    fees: "0.05%",
  },
  {
    id: "22",
    name: "Ref Finance",
    chain: "NEAR",
    volume24h: 190000,
    liquidity: 1600000,
    priceUSD: 0.0559,
    priceChange: 5.02,
    trades: 2400,
    fees: "0.3%",
  },
  {
    id: "23",
    name: "Mdex",
    chain: "HECO",
    volume24h: 230000,
    liquidity: 1900000,
    priceUSD: 0.056,
    priceChange: 5.09,
    trades: 2800,
    fees: "0.3%",
  },
  {
    id: "24",
    name: "Biswap",
    chain: "BSC",
    volume24h: 340000,
    liquidity: 2600000,
    priceUSD: 0.0563,
    priceChange: 5.24,
    trades: 4500,
    fees: "0.2%",
  },
  {
    id: "25",
    name: "Loopring",
    chain: "Ethereum",
    volume24h: 210000,
    liquidity: 1700000,
    priceUSD: 0.0559,
    priceChange: 5.05,
    trades: 2600,
    fees: "0.1%",
  },
  {
    id: "26",
    name: "Bancor",
    chain: "Ethereum",
    volume24h: 270000,
    liquidity: 2000000,
    priceUSD: 0.0561,
    priceChange: 5.13,
    trades: 3000,
    fees: "0.2%",
  },
  {
    id: "27",
    name: "Kyber",
    chain: "Ethereum",
    volume24h: 320000,
    liquidity: 2500000,
    priceUSD: 0.0562,
    priceChange: 5.21,
    trades: 3900,
    fees: "0.3%",
  },
  {
    id: "28",
    name: "Ubeswap",
    chain: "Celo",
    volume24h: 110000,
    liquidity: 920000,
    priceUSD: 0.0556,
    priceChange: 4.85,
    trades: 1400,
    fees: "0.3%",
  },
  {
    id: "29",
    name: "Sushiswap",
    chain: "Polygon",
    volume24h: 380000,
    liquidity: 2800000,
    priceUSD: 0.0563,
    priceChange: 5.26,
    trades: 4700,
    fees: "0.3%",
  },
  {
    id: "30",
    name: "Sushiswap",
    chain: "Avalanche",
    volume24h: 290000,
    liquidity: 2200000,
    priceUSD: 0.0561,
    priceChange: 5.16,
    trades: 3600,
    fees: "0.3%",
  },
  {
    id: "31",
    name: "Uniswap V3",
    chain: "Polygon",
    volume24h: 420000,
    liquidity: 3100000,
    priceUSD: 0.0564,
    priceChange: 5.29,
    trades: 5100,
    fees: "0.3%",
  },
  {
    id: "32",
    name: "Uniswap V3",
    chain: "Arbitrum",
    volume24h: 380000,
    liquidity: 2800000,
    priceUSD: 0.0563,
    priceChange: 5.25,
    trades: 4600,
    fees: "0.3%",
  },
  {
    id: "33",
    name: "Uniswap V3",
    chain: "Optimism",
    volume24h: 350000,
    liquidity: 2700000,
    priceUSD: 0.0562,
    priceChange: 5.22,
    trades: 4300,
    fees: "0.3%",
  },
  {
    id: "34",
    name: "Curve",
    chain: "Polygon",
    volume24h: 310000,
    liquidity: 2400000,
    priceUSD: 0.0562,
    priceChange: 5.17,
    trades: 3800,
    fees: "0.04%",
  },
  {
    id: "35",
    name: "Curve",
    chain: "Avalanche",
    volume24h: 280000,
    liquidity: 2100000,
    priceUSD: 0.0561,
    priceChange: 5.14,
    trades: 3400,
    fees: "0.04%",
  },
  {
    id: "36",
    name: "Curve",
    chain: "Fantom",
    volume24h: 240000,
    liquidity: 1900000,
    priceUSD: 0.056,
    priceChange: 5.1,
    trades: 2900,
    fees: "0.04%",
  },
  {
    id: "37",
    name: "Beethoven X",
    chain: "Fantom",
    volume24h: 170000,
    liquidity: 1400000,
    priceUSD: 0.0558,
    priceChange: 4.97,
    trades: 2100,
    fees: "0.3%",
  },
  {
    id: "38",
    name: "Velodrome",
    chain: "Optimism",
    volume24h: 220000,
    liquidity: 1800000,
    priceUSD: 0.056,
    priceChange: 5.07,
    trades: 2700,
    fees: "0.3%",
  },
  {
    id: "39",
    name: "Camelot",
    chain: "Arbitrum",
    volume24h: 260000,
    liquidity: 2000000,
    priceUSD: 0.0561,
    priceChange: 5.12,
    trades: 3200,
    fees: "0.25%",
  },
  {
    id: "40",
    name: "Maverick",
    chain: "Ethereum",
    volume24h: 190000,
    liquidity: 1600000,
    priceUSD: 0.0559,
    priceChange: 5.03,
    trades: 2300,
    fees: "0.3%",
  },
  {
    id: "41",
    name: "WingRiders",
    chain: "Cardano",
    volume24h: 130000,
    liquidity: 1100000,
    priceUSD: 0.0557,
    priceChange: 4.91,
    trades: 1600,
    fees: "0.35%",
  },
  {
    id: "42",
    name: "Minswap",
    chain: "Cardano",
    volume24h: 150000,
    liquidity: 1300000,
    priceUSD: 0.0558,
    priceChange: 4.94,
    trades: 1900,
    fees: "0.3%",
  },
  {
    id: "43",
    name: "SundaeSwap",
    chain: "Cardano",
    volume24h: 140000,
    liquidity: 1200000,
    priceUSD: 0.0557,
    priceChange: 4.93,
    trades: 1700,
    fees: "0.3%",
  },
  {
    id: "44",
    name: "Meshswap",
    chain: "Polygon",
    volume24h: 160000,
    liquidity: 1300000,
    priceUSD: 0.0558,
    priceChange: 4.96,
    trades: 2000,
    fees: "0.3%",
  },
  {
    id: "45",
    name: "Thena",
    chain: "BSC",
    volume24h: 200000,
    liquidity: 1700000,
    priceUSD: 0.0559,
    priceChange: 5.04,
    trades: 2500,
    fees: "0.3%",
  },
  {
    id: "46",
    name: "Wombat",
    chain: "BSC",
    volume24h: 180000,
    liquidity: 1500000,
    priceUSD: 0.0559,
    priceChange: 5.0,
    trades: 2200,
    fees: "0.2%",
  },
  {
    id: "47",
    name: "Ellipsis",
    chain: "BSC",
    volume24h: 170000,
    liquidity: 1400000,
    priceUSD: 0.0558,
    priceChange: 4.98,
    trades: 2100,
    fees: "0.04%",
  },
  {
    id: "48",
    name: "Trader Joe",
    chain: "Arbitrum",
    volume24h: 230000,
    liquidity: 1900000,
    priceUSD: 0.056,
    priceChange: 5.08,
    trades: 2800,
    fees: "0.3%",
  },
  {
    id: "49",
    name: "Ramses",
    chain: "Arbitrum",
    volume24h: 150000,
    liquidity: 1300000,
    priceUSD: 0.0558,
    priceChange: 4.95,
    trades: 1800,
    fees: "0.3%",
  },
  {
    id: "50",
    name: "Aerodrome",
    chain: "Base",
    volume24h: 210000,
    liquidity: 1700000,
    priceUSD: 0.0559,
    priceChange: 5.06,
    trades: 2600,
    fees: "0.25%",
  },
]

// Mock token data
const tokens = {
  "1": {
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
    description:
      "NewFinance is a decentralized finance protocol that enables users to earn interest, borrow assets, and build financial applications.",
    website: "https://newfinance.io",
    twitter: "@NewFinance",
    totalSupply: "100,000,000 NFIN",
    circulatingSupply: "25,000,000 NFIN",
    erc20Data: {
      contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      decimals: 18,
      implementation: "ERC20",
      creationDate: "Jan 15, 2023",
      creator: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      verified: true,
      holders: 12458,
      transfers: 87542,
      tokenStandard: "ERC20",
      blockchain: "Ethereum",
      securityAudit: "CertiK",
      tokenomics: {
        initialDistribution: [
          { category: "Public Sale", percentage: 40, amount: "40,000,000 NFIN" },
          { category: "Team", percentage: 20, amount: "20,000,000 NFIN" },
          { category: "Advisors", percentage: 10, amount: "10,000,000 NFIN" },
          { category: "Marketing", percentage: 15, amount: "15,000,000 NFIN" },
          { category: "Ecosystem", percentage: 15, amount: "15,000,000 NFIN" },
        ],
        vestingSchedule:
          "Team tokens are locked for 1 year, then vest linearly over 2 years. Advisor tokens vest quarterly over 1.5 years.",
        unlockDates: [
          { date: "Apr 15, 2023", amount: "10,000,000 NFIN", percentage: 10 },
          { date: "Jul 15, 2023", amount: "15,000,000 NFIN", percentage: 15 },
          { date: "Oct 15, 2023", amount: "15,000,000 NFIN", percentage: 15 },
          { date: "Jan 15, 2024", amount: "20,000,000 NFIN", percentage: 20 },
        ],
      },
    },
    // Add normalized data for comparison across DEXes
    normalizedData: [
      {
        dexId: "1",
        dexName: "Uniswap V3",
        chain: "Ethereum",
        price: 0.0567,
        priceChange24h: 5.43,
        volume24h: 1250000,
        liquidity: 8500000,
        supply: 25000000,
        marketCap: 1417500,
        trades24h: 12500,
        fees: "0.3%",
        lastUpdated: "5 min ago",
      },
      {
        dexId: "2",
        dexName: "SushiSwap",
        chain: "Ethereum",
        price: 0.0562,
        priceChange24h: 5.21,
        volume24h: 980000,
        liquidity: 6200000,
        supply: 25000000,
        marketCap: 1405000,
        trades24h: 9800,
        fees: "0.3%",
        lastUpdated: "7 min ago",
      },
      {
        dexId: "3",
        dexName: "PancakeSwap",
        chain: "BSC",
        price: 0.0571,
        priceChange24h: 5.89,
        volume24h: 1450000,
        liquidity: 9800000,
        supply: 25000000,
        marketCap: 1427500,
        trades24h: 15400,
        fees: "0.25%",
        lastUpdated: "3 min ago",
      },
      {
        dexId: "4",
        dexName: "Curve",
        chain: "Ethereum",
        price: 0.0564,
        priceChange24h: 5.32,
        volume24h: 850000,
        liquidity: 5400000,
        supply: 25000000,
        marketCap: 1410000,
        trades24h: 7600,
        fees: "0.04%",
        lastUpdated: "10 min ago",
      },
      {
        dexId: "5",
        dexName: "Balancer",
        chain: "Ethereum",
        price: 0.0559,
        priceChange24h: 4.98,
        volume24h: 620000,
        liquidity: 4100000,
        supply: 25000000,
        marketCap: 1397500,
        trades24h: 5200,
        fees: "0.3%",
        lastUpdated: "12 min ago",
      },
      {
        dexId: "6",
        dexName: "QuickSwap",
        chain: "Polygon",
        price: 0.0565,
        priceChange24h: 5.36,
        volume24h: 780000,
        liquidity: 5100000,
        supply: 25000000,
        marketCap: 1412500,
        trades24h: 8900,
        fees: "0.3%",
        lastUpdated: "8 min ago",
      },
      {
        dexId: "7",
        dexName: "TraderJoe",
        chain: "Avalanche",
        price: 0.0563,
        priceChange24h: 5.28,
        volume24h: 540000,
        liquidity: 3800000,
        supply: 25000000,
        marketCap: 1407500,
        trades24h: 6700,
        fees: "0.3%",
        lastUpdated: "15 min ago",
      },
      {
        dexId: "8",
        dexName: "SpookySwap",
        chain: "Fantom",
        price: 0.0561,
        priceChange24h: 5.12,
        volume24h: 320000,
        liquidity: 2500000,
        supply: 25000000,
        marketCap: 1402500,
        trades24h: 4300,
        fees: "0.2%",
        lastUpdated: "18 min ago",
      },
      {
        dexId: "9",
        dexName: "Raydium",
        chain: "Solana",
        price: 0.0566,
        priceChange24h: 5.39,
        volume24h: 680000,
        liquidity: 4600000,
        supply: 25000000,
        marketCap: 1415000,
        trades24h: 7800,
        fees: "0.25%",
        lastUpdated: "9 min ago",
      },
      {
        dexId: "10",
        dexName: "Orca",
        chain: "Solana",
        price: 0.0564,
        priceChange24h: 5.31,
        volume24h: 490000,
        liquidity: 3400000,
        supply: 25000000,
        marketCap: 1410000,
        trades24h: 5900,
        fees: "0.3%",
        lastUpdated: "14 min ago",
      },
    ],
  },
  "2": {
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
    description:
      "MetaBlock is building a decentralized metaverse platform with integrated NFT marketplace and virtual land ownership.",
    website: "https://metablock.world",
    twitter: "@MetaBlock",
    totalSupply: "1,000,000,000 MBLK",
    circulatingSupply: "150,000,000 MBLK",
    erc20Data: {
      contractAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      decimals: 18,
      implementation: "ERC20",
      creationDate: "Jan 10, 2023",
      creator: "0x4e2A43a0Db8EFe31d3F6e212A6Ec8f5c5F4A5B3C",
      verified: true,
      holders: 8754,
      transfers: 45632,
      tokenStandard: "ERC20",
      blockchain: "Polygon",
      securityAudit: "Hacken",
      tokenomics: {
        initialDistribution: [
          { category: "Public Sale", percentage: 30, amount: "300,000,000 MBLK" },
          { category: "Team", percentage: 15, amount: "150,000,000 MBLK" },
          { category: "Advisors", percentage: 5, amount: "50,000,000 MBLK" },
          { category: "Marketing", percentage: 20, amount: "200,000,000 MBLK" },
          { category: "Ecosystem", percentage: 25, amount: "250,000,000 MBLK" },
          { category: "Reserve", percentage: 5, amount: "50,000,000 MBLK" },
        ],
        vestingSchedule:
          "Team tokens are locked for 6 months, then vest linearly over 18 months. Advisor tokens vest quarterly over 1 year.",
      },
    },
    // Add normalized data for comparison across DEXes
    normalizedData: [
      {
        dexId: "1",
        dexName: "Uniswap V3",
        chain: "Ethereum",
        price: 0.0089,
        priceChange24h: 2.43,
        volume24h: 950000,
        liquidity: 6500000,
        supply: 150000000,
        marketCap: 1335000,
        trades24h: 10500,
        fees: "0.3%",
        lastUpdated: "6 min ago",
      },
      {
        dexId: "2",
        dexName: "SushiSwap",
        chain: "Ethereum",
        price: 0.0087,
        priceChange24h: 2.21,
        volume24h: 780000,
        liquidity: 5200000,
        supply: 150000000,
        marketCap: 1305000,
        trades24h: 8800,
        fees: "0.3%",
        lastUpdated: "8 min ago",
      },
      {
        dexId: "3",
        dexName: "PancakeSwap",
        chain: "BSC",
        price: 0.0091,
        priceChange24h: 2.89,
        volume24h: 1250000,
        liquidity: 7800000,
        supply: 150000000,
        marketCap: 1365000,
        trades24h: 13400,
        fees: "0.25%",
        lastUpdated: "4 min ago",
      },
      {
        dexId: "4",
        dexName: "QuickSwap",
        chain: "Polygon",
        price: 0.009,
        priceChange24h: 2.76,
        volume24h: 880000,
        liquidity: 6100000,
        supply: 150000000,
        marketCap: 1350000,
        trades24h: 9900,
        fees: "0.3%",
        lastUpdated: "5 min ago",
      },
      {
        dexId: "5",
        dexName: "Raydium",
        chain: "Solana",
        price: 0.0088,
        priceChange24h: 2.39,
        volume24h: 680000,
        liquidity: 4600000,
        supply: 150000000,
        marketCap: 1320000,
        trades24h: 7800,
        fees: "0.25%",
        lastUpdated: "10 min ago",
      },
    ],
  },
}

interface TokenComparisonViewProps {
  tokenId: string
  onBack: () => void
}

export function TokenComparisonView({ tokenId, onBack }: TokenComparisonViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("volume24h")
  const [sortDirection, setSortDirection] = useState("desc")
  const [timeframe, setTimeframe] = useState("24h")
  const [chain, setChain] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "chart">("table")
  const [token, setToken] = useState<(typeof tokens)[keyof typeof tokens] | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [comparisonMetric, setComparisonMetric] = useState<
    "price" | "supply" | "volume24h" | "liquidity" | "marketCap"
  >("price")
  const [normalizedViewMode, setNormalizedViewMode] = useState<"table" | "chart">("table")

  useEffect(() => {
    // In a real app, this would be an API call
    setToken(tokens[tokenId as keyof typeof tokens] || null)
  }, [tokenId])

  if (!token) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Loading token data...</p>
      </div>
    )
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filterDexesByChain = (dexList: typeof dexes) => {
    if (chain === "all") return dexList
    return dexList.filter((dex) => dex.chain.toLowerCase() === chain.toLowerCase())
  }

  const filterDexesBySearch = (dexList: typeof dexes) => {
    if (!searchQuery) return dexList
    return dexList.filter(
      (dex) =>
        dex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dex.chain.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const sortDexes = (dexList: typeof dexes) => {
    return [...dexList].sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof b]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }

  const processDexes = () => {
    const filtered = filterDexesByChain(dexes)
    const searched = filterDexesBySearch(filtered)
    return sortDexes(searched)
  }

  const processedDexes = processDexes()

  const chains = [
    { value: "all", label: "All Chains" },
    { value: "ethereum", label: "Ethereum" },
    { value: "bsc", label: "BSC" },
    { value: "polygon", label: "Polygon" },
    { value: "avalanche", label: "Avalanche" },
    { value: "solana", label: "Solana" },
    { value: "fantom", label: "Fantom" },
    { value: "arbitrum", label: "Arbitrum" },
    { value: "optimism", label: "Optimism" },
    { value: "base", label: "Base" },
    { value: "cardano", label: "Cardano" },
    { value: "cosmos", label: "Cosmos" },
    { value: "near", label: "NEAR" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onBack}
          aria-label="Go back to token list"
          className="h-10 w-10 rounded-full shadow-sm transition-all hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {token.name} <span className="text-muted-foreground">({token.symbol})</span>
          </h1>
          <p className="text-muted-foreground">DEX trading comparison across {dexes.length} exchanges</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start sm:w-auto">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="dex-comparison"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            DEX Comparison
          </TabsTrigger>
          <TabsTrigger
            value="normalized-data"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Normalized Data
          </TabsTrigger>
          <TabsTrigger
            value="erc20-details"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            ERC20 Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="w-full overflow-hidden border-none shadow-md transition-all hover:shadow-lg dark:shadow-primary/5">
              <CardHeader className="bg-card pb-2 pt-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  Token Overview
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {token.category}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Current Price</span>
                    <span className="text-xl font-bold tabular-nums">${token.price.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">24h Change</span>
                    <span
                      className={`flex items-center text-lg font-semibold tabular-nums ${token.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {token.change24h >= 0 ? (
                        <ArrowUp className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="mr-1 h-4 w-4" />
                      )}
                      {token.change24h.toFixed(2)}%
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">24h Volume</span>
                    <span className="tabular-nums">${(token.volume24h / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="tabular-nums">${(token.marketCap / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Available On</span>
                    <span className="tabular-nums">{token.exchanges} DEXs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Launch Date</span>
                    <span>{token.launchDate}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Supply</span>
                    <span className="tabular-nums">{token.totalSupply}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Circulating Supply</span>
                    <span className="tabular-nums">{token.circulatingSupply}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-muted/20 px-6 py-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <Star className="h-4 w-4" />
                  <span>Watchlist</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </CardFooter>
            </Card>

            <Card className="w-full md:col-span-2 overflow-hidden border-none shadow-md transition-all hover:shadow-lg dark:shadow-primary/5">
              <CardHeader className="bg-card pb-2 pt-6">
                <CardTitle className="text-xl">Token Description</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-4">
                <div className="space-y-6">
                  <p className="leading-relaxed">{token.description}</p>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="rounded-lg bg-muted/30 p-4">
                      <div className="text-sm font-medium text-muted-foreground">Website</div>
                      <div className="mt-1 flex items-center gap-1">
                        <a
                          href={token.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          {token.website}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-4">
                      <div className="text-sm font-medium text-muted-foreground">Twitter</div>
                      <div className="mt-1">{token.twitter}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span>Export Data</span>
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" className="gap-1">
                            <LineChart className="h-4 w-4" />
                            <span>View Price Chart</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>View detailed price chart and technical analysis</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dex-comparison" className="mt-6">
          <Card className="w-full overflow-hidden border-none shadow-md transition-all hover:shadow-lg dark:shadow-primary/5">
            <CardHeader className="bg-card pb-2 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">DEX Comparison</CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-sm">
                          <p>Compare {token.symbol} trading metrics across different decentralized exchanges.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription className="mt-1">
                    {chain !== "all"
                      ? `Showing ${processedDexes.length} DEXs on ${chain.toUpperCase()}`
                      : `Showing ${processedDexes.length} DEXs across all chains`}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search DEXs..."
                      className="w-full pl-9 sm:w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search DEXs"
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
                          {chains.map((c) => (
                            <DropdownMenuItem
                              key={c.value}
                              onClick={() => setChain(c.value)}
                              className={chain === c.value ? "bg-muted" : ""}
                            >
                              {c.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </ScrollArea>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Tabs value={timeframe} onValueChange={setTimeframe} className="hidden sm:block">
                    <TabsList>
                      <TabsTrigger
                        value="24h"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        24H
                      </TabsTrigger>
                      <TabsTrigger
                        value="7d"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        7D
                      </TabsTrigger>
                      <TabsTrigger
                        value="30d"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        30D
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="flex rounded-md border">
                    <Button
                      variant={viewMode === "table" ? "default" : "ghost"}
                      size="sm"
                      className="rounded-r-none"
                      onClick={() => setViewMode("table")}
                      aria-label="Table view"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "chart" ? "default" : "ghost"}
                      size="sm"
                      className="rounded-l-none"
                      onClick={() => setViewMode("chart")}
                      aria-label="Chart view"
                    >
                      <PieChart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {viewMode === "table" ? (
                <div className="overflow-auto">
                  <Table className="w-full">
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead className="w-[180px]">Exchange</TableHead>
                        <TableHead>Chain</TableHead>
                        <TableHead className="cursor-pointer text-right" onClick={() => handleSort("priceUSD")}>
                          <div className="flex items-center justify-end">
                            Price (USD)
                            {sortField === "priceUSD" &&
                              (sortDirection === "asc" ? (
                                <ArrowUp className="ml-1 h-4 w-4" />
                              ) : (
                                <ArrowDown className="ml-1 h-4 w-4" />
                              ))}
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer text-right" onClick={() => handleSort("priceChange")}>
                          <div className="flex items-center justify-end">
                            24h Change
                            {sortField === "priceChange" &&
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
                        <TableHead className="cursor-pointer text-right" onClick={() => handleSort("trades")}>
                          <div className="flex items-center justify-end">
                            Trades
                            {sortField === "trades" &&
                              (sortDirection === "asc" ? (
                                <ArrowUp className="ml-1 h-4 w-4" />
                              ) : (
                                <ArrowDown className="ml-1 h-4 w-4" />
                              ))}
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Fees</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {processedDexes.map((dex) => (
                        <TableRow key={dex.id} className="group transition-colors hover:bg-muted/50">
                          <TableCell className="font-medium">{dex.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-normal">
                              {dex.chain}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium tabular-nums">
                            ${dex.priceUSD.toFixed(4)}
                          </TableCell>
                          <TableCell
                            className={`text-right font-medium tabular-nums ${dex.priceChange >= 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            <div className="flex items-center justify-end">
                              {dex.priceChange >= 0 ? (
                                <ArrowUp className="mr-1 h-4 w-4" />
                              ) : (
                                <ArrowDown className="mr-1 h-4 w-4" />
                              )}
                              {dex.priceChange.toFixed(2)}%
                            </div>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            ${(dex.volume24h / 1000).toFixed(1)}K
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            ${(dex.liquidity / 1000).toFixed(1)}K
                          </TableCell>
                          <TableCell className="text-right tabular-nums">{dex.trades.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{dex.fees}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="p-4">
                  <DexComparisonChart dexes={processedDexes.slice(0, 10)} tokenSymbol={token.symbol} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="normalized-data" className="mt-6">
          {token.normalizedData ? (
            <div className="space-y-6">
              <div className="flex justify-end">
                <div className="flex rounded-md border">
                  <Button
                    variant={normalizedViewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => setNormalizedViewMode("table")}
                    aria-label="Table view"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="ml-2">Table</span>
                  </Button>
                  <Button
                    variant={normalizedViewMode === "chart" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setNormalizedViewMode("chart")}
                    aria-label="Chart view"
                  >
                    <LineChart className="h-4 w-4" />
                    <span className="ml-2">Chart</span>
                  </Button>
                </div>
              </div>

              {normalizedViewMode === "table" ? (
                <NormalizedTokenComparison
                  tokenSymbol={token.symbol}
                  tokenAddress={token.erc20Data?.contractAddress || "0x0000000000000000000000000000000000000000"}
                  normalizedData={token.normalizedData}
                />
              ) : (
                <NormalizedDataChart tokenSymbol={token.symbol} data={token.normalizedData} metric={comparisonMetric} />
              )}

              {normalizedViewMode === "chart" && (
                <div className="mt-4">
                  <Tabs
                    value={comparisonMetric}
                    onValueChange={(value) => setComparisonMetric(value as any)}
                    className="w-full"
                  >
                    <TabsList className="w-full grid grid-cols-4">
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
              )}
            </div>
          ) : (
            <Card className="w-full overflow-hidden border-none shadow-md transition-all hover:shadow-lg dark:shadow-primary/5">
              <CardContent className="flex h-40 items-center justify-center p-6">
                <p className="text-muted-foreground">No normalized data available for this token.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="erc20-details" className="mt-6">
          {token.erc20Data ? (
            <ERC20TokenDetails tokenId={token.id} tokenData={token.erc20Data} />
          ) : (
            <Card className="w-full overflow-hidden border-none shadow-md transition-all hover:shadow-lg dark:shadow-primary/5">
              <CardContent className="flex h-40 items-center justify-center p-6">
                <p className="text-muted-foreground">No ERC20 token data available for this token.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

