import { useCallback, useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import Web3 from 'web3';
import { type MetaMaskInpageProvider } from '@metamask/providers';
import { metamaskAtom } from './consts';
import { formatBalance, isAccountList } from './utils';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    web3?: any;
  }
}

const useMetamask = () => {
  // 账号数据
  const [metamask, setMetamask] = useAtom(metamaskAtom);

  const isMetaMaskInstalled = useMemo(() => {
    return typeof window.ethereum !== 'undefined' && Boolean(window.ethereum.isMetaMask);
  }, []);

  const resetMetamask = () => {
    setMetamask({
      wallet: '',
      balance: '',
      isMetaMaskInstalled,
    });
  };

  const handleAccountsChanged = useCallback(
    async (newAccounts: any) => {
      if (!isMetaMaskInstalled) return;

      if (isAccountList(newAccounts) && newAccounts.length > 0) {
        const newBalance = await window.ethereum?.request<string>({
          method: 'eth_getBalance',
          params: [newAccounts[0], 'latest'],
        });
        const narrowedBalance = typeof newBalance === 'string' ? newBalance : '';
        setMetamask({
          wallet: newAccounts[0],
          balance: formatBalance(narrowedBalance),
          isMetaMaskInstalled: true,
        });
      } else {
        resetMetamask();
      }
    },
    [isMetaMaskInstalled]
  );

  useEffect(() => {
    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum?.removeAllListeners('accountsChanged');
    };
  }, [handleAccountsChanged]);

  const initMetamask = useCallback(() => {
    if (window.ethereum) {
      window.ethereum
        .request<string[]>({ method: 'eth_requestAccounts' })
        .then(async (accounts) => {
          window.web3 = new Web3(Web3.givenProvider);
          await handleAccountsChanged(accounts);
        })
        .catch((err: any) => {
          if (err.code === 4001) {
            console.log('Please connect to MetaMask.');
          } else {
            console.error(err);
          }
        });
    } else {
      console.log('Please install MetaMask!');
      resetMetamask();
      return;
    }
  }, [handleAccountsChanged]);

  return {
    initMetamask,
    metamask,
  };
};

export default useMetamask;
