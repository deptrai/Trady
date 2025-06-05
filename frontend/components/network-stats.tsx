"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Database, Layers, Coins, AlertTriangle, CheckCircle } from "lucide-react"
import { getSolPrice, getSupplyInfo, getEpochInfo } from "@/lib/services/explorer"

// Cache constants
const CACHE_KEY = "network-stats-cache"
const CACHE_EXPIRY = 2 * 60 * 1000 // 2 minutes

// Lấy dữ liệu từ cache
function getFromCache() {
  if (typeof window === "undefined") return null

  try {
    const cachedData = localStorage.getItem(CACHE_KEY)
    if (!cachedData) return null

    const { data, timestamp } = JSON.parse(cachedData)
    if (Date.now() - timestamp > CACHE_EXPIRY) return null

    return data
  } catch (error) {
    console.error("Error reading from cache:", error)
    return null
  }
}

// Lưu dữ liệu vào cache
function saveToCache(data) {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      }),
    )
  } catch (error) {
    console.error("Error saving to cache:", error)
  }
}

export function NetworkStats() {
  // Giá trị mặc định
  const defaultSolPrice = 150 // Giá SOL ước tính
  const defaultSupplyInfo = { total: 555000000, circulating: 410000000, isRealData: false }
  const defaultEpochInfo = { epoch: 420, slotIndex: 432000, slotsInEpoch: 864000, isRealData: false }

  const [solPrice, setSolPrice] = useState<number>(defaultSolPrice)
  const [supplyInfo, setSupplyInfo] = useState<{ 
    total: number; 
    circulating: number;
    isRealData: boolean;
  }>(defaultSupplyInfo)
  const [epochInfo, setEpochInfo] = useState<{ 
    epoch: number; 
    slotIndex: number; 
    slotsInEpoch: number;
    isRealData: boolean;
  }>(defaultEpochInfo)
  const [loading, setLoading] = useState(true)
  const [dataStatus, setDataStatus] = useState<'real' | 'mixed' | 'mock'>('mock')

  // Initial load from cache
  const initialLoadRef = useRef(false)

  useEffect(() => {
    if (initialLoadRef.current) return
    initialLoadRef.current = true

    // Load from cache
    const cachedData = getFromCache()
    if (cachedData) {
      setSolPrice(cachedData.solPrice)
      setSupplyInfo(cachedData.supplyInfo)
      setEpochInfo(cachedData.epochInfo)
      setLoading(false)
      
      // Cập nhật trạng thái dữ liệu (thật/mẫu)
      updateDataStatus(
        cachedData.supplyInfo?.isRealData || false, 
        cachedData.epochInfo?.isRealData || false
      )
    }

    // Data fetching function
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [priceResult, supplyResult, epochResult] = await Promise.all([
          getSolPrice(),
          getSupplyInfo(),
          getEpochInfo(),
        ])

        // Process results
        const newData = {
          solPrice: priceResult || defaultSolPrice,
          supplyInfo: supplyResult || defaultSupplyInfo,
          epochInfo: epochResult || defaultEpochInfo,
        }

        // Update state
        setSolPrice(newData.solPrice)
        setSupplyInfo(newData.supplyInfo)
        setEpochInfo(newData.epochInfo)

        // Cập nhật trạng thái dữ liệu (thật/mẫu)
        updateDataStatus(
          newData.supplyInfo.isRealData, 
          newData.epochInfo.isRealData
        )

        // Save to cache
        saveToCache(newData)
      } catch (error) {
        console.error("Error fetching network stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Refresh data periodically
    const intervalId = setInterval(fetchData, CACHE_EXPIRY)
    return () => clearInterval(intervalId)
  }, [])

  // Cập nhật trạng thái dữ liệu (thật/giả/trộn)
  function updateDataStatus(supplyIsReal: boolean, epochIsReal: boolean) {
    if (supplyIsReal && epochIsReal) {
      setDataStatus('real')
    } else if (!supplyIsReal && !epochIsReal) {
      setDataStatus('mock')
    } else {
      setDataStatus('mixed')
    }
  }

  // Calculate progress for Epoch
  const epochProgress = Math.floor((epochInfo.slotIndex / epochInfo.slotsInEpoch) * 100) || 0

  // Format large numbers
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(Math.round(num))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium flex items-center">
              <Database className="h-4 w-4 mr-2 text-primary" />
              Token Metrics
            </h3>
            
            {/* Chỉ báo trạng thái dữ liệu */}
            {dataStatus === 'real' && (
              <span className="text-xs flex items-center text-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Dữ liệu thật
              </span>
            )}
            {dataStatus === 'mock' && (
              <span className="text-xs flex items-center text-amber-500">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Dữ liệu mẫu
              </span>
            )}
            {dataStatus === 'mixed' && (
              <span className="text-xs flex items-center text-blue-500">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Dữ liệu hỗn hợp
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">SOL Price</span>
              <span className="font-mono">${solPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Supply</span>
              <span className="font-mono">{formatNumber(supplyInfo.total)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Circulating</span>
              <span className="font-mono">{formatNumber(supplyInfo.circulating)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium flex items-center">
              <Layers className="h-4 w-4 mr-2 text-secondary" />
              Network Status
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Epoch</span>
              <span className="font-mono">{epochInfo.epoch}</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Epoch Progress</span>
                <span className="font-mono">{epochProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-secondary h-2 rounded-full"
                  style={{ width: `${epochProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Slot</span>
              <span className="font-mono">{formatNumber(epochInfo.slotIndex)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
