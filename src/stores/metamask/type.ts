import { atomWithStorage } from 'jotai/utils';

export interface MetamaskType {
  // 账号信息
  account: string;
}

export const metamaskDefault: MetamaskType = {
  account: '',
};

export const metamaskStorageKey: string = 'Metamask';

export const metamaskAtom = atomWithStorage<MetamaskType>(metamaskStorageKey, metamaskDefault);
