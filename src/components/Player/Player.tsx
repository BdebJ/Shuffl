import Cover from './PlayerComponents/Cover';
import Controls from './PlayerComponents/Controls';

function Player() {
  return (
    <>
      <div className="media_player">
        <Cover />
        <Controls />
      </div>
    </>
  );
}

export default Player;
