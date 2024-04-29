export function standardizeName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .sort()
    .join(" ")
    .toLowerCase();
}
