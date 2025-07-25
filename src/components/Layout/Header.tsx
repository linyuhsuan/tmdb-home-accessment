import { Link, useLocation } from 'react-router-dom';

/**
 * 導航選單項目介面
 */
interface MenuItem {
  /** 路由路徑 */
  path: string;
  /** 顯示文字 */
  label: string;
}

const Header = () => {
  const location = useLocation();

  /**
   * 檢查當前路徑是否為活動狀態
   * @param path - 要檢查的路徑
   * @returns 是否為活動狀態
   */
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  /**
   * 導航選單項目
   */
  const menuItems: MenuItem[] = [
    {
      path: '/',
      label: '最新電影',
    },
    {
      path: '/watchlist',
      label: '待看清單',
    },
  ];

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="px-4 py-4 w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black-600">
            Movie App
          </Link>

          {/* 導航選單 */}
          <nav className="flex items-center space-x-6">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-100'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
