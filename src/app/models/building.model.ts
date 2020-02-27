export class House {
  coordinates: Coordinates;
  params: Params;
  street: string;
}

export class Coordinates {
  latitude: number;
  longitude: number;
}

export class Params {
  rooms: number;
  value: number;
}
