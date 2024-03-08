import previousIcon from '../../../assets/icons/previous-icon.svg';
import pauseIcon from '../../../assets/icons/pause-icon.svg';
import playIcon from '../../../assets/icons/play-icon.svg';
import nextIcon from '../../../assets/icons/next-icon.svg';

function Controls() {
  return (
    <>
      <div className="media_controls">
        <div className="seek_controls">
          <input className="media_seek" type="range" min={0} max={100} />
        </div>

        <div className="play_controls">
          <button className="media_btn">
            <img className="btn_img" src={previousIcon} alt="Previous" />
          </button>

          <button className="media_btn">
            <img className="btn_img" src={pauseIcon} alt="Pause" />
          </button>
          <button className="media_btn">
            <img className="btn_img" src={playIcon} alt="Play" />
          </button>

          <button className="media_btn">
            <img className="btn_img" src={nextIcon} alt="Next" />
          </button>
        </div>

        <div className=''></div>
      </div>
    </>
  );
}

export default Controls;
