import { createBrowserRouter } from 'react-router-dom';
import MovieListPage from '@/pages/MovieListPage';
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
        element: <MovieListPage />,
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
