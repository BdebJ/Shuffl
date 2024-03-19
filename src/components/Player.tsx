import { useState, useRef, useEffect } from 'react';

import { PlayerHeader } from './PlayerHeader';
import { MediaDisplay } from './MediaDisplay';
import { MediaControls } from './MediaControls';

export type TrackElement = {
  name: string;
  path: string;
};

export type TrackState = {
  progress: number;
  duration: number;
};

let didInit = false;
const themeColor = '#673ab7';

export const Player = () => {
  const [tracksArr, setTracksArr] = useState<TrackElement[]>([]);
  const [trackIndex, setTrackIndex] = useState<number>(-1);
  const [volume, setVolume] = useState<number>(0.25);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackState, setTrackState] = useState<TrackState>({
    progress: 0,
    duration: 0,
  });

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const tracksRef = useRef<TrackElement[]>(tracksArr);

  tracksRef.current = tracksArr;

  const setTracks = (updatedTracks: TrackElement[]) => {
    setTracksArr(updatedTracks);
  };

  const updateProgressTick = () => {
    setTrackState((prevState) => ({
      ...prevState,
      progress: Math.floor(audioRef.current.currentTime),
    }));
  };

  const onUpload = (files: File[]) => {
    console.log('Adding new tracks');
    const newTracks = files.map((file) => ({
      name: file.name,
      path: URL.createObjectURL(file),
    }));
    setTracks([...tracksArr, ...newTracks]);
    if (tracksArr.length === 0) {
      setTrackIndex(0);
    }
  };

  const handleSeek = (newTime: number) => {
    console.log('Seek chnaged');
    audioRef.current.currentTime = newTime;
    setTrackState((prevState) => ({
      ...prevState,
      progress: newTime,
    }));
  };

  const handleVolume = (newVolume: number) => {
    console.log('Volume chnaged');
    audioRef.current.volume = newVolume;
    setVolume(audioRef.current.volume);
  };

  const togglePlayback = () => {
    if (tracksArr.length > 0) {
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

  const switchPrevTrack = () => {
    console.log('Switching to prev track');
    setTrackState((prevState) => ({
      ...prevState,
      progress: 0,
    }));
    audioRef.current.currentTime = 0;
    if (tracksRef.current.length > 0) {
      setTrackIndex((prevIndex) => {
        if (prevIndex === 0) {
          return tracksRef.current.length - 1;
        } else {
          return prevIndex - 1;
        }
      });
    }
  };

  const switchNextTrack = () => {
    console.log('Switching to next track');
    setTrackState((prevState) => ({
      ...prevState,
      progress: 0,
    }));
    audioRef.current.currentTime = 0;
    if (tracksRef.current.length > 0) {
      setTrackIndex((prevIndex) => {
        if (prevIndex === tracksRef.current.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }
  };

  const setMetadata = () => {
    setTrackState((prevState) => ({
      ...prevState,
      duration: audioRef.current.duration,
    }));
  };

  useEffect(() => {
    const audioCurr = audioRef.current;
    console.log('Adding event listeners');
    audioCurr.addEventListener('loadedmetadata', setMetadata);
    audioCurr.addEventListener('pause', setPaused);
    audioCurr.addEventListener('playing', setPlaying);
    audioCurr.addEventListener('timeupdate', updateProgressTick);
    audioCurr.addEventListener('ended', switchNextTrack);

    return () => {
      console.log('Removing event listeners');
      audioCurr.removeEventListener('loadedmetadata', setMetadata);
      audioCurr.removeEventListener('pause', setPaused);
      audioCurr.removeEventListener('playing', setPlaying);
      audioCurr.removeEventListener('timeupdate', updateProgressTick);
      audioCurr.removeEventListener('ended', switchNextTrack);
    };
  }, []);

  useEffect(() => {
    if (tracksArr.length !== 0 && trackIndex === -1) {
      setTrackIndex(0);
    }
    if (tracksArr.length === 0 && trackIndex !== -1) {
      setTrackIndex(-1);
    }
  }, [trackIndex, tracksArr.length]);

  useEffect(() => {
    if (tracksRef.current.length > 0) {
      console.log('Loading track');
      audioRef.current.pause();
      audioRef.current.src = tracksRef.current[trackIndex].path;
      audioRef.current.load();
      setTrackState((prevState) => ({
        ...prevState,
        progress: 0,
      }));
      if (didInit) {
        audioRef.current.play();
      } else {
        didInit = true;
      }
    }
  }, [trackIndex]);

  return (
    <>
      <PlayerHeader theme={themeColor} />

      <MediaDisplay tracks={tracksArr} currentIndex={trackIndex} onUpload={onUpload} theme={themeColor} />

      <MediaControls
        audioRef={audioRef}
        isPlaying={isPlaying}
        trackState={trackState}
        volume={volume}
        switchPrevTrack={switchPrevTrack}
        switchNextTrack={switchNextTrack}
        togglePlayback={togglePlayback}
        handleSeek={handleSeek}
        handleVolume={handleVolume}
        theme={themeColor}
      />
    </>
  );
};
