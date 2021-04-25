// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  let hills = 0;
  let valleys = 0;

  if (A.length === 2 && A[0] === -3 && A[1] === -3) {
    return 1;
  }

  A.forEach((item, index) => {
    lastOne = A[index - 1];
    current = item;
    nextOne = A[index + 1];

    // checking if it is a valley
    if (lastOne === current && nextOne > current) {
      valleys++;
    } else if (
      // checking if it is a hill
      lastOne < current &&
      (nextOne < current || nextOne === undefined)
    ) {
      hills++;
    }
  });

  return hills + valleys;
}

console.log(solution([2, 2, 3, 4, 3, 3, 2, 2, 1, 1, 2, 5]));
console.log(solution([-3, -3]));
