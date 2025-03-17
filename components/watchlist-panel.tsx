"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Bell, Plus, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

// Mock data for the watchlist
const watchlistItems = [
  {
    id: "1",
    name: "Ethereum",
    symbol: "ETH",
    price: 3245.67,
    change24h: 5.43,
    isAlertSet: true,
  },
  {
    id: "2",
    name: "Bitcoin",
    symbol: "BTC",
    price: 51234.89,
    change24h: 2.18,
    isAlertSet: false,
  },
  {
    id: "3",
    name: "Solana",
    symbol: "SOL",
    price: 123.45,
    change24h: 8.92,
    isAlertSet: true,
  },
]

export function WatchlistPanel() {
  const [items, setItems] = useState(watchlistItems)
  const { toast } = useToast()

  const toggleAlert = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, isAlertSet: !item.isAlertSet } : item)))

    const item = items.find((item) => item.id === id)

    toast({
      title: item?.isAlertSet ? "Alert removed" : "Alert set",
      description: item?.isAlertSet
        ? `You will no longer receive alerts for ${item.name}`
        : `You will be notified of significant changes for ${item.name}`,
      duration: 3000,
    })
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md dark:hover:shadow-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Watchlist</CardTitle>
            <CardDescription>Track your favorite tokens</CardDescription>
          </div>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[350px]">
          <div className="space-y-1 p-4">
            {items.map((item) => (
              <div key={item.id} className="group flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.symbol}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div>${item.price.toLocaleString()}</div>
                    <div
                      className={`flex items-center text-xs ${item.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {item.change24h >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      <span>{Math.abs(item.change24h).toFixed(2)}%</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${item.isAlertSet ? "text-primary" : "text-muted-foreground"} opacity-50 transition-opacity group-hover:opacity-100`}
                    onClick={() => toggleAlert(item.id)}
                  >
                    <Bell className={`h-4 w-4 ${item.isAlertSet ? "fill-primary" : ""}`} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

