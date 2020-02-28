export class House {
  id: number;
  coords: Coordinates;
  params: Params;
  street: string;
}

export class Coordinates {
  lat: number;
  lon: number;
}

export class Params {
  rooms: number;
  value: number;
}

export enum ListType {
  Distance,
  MoreThanN,
  NotAllData,
  None
}
