interface BackButtonProps {
  onClick: () => void;
  btnText: string;
  className?: string;
}

const BackButton = ({ onClick, btnText = '返回列表', className = '' }: BackButtonProps) => {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="px-4 py-4 w-full">
        <button
          onClick={onClick}
          className={`flex items-center text-gray-600 transition-colors hover:text-gray-900 ${className}`}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default BackButton;
