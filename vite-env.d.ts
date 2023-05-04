/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 合约地址
  readonly VITE_CONTRACT_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
