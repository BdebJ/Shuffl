export const PlayerHeader = ({ theme }: { theme: string }) => {
  return (
    <header className="app_header">
      <h1 className="app_title" style={{ color: theme }}>
        Shuffl
      </h1>
    </header>
  );
};

export default PlayerHeader;
