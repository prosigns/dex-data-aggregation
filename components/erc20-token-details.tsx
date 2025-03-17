"use client"

import { useState } from "react"
import { ArrowUpRight, Copy, ExternalLink, FileText, Shield, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

interface ERC20TokenDetailsProps {
  tokenId: string
  tokenData: {
    name: string
    symbol: string
    contractAddress: string
    decimals: number
    totalSupply: string
    circulatingSupply: string
    implementation: string
    creationDate: string
    creator: string
    verified: boolean
    holders: number
    transfers: number
    tokenStandard: string
    blockchain: string
    securityAudit?: string
    tokenomics?: {
      initialDistribution: Array<{
        category: string
        percentage: number
        amount: string
      }>
      vestingSchedule?: string
      unlockDates?: Array<{
        date: string
        amount: string
        percentage: number
      }>
    }
  }
}

export function ERC20TokenDetails({ tokenId, tokenData }: ERC20TokenDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
      duration: 3000,
    })
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <Card className="w-full overflow-hidden border-none shadow-md transition-all hover:shadow-lg dark:shadow-primary/5">
      <CardHeader className="bg-card pb-2 pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">ERC20 Token Details</CardTitle>
              {tokenData.verified && (
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  Verified
                </Badge>
              )}
            </div>
            <CardDescription className="mt-1">
              Technical information about {tokenData.name} ({tokenData.symbol}) token
            </CardDescription>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="tokenomics"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Tokenomics
              </TabsTrigger>
              <TabsTrigger
                value="holders"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Holders
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <TabsContent value="overview" className="m-0">
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contract Address</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 text-sm">
                      {formatAddress(tokenData.contractAddress)}
                    </code>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(tokenData.contractAddress, "Contract address")}
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy contract address</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy contract address</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              window.open(`https://etherscan.io/token/${tokenData.contractAddress}`, "_blank")
                            }
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View on Etherscan</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View on Etherscan</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Token Standard</h3>
                    <p className="mt-1">{tokenData.tokenStandard}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Blockchain</h3>
                    <p className="mt-1">{tokenData.blockchain}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Decimals</h3>
                    <p className="mt-1">{tokenData.decimals}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Implementation</h3>
                    <p className="mt-1">{tokenData.implementation}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Creator</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 text-sm">{formatAddress(tokenData.creator)}</code>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(tokenData.creator, "Creator address")}
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy creator address</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy creator address</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Creation Date</h3>
                  <p className="mt-1">{tokenData.creationDate}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Supply</h3>
                  <p className="mt-1 text-lg font-semibold tabular-nums">{tokenData.totalSupply}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Circulating Supply</h3>
                  <p className="mt-1 text-lg font-semibold tabular-nums">{tokenData.circulatingSupply}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Holders</h3>
                    <p className="mt-1 tabular-nums">{tokenData.holders.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Transfers</h3>
                    <p className="mt-1 tabular-nums">{tokenData.transfers.toLocaleString()}</p>
                  </div>
                </div>

                {tokenData.securityAudit && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Security Audit</h3>
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        <span>View Audit Report</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Tag className="h-4 w-4" />
                <span>Read Contract</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Shield className="h-4 w-4" />
                <span>Verify Contract</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tokenomics" className="m-0">
          <div className="p-6">
            {tokenData.tokenomics ? (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-base font-medium">Initial Token Distribution</h3>
                  <div className="overflow-hidden rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Percentage</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tokenData.tokenomics.initialDistribution.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.category}</TableCell>
                            <TableCell className="text-right">{item.percentage}%</TableCell>
                            <TableCell className="text-right">{item.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {tokenData.tokenomics.vestingSchedule && (
                  <div>
                    <h3 className="mb-2 text-base font-medium">Vesting Schedule</h3>
                    <p className="text-muted-foreground">{tokenData.tokenomics.vestingSchedule}</p>
                  </div>
                )}

                {tokenData.tokenomics.unlockDates && tokenData.tokenomics.unlockDates.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-base font-medium">Token Unlock Schedule</h3>
                    <div className="overflow-hidden rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">% of Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tokenData.tokenomics.unlockDates.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.date}</TableCell>
                              <TableCell className="text-right">{item.amount}</TableCell>
                              <TableCell className="text-right">{item.percentage}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center">
                <p className="text-muted-foreground">No tokenomics data available for this token.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="holders" className="m-0">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-medium">Top Token Holders</h3>
              <Button variant="outline" size="sm">
                View All Holders
              </Button>
            </div>
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      rank: 1,
                      address: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
                      quantity: "15,000,000",
                      percentage: 15,
                      type: "Contract",
                    },
                    {
                      rank: 2,
                      address: "0x28C6c06298d514Db089934071355E5743bf21d60",
                      quantity: "10,500,000",
                      percentage: 10.5,
                      type: "Wallet",
                    },
                    {
                      rank: 3,
                      address: "0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549",
                      quantity: "8,200,000",
                      percentage: 8.2,
                      type: "Exchange",
                    },
                    {
                      rank: 4,
                      address: "0xDFd5293D8e347dFe59E90eFd55b2956a1343963d",
                      quantity: "6,500,000",
                      percentage: 6.5,
                      type: "Wallet",
                    },
                    {
                      rank: 5,
                      address: "0x0681d8Db095565FE8A346fA0277bFfdE9C0eDBBF",
                      quantity: "4,800,000",
                      percentage: 4.8,
                      type: "Wallet",
                    },
                  ].map((holder) => (
                    <TableRow key={holder.rank}>
                      <TableCell>{holder.rank}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-xs">{formatAddress(holder.address)}</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(holder.address, "Holder address")}
                          >
                            <Copy className="h-3 w-3" />
                            <span className="sr-only">Copy address</span>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{holder.quantity}</TableCell>
                      <TableCell className="text-right tabular-nums">{holder.percentage}%</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            holder.type === "Contract"
                              ? "bg-blue-500/10 text-blue-500"
                              : holder.type === "Exchange"
                                ? "bg-purple-500/10 text-purple-500"
                                : "bg-green-500/10 text-green-500"
                          }
                        >
                          {holder.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  )
}

