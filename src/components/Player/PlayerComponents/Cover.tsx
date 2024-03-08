import musicNoteIcon from '../../../assets/icons/music-note-icon.svg';

function Cover() {
  return (
    <>
      <div className="media_cover">
        <img className="cover_image" src={musicNoteIcon} alt="Music Note" />
      </div>
    </>
  );
}

export default Cover;
