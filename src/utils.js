/* Returns a random number in [a, b] (both inclusive) */
export function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

let nextId = 1;
export function getId() {
  nextId += 1;
  return nextId;
}
