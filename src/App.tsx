import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import { DevTools } from 'jotai-devtools';

import Home from 'components/home';
import useMetamask from 'stores/metamask';

function App() {
  const { initMetamask } = useMetamask();

  useEffect(() => {
    initMetamask();
  }, []);

  return (
    <ThemeProvider>
      <Home />
      <DevTools />
    </ThemeProvider>
  );
}

export default App;
