export const Star = ({ fill = 1, onClick, className }: { fill: number; onClick?: () => void; className?: string }) => {
  const id = `star-${Math.random().toString(36).slice(2)}`;
  return (
    <div className={className} onClick={onClick}>
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id={id}>
            <stop offset={`${fill * 100}%`} stopColor="#d24a34" />
            <stop offset={`${fill * 100}%`} stopColor="transparent" />
          </linearGradient>
        </defs>
        <polygon
          points="16,3 19.5,12 29,12.5 22,19 24.5,29 16,24 7.5,29 10,19 3,12.5 12.5,12"
          fill={`url(#${id})`}
          stroke="#d24a34"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
