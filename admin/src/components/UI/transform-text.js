export function price(price) {
  return price
    .toString()
    .split("")
    .reverse()
    .map((c, i, arr) =>
      (i + 1) % 3 === 0 && i !== arr.length - 1 ? "." + c : c
    )
    .reverse()
    .join("");
}
