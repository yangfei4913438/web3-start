// 是否账号列表
export function isAccountList(accounts: unknown): accounts is string[] {
  return Array.isArray(accounts) && accounts.every((account) => typeof account === 'string');
}

// 余额转换
export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(4);
  return balance;
};

// ChainId
export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};
