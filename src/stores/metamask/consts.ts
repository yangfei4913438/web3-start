import { atomWithStorage } from 'jotai/utils';
import type { AbiItem } from 'web3-utils';

export interface MetamaskType {
  // 钱包账号
  wallet: string;
  // 余额
  balance: string;
  // 是否已经安装MetaMask
  isMetaMaskInstalled: boolean;
}

export const metamaskDefault: MetamaskType = {
  wallet: '',
  balance: '',
  isMetaMaskInstalled: false,
};

export const metamaskStorageKey: string = 'Metamask';

export const metamaskAtom = atomWithStorage<MetamaskType>(metamaskStorageKey, metamaskDefault);

export const owner_abi: AbiItem[] = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerSet',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'changeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
