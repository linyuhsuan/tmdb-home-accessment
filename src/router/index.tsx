import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import WatchlistPage from '@/pages/WatchlistPage';
import Layout from '@/components/Layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: 'watchlist',
        element: <WatchlistPage />,
      },
    ],
  },
]);
