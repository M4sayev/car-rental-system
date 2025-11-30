export function shortenId(id: string) {
  if (id.length < 10) return id;
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
}
