import React from 'react';
import cls from 'classnames';

import Signature from 'components/home/Signature';
import Contract from 'components/home/Contract';
import Owner from 'components/home/Owner';

const Home = () => {
  return (
    <main
      className={cls(
        'm-24 mx-auto h-full w-1/2 space-y-2 rounded-md bg-gray-200 p-24 shadow-md hover:shadow-lg'
      )}
    >
      <Signature />
      <Contract />
      <Owner />
    </main>
  );
};

export default Home;
