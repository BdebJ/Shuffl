import { useState, useRef, useEffect, useCallback } from 'react';

import { PlayerHeader } from './PlayerHeader';
import { MediaDisplay } from './MediaDisplay';
import { MediaControls } from './MediaControls';

export type TrackElement = {
  name: string;
  path: string;
};

let didInit = false;
const themeColor = '#673ab7';

export const Player = () => {
  const [tracks, _setTracks] = useState<TrackElement[]>([]);
  const [trackIndex, setTrackIndex] = useState<number>(-1);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const tracksRef = useRef(tracks);

  tracksRef.current = tracks;

  const setTracks = (updatedTracks: TrackElement[]) => {
    _setTracks(updatedTracks);
  };

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
    setTracks([...tracks, ...newTracks]);
    if (tracks.length === 0) {
      setTrackIndex(0);
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
    if (tracksRef.current.length > 0) {
      setTrackIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }
  }, []);

  const switchNextTrack = useCallback(() => {
    console.log('Switching to next track');
    setTrackProgress(0);
    audioRef.current.currentTime = 0;
    if (tracksRef.current.length > 0) {
      setTrackIndex((prevIndex) => Math.min(tracksRef.current.length - 1, prevIndex + 1));
    }
  }, []);

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

  useEffect(() => {
    if (tracksRef.current.length > 0) {
      audioRef.current.pause();
      audioRef.current.src = tracksRef.current[trackIndex].path;
      audioRef.current.load();
      setTrackProgress(0);
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

      <MediaDisplay tracks={tracks} currentIndex={trackIndex} onUpload={onUpload} theme={themeColor} />

      <MediaControls
        audioRef={audioRef}
        isPlaying={isPlaying}
        trackProgress={trackProgress}
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
