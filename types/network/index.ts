import { Networks } from "./type";

export type ChainData = {
  displayName: string;
  name: string;
  chainId: number;
  type: Networks;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  logo: string;
  mainnet: boolean;
  rpcUrls: {
    default: {
      http: string[];
    };
  };
  multicallAddress?: string;
  blockExplorerUrl: string;
  wNativeToken?: string;
};
