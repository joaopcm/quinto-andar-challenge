// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(N, S) {
  const matrix = Array.from(Array(N).keys()).map(() => ({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
    j: false,
    k: false,
  }));

  S.split(" ").forEach((occupation) => {
    if (occupation === "") return;

    const line = Number(occupation[0]) - 1;
    const column = occupation[1].toLowerCase();

    matrix[line][column] = true;
  });

  const columnNames = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k"];

  return matrix.reduce((accumulator, item) => {
    let consecutiveCounter = 0;

    columnNames.forEach((column) => {
      if (consecutiveCounter === 3) {
        accumulator++;
        consecutiveCounter = 0;
      }

      if (item[column]) {
        consecutiveCounter = 0;
      } else {
        consecutiveCounter++;
      }
    });

    return accumulator;
  }, 0);
}

console.log(solution(2, "1A 2F 1C"));
console.log(solution(1, ""));
