export class House {
  id: number;
  coords: CoordinatesModel;
  params: Params;
  street: string;
}

export class CoordinatesModel {
  constructor(public lat: number, public lon: number) {}
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
