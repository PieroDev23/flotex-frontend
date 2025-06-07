import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { SWRConfig } from 'swr'
import App from './App.tsx'
import { Provider } from './chakra/components/ui/provider.tsx'
import { Toaster } from './chakra/components/ui/toaster.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateIfStale: true,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        errorRetryCount: 0,
      }}>
      <StrictMode>
        <Provider>
          <AuthProvider>
            <Routes>
              <Route path='*' element={<App />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </Provider>
      </StrictMode>
    </SWRConfig>
  </BrowserRouter>
)
