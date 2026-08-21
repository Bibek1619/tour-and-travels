import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from "react-redux";
import { store } from "./redux/store"; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomepageContentProvider } from './contexts/HomepageContentContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,   // data stays fresh for 5 min — no refetch on revisit
      gcTime: 10 * 60 * 1000,     // keep unused cache for 10 min
      retry: 2,                    // retry failed requests twice
      refetchOnWindowFocus: false, // don't refetch just because user switched tabs
    },
  },
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <HomepageContentProvider>
        <App />
      </HomepageContentProvider>
    </QueryClientProvider>
  </Provider>
);
