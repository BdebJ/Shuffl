import { useState, useRef, useEffect, useCallback, DragEvent } from 'react';

import musicNoteIcon from '../assets/icons/music-note-icon.svg';
import previousIcon from '../assets/icons/previous-icon.svg';
import pauseIcon from '../assets/icons/pause-icon.svg';
import playIcon from '../assets/icons/play-icon.svg';
import nextIcon from '../assets/icons/next-icon.svg';

import trackList from '../tracks';

type Track = {
  name: string;
  path: string;
};

function Player() {
  const [tracks, setTracks] = useState<Track[]>(trackList);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.25);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const dragRef = useRef<HTMLDivElement>(null);

  const updateProgressTick = () => {
    setTrackProgress(audioRef.current.currentTime);
  };

  const onUpload = (files: File[]) => {
    const newTracks = files.map((file) => ({
      name: file.name,
      path: URL.createObjectURL(file),
    }));
    setTracks((prevTracks) => [...prevTracks, ...newTracks]);
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
    audioRef.current.currentTime = newTime;
    setTrackProgress(audioRef.current.currentTime);
  };

  const handleVolume = (newVolume: number) => {
    audioRef.current.volume = newVolume;
    setVolume(audioRef.current.volume);
  };

  const togglePlayback = () => {
    setIsPlaying((p: boolean) => !p);
  };

  const switchPrevTrack = useCallback(() => {
    console.log('Switching to prev track');
    setTrackIndex((prevIndex) => (prevIndex ? prevIndex - 1 : tracks.length - 1));
  }, [tracks.length]);

  const switchNextTrack = useCallback(() => {
    console.log('Switching to next track');
    setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  }, [tracks.length]);

  // Pause / Play
  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audioCurr = audioRef.current;
    console.log('Adding event listeners');
    audioCurr.addEventListener('timeupdate', updateProgressTick);
    audioCurr.addEventListener('ended', switchNextTrack);

    return () => {
      console.log('Removing event listeners');
      audioCurr.removeEventListener('timeupdate', updateProgressTick);
      audioCurr.removeEventListener('ended', switchNextTrack);
    };
  }, [switchNextTrack]);

  // Track change, seek update tick
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current.src = tracks[trackIndex].path;
    audioRef.current.load();
    setTrackProgress(0);
    audioRef.current.volume = volume;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [trackIndex]);

  return (
    <>
      <header className="app_header">
        <h1 className="app_title">Music Player</h1>
      </header>

      <div className="cover_playlist_container">
        <div className="media_cover">
          <img className="cover_image" src={musicNoteIcon} alt="Music Note" />
        </div>

        <div
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="media_playlist"
        >
          <div className="media_list">
            <ol>
              {tracks.map((track, index) => (
                <li
                  key={index}
                  className={`media_list_card 
                ${index == trackIndex ? 'current_media_playing' : ''}`}
                >
                  {track.name}
                </li>
              ))}
            </ol>
          </div>

          {dragging && (
            <div ref={dragRef} className="media_list media_file_overlay">
              Drop files to add to playlist
            </div>
          )}
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
