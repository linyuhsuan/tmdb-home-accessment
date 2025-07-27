import { createBrowserRouter } from 'react-router-dom';
import MovieListPage from '@/pages/MovieListPage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import WatchlistPage from '@/pages/WatchlistPage';
import MovieCategoriesPage from '@/pages/MovieCategoriesPage';
import Layout from '@/components/Layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MovieCategoriesPage />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: 'watchlist',
        element: <WatchlistPage />,
      },
      {
        path: 'movie-list',
        element: <MovieListPage />,
      },
    ],
  },
]);
