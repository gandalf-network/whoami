export function standardizeName(name: string): string {
  return name.split(" ").sort().join(" ").toLowerCase();
}
