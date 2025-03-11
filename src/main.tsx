import React from 'react';

import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';

const auth0domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN!;
const auth0clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID!;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0domain}
      clientId={auth0clientId}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
