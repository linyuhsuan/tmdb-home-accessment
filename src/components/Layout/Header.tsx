import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="px-4 py-4 w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🎬 Movie App
          </Link>

          {/* 導航選單 */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/watchlist"
              className={`relative px-3 py-2 rounded-lg transition-colors ${ isActive('/watchlist')
                  ? 'text-blue-600 bg-blue-100'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              待看清單
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
