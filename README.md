## 说明

基于 https://remix.ethereum.org/ 中，默认合约 2_Owner.sol 做一个简单的测试：

- 读取并展示当前连接的账号信息：账号地址、余额。

- 读取部署合约的owner地址（本地部署的地址，可以替换）

- 变更合约的owner

#### 配置说明

1. 启动本地开发网络, 我用的是 Ganache
2. 将开发网络加入metamask网络中
3. 将开发网络的账号，导入metamask中
4. remix 连接到metamask中添加好的开发网络
5. 部署 2_Owner.sol 合约到开发网络。
6. 记录部署好的，合约地址。
7. 用合约地址，替换 .env 文件中的 VITE_CONTRACT_ADDRESS 的值
8. 启动项目 npm run dev