export const bytesToKB = (bytes: number) => {
  const kb = bytes / 1024;

  return kb === 0 ? 0 : `${kb.toFixed(2)}KB`;
};
