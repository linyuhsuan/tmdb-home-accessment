import { ReactNode } from 'react';

interface ReactQueryHandlerProps {
  status: 'pending' | 'error' | 'success' | 'idle' | 'loading';
  isError?: boolean;
  error?: Error | null;
  children: ReactNode;
  onRetry?: () => void;
  onBack?: () => void;
  errorTitle?: string;
  errorSubtitle?: string;
  isPending?: boolean;
}

const ReactQueryHandler: React.FC<ReactQueryHandlerProps> = ({
  status,
  isError,
  error,
  children,
  onRetry,
  onBack,
  errorTitle = '獲取數據失敗',
  errorSubtitle,
  isPending,
}) => {
  // 確認是否為 loading 狀態
  const loading = isPending || status === 'pending' || status === 'loading';

  // 確認是否處於 error 狀態
  const hasError = isError || status === 'error';

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full border-b-2 border-blue-500 animate-spin"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="mb-4 text-6xl text-red-500">⚠️</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">載入失敗</h2>
          <p className="mb-4 text-gray-600">{error?.message || '發生未知錯誤'}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ReactQueryHandler;
