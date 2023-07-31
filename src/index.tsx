import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './index.css';
import App from './App';
import store from './data/store/store';
import ErrorPage from './components/Error/ErrorPage';
import CommunityPage from './components/Community/CommunityPage';
import UserPage from './components/User/UserPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/community",
    element: <CommunityPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/community/:userId",
    element: <UserPage/>,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals