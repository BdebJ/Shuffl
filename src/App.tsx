// import { renderToStaticMarkup } from 'react-dom/server';
// import { MusicNoteIcon } from './components/Icons';
import Player from './components/Player';

import './App.scss';

const themeColor = '#673ab7';

function App() {
  // const svgString = renderToStaticMarkup(<MusicNoteIcon className="background_img" color={themeColor} />);
  // const svgDataUrl = `url("data:image/svg+xml,${encodeURIComponent(svgString)}")`;

  return (
    <>
      {/* <div className="background_img" style={{ backgroundImage: svgDataUrl }} /> */}
      <div className="shuffl_app">
        <Player themeColor={themeColor} />
      </div>
    </>
  );
}

export default App;
