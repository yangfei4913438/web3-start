import useMetamask from 'stores/metamask';

const Account = () => {
  const { metamask } = useMetamask();

  return (
    <article className="border-bottom space-y-2 border">
      <h4 className="mt-4 text-xl font-bold">当前连接的账号信息</h4>
      <div className="space-y-1">
        <div>地址: {metamask.wallet}</div>
        <div>余额: {metamask.balance}</div>
      </div>
    </article>
  );
};

export default Account;
