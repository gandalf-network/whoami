export function standardizeName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .sort()
    .join(" ")
    .toLowerCase();
}

export function handleShowTitleEdgeCases(title: string): string {
  const regex = /\s*\([A-Z]\.[A-Z]\.\)$/;
  title = title.replace(regex, "");
  switch (true) {
    case title.toLowerCase() === "top boy":
      return "Top Boy 2019";
    default:
      return title;
  }
}
