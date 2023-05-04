import React, { useState } from 'react';
import { Alert, Button, Input } from '@material-tailwind/react';
import { owner_abi } from 'stores/metamask/consts';
import useMetamask from 'stores/metamask';

const Contract = () => {
  const { metamask } = useMetamask();
  const [owner, setOwner] = useState('');

  const getOwner = () => {
    // 测试的合约地址
    const contractAddress: string = import.meta.env.VITE_CONTRACT_ADDRESS;
    const zombieFactory = new window.web3.eth.Contract(owner_abi, contractAddress);
    zombieFactory.methods.getOwner().call(function (err: any, res: any) {
      if (err) {
        console.log('err:', err);
        return;
      }
      setOwner(res);
    });
  };

  return (
    <article className="space-y-2">
      <Alert color="amber" show={!!owner && owner.toLowerCase() !== metamask.wallet.toLowerCase()}>
        警告：变更合约的Owner，需要使用合约的Owner账号操作。
      </Alert>
      <div className="flex items-center space-x-1">
        <Button className="w-32 min-w-[128px] py-5" onClick={getOwner}>
          读取合约数据
        </Button>
        <Input label="当前的合约Owner" variant="standard" value={owner} onChange={() => {}} />
      </div>
    </article>
  );
};

export default Contract;
