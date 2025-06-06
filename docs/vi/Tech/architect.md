graph TD
    A["User"] --> FE["Frontend App"];

    subgraph "Client Application"
        FE --> WalletCtx["Wallet Context"];
        FE --> JupiterClient["Jupiter API Client"];
        FE --> SolanaRPC_Client["Solana RPC Client"];
        FE --> Supabase_Client["Supabase Client"];
        FE --> BE_API_Client["Backend API Client"];
    end

    subgraph "Backend Systems and External Services"
        BE_Explorer["Backend Explorer"] -- "Read on-chain data" --> SolanaRPC_Explorer["Solana RPC for Explorer"];
        
        BE_API["Backend API"] -- "Business logic, AI calls" --> AIServices["AI Services (External)"];
        BE_API -- "Access/Store business data" --> Supabase_Server["Supabase Server-side"];
        
        Supabase_Docker["Supabase Docker"];
        JupiterAPI_External["Jupiter API External"];
        SolanaBlockchain_Network["Solana Blockchain Network"];
    end

    WalletCtx -- "Get Secret Key" --> FE;
    JupiterClient -- "Quote, unsigned Tx" --> JupiterAPI_External;
    SolanaRPC_Client -- "Send signed Tx, read data" --> SolanaBlockchain_Network;
    Supabase_Client -- "Auth, user data R/W" --> Supabase_Docker;
    
    BE_API_Client -- "Business/AI requests" --> BE_API;
    AIServices -- "AI results" --> BE_API;
    Supabase_Server -- "Data for Backend API" --> Supabase_Docker;
    BE_API -- "Processed results" --> FE;

    SolanaRPC_Explorer -- "Read block/tx data" --> SolanaBlockchain_Network;

    style FE fill:#f9f,stroke:#333,stroke-width:2px;
    style WalletCtx fill:#fdf,stroke:#333,stroke-width:1px;
    style JupiterClient fill:#fef,stroke:#333,stroke-width:1px;
    style SolanaRPC_Client fill:#eff,stroke:#333,stroke-width:1px;
    style Supabase_Client fill:#efe,stroke:#333,stroke-width:1px;
    style BE_API_Client fill:#eef,stroke:#333,stroke-width:1px;

    style BE_Explorer fill:#ccf,stroke:#333,stroke-width:2px;
    style BE_API fill:#cfc,stroke:#333,stroke-width:2px;
    style Supabase_Docker fill:#9f9,stroke:#333,stroke-width:2px;
    style JupiterAPI_External fill:#ff9,stroke:#333,stroke-width:2px;
    style SolanaBlockchain_Network fill:#9ff,stroke:#333,stroke-width:2px;
    style AIServices fill:#fcf,stroke:#333,stroke-width:2px;
    style Supabase_Server fill:#af9,stroke:#333,stroke-width:1px;
    style SolanaRPC_Explorer fill:#9ef,stroke:#333,stroke-width:1px;