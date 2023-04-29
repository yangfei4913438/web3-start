import React from 'react';
import { Button, Input } from '@material-tailwind/react';
import useMetamask from 'stores/metamask';

const Owner = () => {
  const { metamask } = useMetamask();

  return (
    <article className="flex items-center space-x-2">
      <Button className="w-32 min-w-[128px]">改变Owner</Button>
      <Input label="请输入新的 Owner" variant="standard" defaultValue={metamask.account} />
    </article>
  );
};

export default Owner;
