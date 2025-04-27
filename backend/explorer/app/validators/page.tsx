import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { HexGrid } from "@/components/hex-grid"

// Sample validator data
const validators = [
  {
    id: "validator1",
    name: "Everstake",
    identity: "EverstakeSolana",
    stake: 14532789.45,
    commission: 8,
    active: true,
    uptime: 99.98,
    votePubkey: "EverstakeSoLXQ8YCRa6rEpGQmLQGQJ4wJvLrBSbKtmJ5Hx",
  },
  {
    id: "validator2",
    name: "Chorus One",
    identity: "ChorusOne",
    stake: 12876543.21,
    commission: 7,
    active: true,
    uptime: 99.95,
    votePubkey: "ChorusmmSq8i2SFV8XHQoHJUMgBufFk6K4LLVLMeSbj",
  },
  {
    id: "validator3",
    name: "Certus One",
    identity: "CertusOne",
    stake: 11234567.89,
    commission: 8,
    active: true,
    uptime: 99.97,
    votePubkey: "CertusOneWormho1e9zSSKfBrRa2w3iVs1DQdiw9PwV",
  },
  {
    id: "validator4",
    name: "Staking Facilities",
    identity: "StakingFacilities",
    stake: 10987654.32,
    commission: 10,
    active: true,
    uptime: 99.93,
    votePubkey: "StakingFacilitiesSoLYmb8RbNmbPRsL1BMTQWdKBNYV",
  },
  {
    id: "validator5",
    name: "Figment",
    identity: "Figment",
    stake: 9876543.21,
    commission: 7,
    active: true,
    uptime: 99.96,
    votePubkey: "FigmentNetworksFgmntxxxxxxxxxxxxxxxxxxxxx",
  },
  {
    id: "validator6",
    name: "P2P Validator",
    identity: "P2PValidator",
    stake: 8765432.1,
    commission: 9,
    active: true,
    uptime: 99.94,
    votePubkey: "P2PValidatorSoLenDMSxQTNRDSGLQauTL9Yzf",
  },
  {
    id: "validator7",
    name: "Blockdaemon",
    identity: "Blockdaemon",
    stake: 7654321.98,
    commission: 8,
    active: true,
    uptime: 99.92,
    votePubkey: "BlockdaemonSoLxDg7QBTNfJtVPvmYhaTZ",
  },
  {
    id: "validator8",
    name: "Staked",
    identity: "Staked",
    stake: 6543210.87,
    commission: 7,
    active: true,
    uptime: 99.91,
    votePubkey: "StakedXWZP3FkrtXjLbfRBsjjT3JQvxwK",
  },
  {
    id: "validator9",
    name: "Dokia Capital",
    identity: "DokiaCapital",
    stake: 5432109.76,
    commission: 8,
    active: true,
    uptime: 99.89,
    votePubkey: "DokiaSol11111111111111111111111111111",
  },
  {
    id: "validator10",
    name: "Chainflow",
    identity: "Chainflow",
    stake: 4321098.65,
    commission: 9,
    active: true,
    uptime: 99.9,
    votePubkey: "ChainflowSolValidatorXXXXXXXXXXXXXXXX",
  },
]

export default function ValidatorsPage() {
  return (
    <>
      <HexGrid />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 font-orbitron cyber-gradient-text">Validators</h1>
          <p className="text-muted-foreground">Explore Solana network validators</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cyber-border bg-cyber-dark/40">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-cyber-purple/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-cyber-purple" />
              </div>
              <h3 className="text-xl font-bold font-orbitron mb-2">1,700+</h3>
              <p className="text-muted-foreground">Active Validators</p>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-cyber-dark/40">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-cyber-teal/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-cyber-teal" />
              </div>
              <h3 className="text-xl font-bold font-orbitron mb-2">~2,500 TPS</h3>
              <p className="text-muted-foreground">Network Throughput</p>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-cyber-dark/40">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-cyber-pink/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-cyber-pink" />
              </div>
              <h3 className="text-xl font-bold font-orbitron mb-2">99.9%</h3>
              <p className="text-muted-foreground">Network Uptime</p>
            </CardContent>
          </Card>
        </div>

        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="font-orbitron">Top Validators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full cyber-table">
                <thead>
                  <tr>
                    <th>Validator</th>
                    <th>Stake (SOL)</th>
                    <th>Commission</th>
                    <th>Uptime</th>
                    <th>Vote Account</th>
                  </tr>
                </thead>
                <tbody>
                  {validators.map((validator) => (
                    <tr key={validator.id}>
                      <td>
                        <div className="flex items-center space-x-2">
                          {validator.active && <CheckCircle className="h-4 w-4 text-cyber-teal" />}
                          <span className="font-medium">{validator.name}</span>
                        </div>
                      </td>
                      <td>{validator.stake.toLocaleString()}</td>
                      <td>{validator.commission}%</td>
                      <td>{validator.uptime}%</td>
                      <td className="font-mono text-xs">
                        {validator.votePubkey.slice(0, 8)}...{validator.votePubkey.slice(-4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
