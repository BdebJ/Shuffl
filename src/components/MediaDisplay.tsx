import { useRef, useState } from 'react';
import { MusicNoteIcon } from './Icons';
import { formatTime } from  '../utils';
import type { TrackElement } from './Player';

type MediaDiplayProps = {
  tracks: TrackElement[];
  currentIndex: number;
  onUpload: (files: File[]) => void;
  theme: string;
};

export const MediaDisplay = ({ tracks, currentIndex, onUpload, theme }: MediaDiplayProps) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
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

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target !== dragRef.current) {
      setDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === dragRef.current) {
      setDragging(false);
    }
  };

  return (
    <div className="cover_playlist_container">
      <div className="media_cover">
        <MusicNoteIcon className="cover_img" color={theme} />
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
                ${index === currentIndex ? 'current_media_playing' : ''}`}
              >
                {`${track.name.split('.')[0]} - ${formatTime(Math.floor(track.duration))}`}
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
  );
};
