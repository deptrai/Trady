"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TerminalSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Simple logic to determine what type of data is being searched
    if (/^[0-9]+$/.test(searchQuery)) {
      // If it's just numbers, assume it's a block number
      router.push(`/block/${searchQuery}`);
    } else if (searchQuery.startsWith("0x") && searchQuery.length === 66) {
      // If it's 0x + 64 hex chars, assume it's a transaction hash
      router.push(`/tx/${searchQuery}`);
    } else if (searchQuery.startsWith("0x") && searchQuery.length === 42) {
      // If it's 0x + 40 hex chars, assume it's an address
      router.push(`/address/${searchQuery}`);
    } else {
      // Otherwise, go to search page with the query
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
              className="pl-10 bg-background/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        <div className="mt-2 text-xs text-muted-foreground">
          <span className="font-medium">Examples:</span> Block (12345), Address (0x...), Transaction (0x...)
        </div>
      </div>
    </div>
  );
} 