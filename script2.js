// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(rack) {
  const usedSpots = rack
    .reduce(
      (accumulator, item, index) => [
        ...accumulator,
        {
          hasBikes: true,
          distance: item,
        },
      ],
      []
    )
    .sort((a, b) => a.distance - b.distance);

  const allSpots = Array.from(Array(13).keys()).map((index) => {
    const currentDistance = index - 1;
    const existingUsedSpot = usedSpots.find(
      (usedSpot) => usedSpot.distance === currentDistance
    );

    if (existingUsedSpot) {
      return existingUsedSpot;
    }

    return {
      hasBikes: false,
      distance: currentDistance,
    };
  });

  allSpots.forEach((spot, index) => {
    const previousFreeSlots = allSpots
      .filter((item) => item.distance < spot.distance)
      .reverse();

    let canContinue = true;
    let auxIndex = 0;
    let auxDistance = 0;

    while (canContinue && auxIndex <= previousFreeSlots.length) {
      const item = previousFreeSlots[auxIndex];

      if (item && item.hasBikes) {
        canContinue = false;
      }

      if (item && !item.hasBikes) {
        auxDistance++;
      }

      auxIndex++;
    }

    spot["previousFreeDistance"] = auxDistance;
  });

  allSpots.forEach((spot, index) => {
    const nextFreeSlots = allSpots.filter(
      (item) => item.distance > spot.distance
    );

    let canContinue = true;
    let auxIndex = 0;
    let auxDistance = 0;

    while (canContinue && auxIndex <= nextFreeSlots.length) {
      const item = nextFreeSlots[auxIndex];

      if (item && item.hasBikes) {
        canContinue = false;
      }

      if (item && !item.hasBikes) {
        auxDistance++;
      }

      auxIndex++;
    }

    spot["nextFreeDistance"] = auxDistance;
  });

  const response = allSpots
    .sort(
      (a, b) =>
        a.previousFreeDistance - b.previousFreeDistance ||
        a.nextFreeDistance - b.nextFreeDistance
    )
    .reverse();

  const originalItem = rack.find((item) => item === response[0].distance);
  return rack.indexOf(originalItem);
}
