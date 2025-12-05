export function shortenId(id: string) {
  if (id.length < 10) return id;
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
}

export function formatStringToISO(str: string) {
  // If it's already ISO-ish
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    return str.split("T")[0];
  }

  // If it's mm/dd/yyyy
  const match = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    const [, m, d, y] = match.map(Number);
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  return "-";
}
