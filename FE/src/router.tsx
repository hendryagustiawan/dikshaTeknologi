import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// login
const Login = Loader(lazy(() => import('src/content/login')));

// Register

const Register = Loader(lazy(() => import('src/content/register')));

// Dashboards

const Dashboards = Loader(lazy(() => import('src/content/dashboards')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const Products = Loader(lazy(() => import('src/content/applications/Product')));
const ProductsAdd = Loader(
  lazy(() => import('src/content/applications/Product/Add'))
);
const ProductsEdit = Loader(
  lazy(() => import('src/content/applications/Product/Edit'))
);

const ProductVariant = Loader(
  lazy(() => import('src/content/applications/ProductVariant'))
);

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);

const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem('access_token');
  return accessToken !== null;
};

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: isAuthenticated() ? (
      <SidebarLayout />
    ) : (
      <Navigate to="/" replace />
    ),
    children: [
      {
        path: '',
        element: <Navigate to="home" replace />
      },
      {
        path: 'home',
        element: <Dashboards />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: isAuthenticated() ? (
      <SidebarLayout />
    ) : (
      <Navigate to="/" replace />
    ),
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            element: <Navigate to="items" replace />
          },
          {
            path: 'items',
            element: <Products />
          },
          {
            path: 'add',
            element: <ProductsAdd />
          },
          {
            path: 'edit/:id',
            element: <ProductsEdit />
          }
        ]
      },
      {
        path: 'product-variant',
        children: [
          {
            path: '',
            element: <Navigate to="variant" replace />
          },
          {
            path: 'variant/:id',
            element: <ProductVariant />
          }
        ]
      }
    ]
  }
];

export default routes;
