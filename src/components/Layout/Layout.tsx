import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-4 py-8 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
