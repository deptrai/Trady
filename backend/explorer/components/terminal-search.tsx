"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

export function TerminalSearch() {
  const [query, setQuery] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Focus input on click anywhere in terminal
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus()
    }

    terminalRef.current?.addEventListener("click", handleClick)
    return () => {
      terminalRef.current?.removeEventListener("click", handleClick)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Add to history
    setHistory((prev) => [...prev, query])
    setHistoryIndex(-1)

    // Process command
    if (query.startsWith("search ")) {
      const searchTerm = query.substring(7).trim()
      if (searchTerm) {
        router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      }
    } else if (query === "help") {
      // Display help in the terminal
      setHistory((prev) => [
        ...prev,
        "Available commands:",
        "search <term> - Search for address, transaction, block, or token",
        "help - Display this help message",
        "clear - Clear terminal history",
      ])
    } else if (query === "clear") {
      setHistory([])
    } else if (query.startsWith("goto ")) {
      const page = query.substring(5).trim()
      if (["transactions", "blocks", "tokens", "nfts", "validators"].includes(page)) {
        router.push(`/${page}`)
      } else {
        setHistory((prev) => [...prev, `Unknown page: ${page}`])
      }
    } else {
      // Process as a search query directly
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }

    setQuery("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setQuery(history[history.length - 1 - newIndex])
        setCursorPosition(history[history.length - 1 - newIndex].length)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setQuery(history[history.length - 1 - newIndex])
        setCursorPosition(history[history.length - 1 - newIndex].length)
      } else {
        setHistoryIndex(-1)
        setQuery("")
        setCursorPosition(0)
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      // Simple tab completion
      if (query.startsWith("s")) {
        setQuery("search ")
        setCursorPosition(7)
      } else if (query.startsWith("g")) {
        setQuery("goto ")
        setCursorPosition(5)
      } else if (query.startsWith("h")) {
        setQuery("help")
        setCursorPosition(4)
      } else if (query.startsWith("c")) {
        setQuery("clear")
        setCursorPosition(5)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setCursorPosition(e.target.selectionStart || 0)
  }

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setCursorPosition(inputRef.current?.selectionStart || 0)
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    setCursorPosition(inputRef.current?.selectionStart || 0)
  }

  return (
    <div
      ref={terminalRef}
      className="w-full bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg overflow-hidden cyber-border"
    >
      <div className="bg-cyber-dark/80 p-2 border-b border-cyber-purple/20 flex items-center">
        <div className="w-3 h-3 rounded-full bg-cyber-pink mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-cyber-teal mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-cyber-purple mr-2"></div>
        <span className="text-xs text-muted-foreground">search@Chain Lens-explorer:~</span>
      </div>

      <div className="p-4 font-mono text-sm">
        {history.map((line, index) => (
          <div key={index} className="text-muted-foreground mb-1">
            {index % 2 === 0 ? (
              <>
                <span className="text-cyber-teal">λ</span> <span className="text-cyber-purple">{line}</span>
              </>
            ) : (
              <span className="text-white">{line}</span>
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-cyber-teal mr-2">λ</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onClick={handleClick}
              className="w-full bg-transparent border-none outline-none text-cyber-purple caret-transparent"
              autoFocus
              aria-label="Search command"
              placeholder="Search by wallet, token, or transaction"
            />
            <div
              className="absolute top-0 left-0 pointer-events-none text-cyber-purple"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              {query}
            </div>
            <div
              className={`absolute top-0 pointer-events-none ${showCursor ? "opacity-100" : "opacity-0"}`}
              style={{ left: `${cursorPosition}ch` }}
            >
              <span className="inline-block w-2 h-4 bg-cyber-purple"></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
