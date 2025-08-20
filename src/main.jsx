import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './routers/router.jsx'
import Authprovider from './Context/AuthContext/Authprovider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import Darktheme from './Components/Darkmoude/Darktheme.jsx'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
<Darktheme>
  <QueryClientProvider  client={queryClient}>
<Authprovider>
     <RouterProvider router={router}></RouterProvider>
       <ToastContainer />  
 </Authprovider>

    </QueryClientProvider>
 
  </Darktheme>
 
  </StrictMode>,
)
