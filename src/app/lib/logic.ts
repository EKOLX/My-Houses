import { House } from "../models/building.model";

export const calculateDistance = (house: House): number => {
  // TODO: Calculate distance by formula
  const { coords } = house;
  const latitude = coords.lat ? coords.lat : 0;
  const longitude = coords.lon ? coords.lon : 0;

  return latitude - longitude;
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
