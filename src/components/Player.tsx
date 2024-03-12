import { useState, useRef, useEffect } from 'react';

import musicNoteIcon from '../assets/icons/music-note-icon.svg';

import previousIcon from '../assets/icons/previous-icon.svg';
import pauseIcon from '../assets/icons/pause-icon.svg';
import playIcon from '../assets/icons/play-icon.svg';
import nextIcon from '../assets/icons/next-icon.svg';

import trackList from '../tracks';

function Player() {
  const [tracks, setTracks] = useState(trackList);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioSrc: string = tracks[currentTrackIndex];
  const audioRef = useRef(new Audio(audioSrc));

  // Pause / Play
  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  // Track Change, seek update tick
  useEffect(() => {
    const updateProgressTick = () => {
      setTrackProgress(audioRef.current.currentTime);
    };

    audioRef.current.pause();
    audioRef.current = new Audio(tracks[currentTrackIndex]);
    setTrackProgress(0);
    audioRef.current.addEventListener('timeupdate', updateProgressTick);
    audioRef.current.addEventListener('ended', switchNextTrack);
    if (isPlaying) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateProgressTick);
    };
  }, [currentTrackIndex]);

  const handleSeek = (newTime: number) => {
    audioRef.current.currentTime = newTime;
    setTrackProgress(audioRef.current.currentTime);
  };

  const togglePlayback = () => {
    setIsPlaying((p: boolean) => !p);
  };

  const switchPrevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((p: number) => --p);
    }
  };

  const switchNextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex((p: number) => ++p);
    }
  };

  return (
    <>
      <header className="app_header">
        <h1 className="app_title">Music Player</h1>
      </header>

      <div className="cover_playlist_container">
        <div className="media_cover">
          <img className="cover_image" src={musicNoteIcon} alt="Music Note" />
        </div>

        <div className="media_playlist">
          <ol className="media_list">
            {tracks.map((track, index) => (
              <li
                key={index}
                className={`media_list_card 
                ${index == currentTrackIndex ? 'current_media_playing' : ''}`}
              >
                {track}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="media_controls">
        <div className="seek_controls">
          <input
            className="media_seek"
            type="range"
            min={0}
            max={audioRef.current.duration ? audioRef.current.duration : 0}
            value={trackProgress}
            onChange={(e) => {
              handleSeek(Number(e.target.value));
            }}
            step={1}
          />
        </div>

        <div className="media_btn_container">
          <div className="invisible_spacer" />

          <div className="play_track_controls">
            <button type="button" className="media_btn" onClick={switchPrevTrack}>
              <img className="btn_img" src={previousIcon} alt="Previous" />
            </button>

            <button type="button" className="media_btn" onClick={togglePlayback}>
              <img className="btn_img" src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" />
            </button>

            <button type="button" className="media_btn" onClick={switchNextTrack}>
              <img className="btn_img" src={nextIcon} alt="Next" />
            </button>
          </div>

          <div className="vol_playlist_controls">
            <input className="media_seek" type="range" min={0} max={100} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
