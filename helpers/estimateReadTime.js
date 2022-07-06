export const estimateReadTime = (text) => {
  const wpm = 250;
  const textLength = text.trim().split(/\s+/).length;
  const time = Math.ceil(textLength / wpm);

  return time;
}