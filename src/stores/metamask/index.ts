import { useCallback } from 'react';
import { useAtom } from 'jotai';
import detectEthereumProvider from '@metamask/detect-provider';

import { metamaskAtom } from './type';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const useMetamask = () => {
  // 账号数据
  const [metamask, setMetamask] = useAtom(metamaskAtom);

  const initMetamask = useCallback(async () => {
    if (metamask.account) return;

    const provider = await detectEthereumProvider();

    if (provider) {
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
        return;
      }
    } else {
      console.log('Please install MetaMask!');
      return;
    }

    let currentAccount: string | null = null;
    function handleAccountsChanged(accounts: string[]) {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        setMetamask({ account: currentAccount });
      }
    }

    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch((err: any) => {
          console.error(err);
        });

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      const accounts = await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .catch((err: any) => {
          if (err.code === 4001) {
            console.log('Please connect to MetaMask.');
          } else {
            console.error(err);
          }
        });
      currentAccount = accounts[0];
      setMetamask({ account: currentAccount as string });
    }
  }, [setMetamask]);

  return {
    initMetamask,
    metamask,
  };
};

export default useMetamask;
