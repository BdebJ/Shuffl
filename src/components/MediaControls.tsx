import { PreviousIcon, NextIcon, PlayIcon, PauseIcon } from './Icons';

import type { TrackState } from './Player';

type MediaControlsProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  isPlaying: boolean;
  trackState: TrackState;
  volume: number;
  switchPrevTrack: () => void;
  switchNextTrack: () => void;
  togglePlayback: () => void;
  handleSeek: (newTime: number) => void;
  handleVolume: (newVolume: number) => void;
  theme: string;
};

export const MediaControls = ({
  audioRef,
  isPlaying,
  trackState,
  volume,
  switchPrevTrack,
  switchNextTrack,
  togglePlayback,
  handleSeek,
  handleVolume,
  theme,
}: MediaControlsProps) => {
  const currentPercentage = audioRef.current.duration
    ? `${(trackState.progress / audioRef.current.duration) * 100}%`
    : '0%';
  const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, ${theme}), color-stop(${currentPercentage}, lightgray))`;

  const formatTime = (seconds: number): string => {
    const formattedTime = new Date(seconds * 1000).toISOString();
    return seconds < 3600 ? formattedTime.substring(14, 19) : formattedTime.substring(11, 16);
  };

  return (
    <div className="media_controls">
      <div className="seek_controls">
        <input
          className="media_seek"
          type="range"
          min={0}
          max={audioRef.current.duration ? audioRef.current.duration : 0}
          step={1}
          value={trackState.progress}
          onChange={(e) => {
            handleSeek(Number(e.target.value));
          }}
          style={{ background: trackStyling }}
        />
      </div>

      <div className="media_btn_container">
        <div className="media_duration_view">
          {formatTime(Math.floor(audioRef.current.currentTime))}/{formatTime(Math.floor(trackState.duration))}
        </div>

        <div className="play_track_controls">
          <button type="button" className="media_btn" onClick={switchPrevTrack}>
            <PreviousIcon className="btn_img" color={theme} />
          </button>

          <button type="button" className="media_btn" onClick={togglePlayback}>
            {isPlaying ? (
              <PauseIcon className="btn_img" color={theme} />
            ) : (
              <PlayIcon className="btn_img" color={theme} />
            )}
          </button>

          <button type="button" className="media_btn" onClick={switchNextTrack}>
            <NextIcon className="btn_img" color={theme} />
          </button>
        </div>

        <div className="vol_controls">
          <input
            className="media_seek"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => {
              handleVolume(Number(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
};
