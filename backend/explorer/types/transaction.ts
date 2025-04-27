export interface SolanaTransaction {
  signature: string
  slot: number
  err: any
  memo: string | null
  blockTime: number
  confirmationStatus: string
}

export interface TransactionDetails {
  blockTime: number
  meta: {
    err: any
    fee: number
    innerInstructions: any[]
    logMessages: string[]
    postBalances: number[]
    postTokenBalances: any[]
    preBalances: number[]
    preTokenBalances: any[]
    status: {
      Ok: null | any
    }
  }
  slot: number
  transaction: {
    message: {
      accountKeys: {
        pubkey: string
        signer: boolean
        writable: boolean
      }[]
      instructions: {
        accounts: number[]
        data: string
        programIdIndex: number
      }[]
      recentBlockhash: string
    }
    signatures: string[]
  }
}
