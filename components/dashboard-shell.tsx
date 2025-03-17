"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { TrendingTokensPanel } from "@/components/trending-tokens-panel"
import { TokenComparisonView } from "@/components/token-comparison-view"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"

export function DashboardShell() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <DashboardHeader />
        <div className="flex flex-1 w-full">
          <DashboardSidebar />
          <main className="flex-1 w-full overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
            {!selectedToken ? (
              <TrendingTokensPanel onSelectToken={setSelectedToken} />
            ) : (
              <TokenComparisonView tokenId={selectedToken} onBack={() => setSelectedToken(null)} />
            )}
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  )
}

