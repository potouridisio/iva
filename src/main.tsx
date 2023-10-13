import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { LinkedInCallback } from 'react-linkedin-login-oauth2'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './Root.tsx'

const router = createBrowserRouter([
  {
    element: <Root />,
    path: '/',
  },
  {
    element: <LinkedInCallback />,
    path: '/linkedin',
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
