import React, { Suspense } from 'react';
// import { Auth0Provider } from '@auth0/auth0-react';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import { theme } from '@/theme';
import Outline from '@/components/Outline';
import Viewport from '@/Viewport';
import Routes from '@/Routes';
import { WorkoutsProvider } from '@/Hooks/WorkoutCalulatorHooks';

const App = (): React.ReactNode => {
  return (
    <React.StrictMode>
      <WorkoutsProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <QueryClientProvider client={new QueryClient()} >\
              <Viewport  >
                <Suspense fallback={<Outline />}>
                  <Routes />
                </Suspense>
              </Viewport>
            </QueryClientProvider>
          </BrowserRouter>
        </ThemeProvider>
      </WorkoutsProvider>
    </React.StrictMode >
  )
}

export default App;
