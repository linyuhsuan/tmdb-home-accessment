interface PersonCardProps {
  id: number;
  name: string;
  profilePath?: string | null;
  role?: string;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal';
}

const PersonCard = ({
  name,
  profilePath,
  role,
  size = 'md',
  layout = 'vertical',
}: PersonCardProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const imageSize = sizeClasses[size];

  if (layout === 'horizontal') {
    return (
      <div className="flex items-center space-x-3">
        {profilePath ? (
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w92${profilePath}`}
            alt={name}
            className={`object-cover rounded-full ${imageSize}`}
          />
        ) : (
          <div className={`flex justify-center items-center bg-gray-200 rounded-full ${imageSize}`}>
            <span className="text-xs text-gray-500">無</span>
          </div>
        )}
        <div>
          <p className="font-medium">{name}</p>
          {role && <p className="text-sm text-gray-500">{role}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      {profilePath ? (
        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w185${profilePath}`}
          alt={name}
          className={`object-cover mx-auto mb-2 rounded-full ${imageSize}`}
        />
      ) : (
        <div
          className={`flex justify-center items-center mx-auto mb-2 bg-gray-200 rounded-full ${imageSize}`}
        >
          <span className="text-xs text-gray-500">無</span>
        </div>
      )}
      <p className="text-sm font-medium">{name}</p>
      {role && <p className="text-xs text-gray-500">{role}</p>}
    </div>
  );
};

export default PersonCard;
