import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import { Provider } from './chakra/components/ui/provider.tsx'
import { SWRConfig } from 'swr'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        errorRetryCount: 0,
      }}>
      <StrictMode>
        <Provider>
          <Routes>
            <Route path='*' element={<App />} />
          </Routes>
        </Provider>
      </StrictMode>
    </SWRConfig>
  </BrowserRouter>
)
