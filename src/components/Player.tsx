import { useState, useRef, useEffect, useCallback, DragEvent } from 'react';

import { MusicNoteIcon, PreviousIcon, NextIcon, PlayIcon, PauseIcon } from './Icons';

type Track = {
  name: string;
  path: string;
};

let didInit = false;
const themeColor = '#673ab7';

function Player() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackIndex, setTrackIndex] = useState<number>(-1);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const dragRef = useRef<HTMLDivElement>(null);

  const currentPercentage = audioRef.current.duration ? `${(trackProgress / audioRef.current.duration) * 100}%` : '0%';
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, ${themeColor}), color-stop(${currentPercentage}, lightgray))
  `;

  const updateProgressTick = () => {
    setTrackProgress((prevProgress) => {
      if (Math.floor(prevProgress) < Math.floor(audioRef.current.currentTime)) return audioRef.current.currentTime;
      else return prevProgress;
    });
  };

  const onUpload = (files: File[]) => {
    console.log('Adding new tracks');
    const newTracks = files.map((file) => ({
      name: file.name,
      path: URL.createObjectURL(file),
    }));
    setTracks((prevTracks) => [...prevTracks, ...newTracks]);
    if (tracks.length === 0) {
      setTrackIndex(0);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
    const files = [...e.dataTransfer.files];
    const audioExtensions = ['.mp3', '.m4a', '.wav', '.ogg', '.aac', '.flac'];

    if (
      files.some((file) => !audioExtensions.includes(file.name.substring(file.name.lastIndexOf('.')).toLowerCase()))
    ) {
      return window.alert(`Invalid file type. \nOnly audio files allowed of format: ${audioExtensions}`);
    }

    if (files && files.length) {
      onUpload(files);
    }
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target !== dragRef.current) {
      setDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === dragRef.current) {
      setDragging(false);
    }
  };

  const handleSeek = (newTime: number) => {
    console.log('Seek chnaged');
    audioRef.current.currentTime = newTime;
    setTrackProgress(audioRef.current.currentTime);
  };

  const handleVolume = (newVolume: number) => {
    console.log('Volume chnaged');
    audioRef.current.volume = newVolume;
    setVolume(audioRef.current.volume);
  };

  const togglePlayback = () => {
    if (tracks.length > 0) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
  };

  const setPaused = () => {
    console.log('Paused event fired');
    setIsPlaying(false);
  };

  const setPlaying = () => {
    console.log('Play event fired');
    setIsPlaying(true);
  };

  const switchPrevTrack = useCallback(() => {
    console.log('Switching to prev track');
    if (tracks.length > 0) {
      if (repeat) {
        setTrackIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : tracks.length - 1));
      } else {
        setTrackIndex((prevIndex) => Math.max(0, prevIndex - 1));
      }
    }
  }, [repeat, tracks.length]);

  const switchNextTrack = useCallback(() => {
    console.log('Switching to next track');
    if (tracks.length > 0) {
      if (repeat) {
        setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
      } else {
        setTrackIndex((prevIndex) => Math.min(tracks.length - 1, prevIndex + 1));
      }
    }
  }, [repeat, tracks.length]);

  useEffect(() => {
    if (tracks.length !== 0 && trackIndex === -1) {
      setTrackIndex(0);
    }
    if (tracks.length === 0 && trackIndex !== -1) {
      setTrackIndex(-1);
    }
  }, [trackIndex, tracks.length]);

  useEffect(() => {
    const audioCurr = audioRef.current;
    console.log('Adding event listeners');
    audioCurr.addEventListener('pause', setPaused);
    audioCurr.addEventListener('playing', setPlaying);
    audioCurr.addEventListener('timeupdate', updateProgressTick);
    audioCurr.addEventListener('ended', switchNextTrack);

    return () => {
      console.log('Removing event listeners');
      audioCurr.removeEventListener('pause', setPaused);
      audioCurr.removeEventListener('playing', setPlaying);
      audioCurr.removeEventListener('timeupdate', updateProgressTick);
      audioCurr.removeEventListener('ended', switchNextTrack);
    };
  }, [switchNextTrack]);

  // Track change, seek update tick
  useEffect(() => {
    if (tracks.length > 0) {
      audioRef.current.pause();
      audioRef.current.src = tracks[trackIndex].path;
      audioRef.current.load();
      setTrackProgress(0);
      audioRef.current.volume = volume;
      if (didInit) {
        audioRef.current.play();
      } else {
        didInit = true;
      }
    }
  }, [trackIndex]);

  return (
    <>
      <header className="app_header">
        <h1 className="app_title" style={{ color: themeColor }}>
          Shuffl
        </h1>
      </header>

      <div className="cover_playlist_container">
        <div className="media_cover">
          <MusicNoteIcon className="cover_img" color={themeColor} />
        </div>

        <div
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="media_filedrop_playlist"
        >
          <div className="media_playlist_container">
            <ol className="media_playlist">
              {tracks.map((track, index) => (
                <li
                  key={index}
                  className={`media_list_card 
                ${index == trackIndex ? 'current_media_playing' : ''}`}
                >
                  {track.name.split('.')[0]}
                </li>
              ))}
            </ol>
          </div>
          {(() => {
            if (dragging) {
              return (
                <div ref={dragRef} className="media_file_drag media_file_overlay">
                  Drop files to add to playlist
                </div>
              );
            } else if (tracks.length === 0) {
              return <div className="media_empty_list media_file_overlay">Drop files to add to playlist</div>;
            }
          })()}
        </div>
      </div>

      <div className="media_controls">
        <div className="seek_controls">
          <input
            className="media_seek"
            type="range"
            min={0}
            max={audioRef.current.duration ? audioRef.current.duration : 0}
            step={1}
            value={trackProgress}
            onChange={(e) => {
              handleSeek(Number(e.target.value));
            }}
            style={{ background: trackStyling }}
          />
        </div>

        <div className="media_btn_container">
          <div className="media_duration_view">
            {Math.floor(audioRef.current.currentTime)}/{Math.floor(audioRef.current.duration)}
          </div>

          <div className="play_track_controls">
            <button type="button" className="media_btn" onClick={switchPrevTrack}>
              <PreviousIcon className="btn_img" color={themeColor} />
            </button>

            <button type="button" className="media_btn" onClick={togglePlayback}>
              {isPlaying ? (
                <PauseIcon className="btn_img" color={themeColor} />
              ) : (
                <PlayIcon className="btn_img" color={themeColor} />
              )}
            </button>

            <button type="button" className="media_btn" onClick={switchNextTrack}>
              <NextIcon className="btn_img" color={themeColor} />
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
    </>
  );
}

export default Player;
