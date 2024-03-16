type SvgProp = {
  className: string;
  color: string;
  style?: React.CSSProperties;
};

const MusicNoteIcon = ({ className, color, style }: SvgProp) => (
  <svg
    className={className}
    style={style}
    fill={color}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 79.85 122.88"
    enableBackground="new 0 0 79.85 122.88"
    xmlSpace="preserve"
  >
    <style type="text/css">{`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}</style>
    <g>
      <path
        className="st0"
        d="M29.57,0h15.64v5.23c39.15,8.96,43.62,27.76,20.92,57.38c2.42-29.39-0.54-35.7-20.92-37.06v74.31 c0.04,0.39,0.05,0.78,0.05,1.19c0,9.66-10.13,19.24-22.63,21.4C10.14,124.6,0,118.52,0,108.86c0-13.18,18.1-24.61,29.57-20.58 L29.57,0L29.57,0z"
      />
    </g>
  </svg>
);

const PreviousIcon = ({ className, color, style }: SvgProp) => (
  <svg
    className={className}
    style={style}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 511 510.42"
  >
    <path
      fillRule="nonzero"
      d="M224.44 293.22c-28.24-25.15-27.48-47.55 0-73.04L450.23 9.54c23.8-19.92 60.85-8.39 60.77 32.19v423.76c-2.66 43.51-39.44 55.73-64.14 35.31L224.44 293.22zm-114.38 216.7H28.18C12.67 509.92 0 497.16 0 481.71V28.94C0 13.52 12.76.76 28.18.76h81.88c15.46 0 28.21 12.67 28.21 28.18v452.77c0 15.54-12.69 28.21-28.21 28.21z"
    />
  </svg>
);

const NextIcon = ({ className, color, style }: SvgProp) => (
  <svg
    className={className}
    style={style}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 511 510.43"
  >
    <path
      fillRule="nonzero"
      d="M286.56 293.22c28.24-25.15 27.48-47.55 0-73.04L60.77 9.54C36.97-10.38-.08 1.15 0 41.73v423.76c2.66 43.51 39.44 55.73 64.14 35.32l222.42-207.59zm114.38 216.7h81.88c15.51 0 28.18-12.76 28.18-28.21V28.94C511 13.52 498.24.76 482.82.76h-81.88c-15.45 0-28.21 12.67-28.21 28.18v452.77c0 15.55 12.69 28.21 28.21 28.21z"
    />
  </svg>
);

const PlayIcon = ({ className, color, style }: SvgProp) => (
  <svg
    className={className}
    style={style}
    fill={color}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 92.2 122.88"
    enableBackground="new 0 0 92.2 122.88"
    xmlSpace="preserve"
  >
    <style type="text/css">{`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}</style>
    <g>
      <polygon className="st0" points="92.2,60.97 0,122.88 0,0 92.2,60.97" />
    </g>
  </svg>
);

const PauseIcon = ({ className, color, style }: SvgProp) => (
  <svg
    className={className}
    style={style}
    fill={color}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 87.72 122.88"
    enableBackground="new 0 0 87.72 122.88"
    xmlSpace="preserve"
  >
    <style type="text/css">{`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}</style>
    <g>
      <path className="st0" d="M0,0h35.54v122.88l-35.54,0V0L0,0z M52.18,0h35.54v122.88l-35.54,0V0L52.18,0z" />
    </g>
  </svg>
);

export { MusicNoteIcon, PreviousIcon, NextIcon, PlayIcon, PauseIcon };
