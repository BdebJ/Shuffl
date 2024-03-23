const formatTime = (seconds: number): string => {
  const formattedTime = new Date(seconds * 1000).toISOString();
  return seconds < 3600 ? formattedTime.substring(14, 19) : formattedTime.substring(11, 16);
};

export { formatTime };
