import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Weather } from './components/Weather';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to='/weather' />
      },
      {
        path: '/weather',
        element: <Suspense fallback='Loading...'><Weather /></Suspense>
      },
      {
        path: '*',
        element: <Navigate to='/weather' replace={true} />
      }
    ]
  }]);

const rootElement = (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

root.render(rootElement);

reportWebVitals();
