const Background = ({ isPlaying }: { isPlaying: boolean }) => {
  return <div className={`color_background ${isPlaying ? 'playing' : 'idle'}`} />;
};

export default Background;
