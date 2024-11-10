import * as chains from "@starknet-react/chains";

const katanaFork = {
  id: BigInt("0x4b4154414e41"),
  network: "katana",
  name: "Katana Devnet",
  nativeCurrency: {
    address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  testnet: true,
  rpcUrls: {
    default: {
      http: [],
    },
    public: {
      http: ["http://127.0.0.1:5050"],
    },
  },
  explorers: {
    starkscan: ["https://starkscan.co/"],
  },
} as const;

export const supportedChains: Record<string, chains.Chain> = { ...chains, katanaFork } as unknown as Record<string, chains.Chain> ;
