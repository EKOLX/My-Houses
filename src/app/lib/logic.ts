import { House, CoordinatesModel } from "../models/building.model";

export const getCoordinates = (address: string): CoordinatesModel => {
  // TODO: Will call Map API
  return new CoordinatesModel(52.541861, 13.4078397);
};

export const calculateDistanceFrom = (
  coords: CoordinatesModel,
  house: House
): number => {
  if (house.coords) {
    // Haversine Formula, taken from internet.
    // I don't know what a, c variables means.
    // I didn't have time to read about it.
    // Can calculate wrong, because didn't have time to test it
    const R = 6378137; // Earth’s mean radius in meter
    const { coords: houseCoords } = house;
    const dLat = radius(houseCoords.lat - coords.lat);
    const dLon = radius(houseCoords.lon - coords.lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(radius(coords.lat)) *
        Math.cos(radius(houseCoords.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  return undefined;
};

const radius = degree => {
  return (degree * Math.PI) / 180;
};

export const hasRoomsMoreThan = (count: number, house: House): boolean => {
  const rooms = house.params ? house.params.rooms : 0;
  return rooms >= count;
};

export const hasAllData = (house: House): boolean => {
  if (house.params && house.coords) return true;
  return false;
};

export const generateIds = (houses: House[]): void => {
  let id: number = 0;
  for (let house of houses) {
    house.id = ++id;
  }
};
