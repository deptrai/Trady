"use client";

import { useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ApiDocumentation() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // API base URL
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ChainLens API Documentation</h1>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="swagger">Swagger UI</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The ChainLens API provides programmatic access to blockchain data including blocks, transactions, 
                addresses, tokens, and NFTs. It's designed to be simple, fast, and reliable.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Base URL</h3>
                <code className="bg-background p-2 rounded block">{apiBaseUrl}</code>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Authentication</h3>
                <p>
                  Public endpoints don't require authentication. For rate-limited endpoints, 
                  use an API key in the request header:
                </p>
                <pre className="bg-muted p-3 rounded-md mt-2 overflow-x-auto">
                  <code>{`X-API-Key: your_api_key_here`}</code>
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Rate Limits</h3>
                <p>
                  Public API: 10 requests per second<br />
                  Authenticated API: 100 requests per second
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="endpoints" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Blocks</h3>
                  <div className="space-y-2">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mr-2">GET</span>
                        <code>/blocks</code>
                      </div>
                      <p className="text-sm mt-1">Get a list of blocks with pagination</p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mr-2">GET</span>
                        <code>/block/:number</code>
                      </div>
                      <p className="text-sm mt-1">Get details for a specific block</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Transactions</h3>
                  <div className="space-y-2">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mr-2">GET</span>
                        <code>/transactions</code>
                      </div>
                      <p className="text-sm mt-1">Get a list of transactions with pagination</p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mr-2">GET</span>
                        <code>/transaction/:hash</code>
                      </div>
                      <p className="text-sm mt-1">Get details for a specific transaction</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Addresses</h3>
                  <div className="space-y-2">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mr-2">GET</span>
                        <code>/address/:address</code>
                      </div>
                      <p className="text-sm mt-1">Get details for a specific address</p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mr-2">GET</span>
                        <code>/address/:address/transactions</code>
                      </div>
                      <p className="text-sm mt-1">Get transactions for a specific address</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Tokens</h3>
                  <div className="space-y-2">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mr-2">GET</span>
                        <code>/tokens</code>
                      </div>
                      <p className="text-sm mt-1">Get a list of tokens with pagination</p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mr-2">GET</span>
                        <code>/token/:address</code>
                      </div>
                      <p className="text-sm mt-1">Get details for a specific token</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">NFTs</h3>
                  <div className="space-y-2">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mr-2">GET</span>
                        <code>/nfts</code>
                      </div>
                      <p className="text-sm mt-1">Get a list of NFTs with pagination</p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mr-2">GET</span>
                        <code>/nft/:address/:tokenId</code>
                      </div>
                      <p className="text-sm mt-1">Get details for a specific NFT</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="swagger" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Swagger UI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-background p-4 rounded-md">
                <SwaggerUI url={`${apiBaseUrl}/swagger.json`} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 