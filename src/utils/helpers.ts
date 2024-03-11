export default function checkWithinRadius(
  refCoords: [number, number],
  targetCoords: [number, number],
  radius: number = 10
): boolean {
  const [refLat, refLon] = refCoords.map((coord) => (Math.PI * coord) / 180);
  const [targetLat, targetLon] = targetCoords.map(
    (coord) => (Math.PI * coord) / 180
  );

  const earthRadius = 6371; // Earth's radius in kilometers

  const dLat = targetLat - refLat;
  const dLon = targetLon - refLon;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(refLat) * Math.cos(targetLat) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance <= radius;
}
