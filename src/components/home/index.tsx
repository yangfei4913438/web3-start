import React from 'react';
import cls from 'classnames';

import Contract from 'components/home/Contract';
import Owner from 'components/home/Owner';
import Account from 'components/home/Account';

const Home = () => {
  return (
    <main
      className={cls(
        'm-24 mx-auto h-full w-1/2 space-y-2 rounded-md bg-gray-200 p-24 shadow-md hover:shadow-lg'
      )}
    >
      <Account />
      <Contract />
      <Owner />
    </main>
  );
};

export default Home;
