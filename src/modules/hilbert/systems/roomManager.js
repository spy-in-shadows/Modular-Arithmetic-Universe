import { describeOccupancy, mapRoom } from './infinityMapper';

export function buildVisibleRooms({ cameraRoom, visibleRooms, eventType, progress }) {
  const baseRoom = Math.max(1, Math.floor(cameraRoom));

  return Array.from({ length: visibleRooms }, (_, index) => {
    const id = baseRoom + index;
    return {
      id,
      occupied: describeOccupancy(id, eventType, progress),
      guestId: `guest-${id}`,
      targetRoom: mapRoom(id, eventType),
      animationState: progress > 0 && progress < 1 ? 'moving' : 'settled',
      position: index,
    };
  });
}
