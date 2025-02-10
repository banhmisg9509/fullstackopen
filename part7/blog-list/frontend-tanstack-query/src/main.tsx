import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider as JotaiProvider } from 'jotai'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { client, jotaiStore } from 'src/stores'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <JotaiProvider store={jotaiStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </JotaiProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
