import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from "react-redux";
import { store } from "./redux/store"; 
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { HomepageContentProvider } from './contexts/HomepageContentContext';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={ new QueryClient()}>
      <HomepageContentProvider>
        <App />
      </HomepageContentProvider>
    </QueryClientProvider>
  </Provider>
);
