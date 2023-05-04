import React, { useState } from 'react';
import { Button, Input, Alert } from '@material-tailwind/react';

import useMetamask from 'stores/metamask';
import { owner_abi } from 'stores/metamask/consts';

const Owner = () => {
  const { metamask } = useMetamask();
  const [newOwner, setNewOwner] = useState('');

  const changeOwner = () => {
    if (!newOwner || newOwner.toLowerCase() === metamask.wallet.toLowerCase()) return;
    const contractAddress = '0xADD405211Ca8ef3bFA944Bf7fA9F54f47a79773d';
    const ownerContract = new window.web3.eth.Contract(owner_abi, contractAddress);
    const trans = ownerContract.methods.changeOwner(newOwner);
    trans
      .send({ from: metamask.wallet })
      .on('transactionHash', function (hash: string) {
        console.log('hash:', hash);
      })
      .on('receipt', function (receipt: string) {
        console.log('receipt:', receipt);
      })
      .on('confirmation', function (confirmation: number, receipt: string) {
        console.log('confirmation:', confirmation, ' receipt:', receipt);
      })
      .on('error', function (error: any, receipt: string) {
        console.log('error:', error, ' receipt:', receipt);
      });
  };

  return (
    <article className="space-y-1">
      <div className="flex items-center space-x-2">
        <Button className="w-32 min-w-[128px]" onClick={changeOwner}>
          改变合约的Owner
        </Button>
        <Input
          label="请输入新的合约Owner"
          variant="standard"
          value={newOwner}
          onChange={(res) => setNewOwner(res.target.value)}
        />
      </div>
    </article>
  );
};

export default Owner;
