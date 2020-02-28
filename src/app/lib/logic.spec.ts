import * as logic from "./logic";
import { CoordinatesModel, House } from "../models/building.model";

describe("Business logic", () => {
  it("should calculate distance from A to B", () => {
    let coords = new CoordinatesModel(52.5013632, 13.4174913);
    const house = new House();
    house.coords = new CoordinatesModel(52.5013632, 13.4174913);

    const result1 = logic.calculateDistanceFrom(coords, house);

    expect(result1).toEqual(0);

    coords = logic.getCoordinates("Eberswalder Straße 55");
    const result2 = logic.calculateDistanceFrom(coords, house);

    expect(result2.toFixed(2)).toEqual("4555.35");
  });
});
