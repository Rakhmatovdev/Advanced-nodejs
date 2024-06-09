import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
import { Toaster } from 'sonner'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <App />
  <Toaster  position='top-center'/>
  </ThemeProvider>
  </BrowserRouter>
  </QueryClientProvider>
    
  </>,
)
