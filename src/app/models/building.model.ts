export class House {
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
