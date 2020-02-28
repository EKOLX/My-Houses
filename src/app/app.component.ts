import { Component, OnInit } from "@angular/core";
import { BuildingsService } from "./services/buildings.service";
import * as logic from "./lib/logic";
import { House, ListType, CoordinatesModel } from "./models/building.model";
import { HouseViewModel } from "./models/buildingView.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  address: string = "Eberswalder Straße 55";
  coords: CoordinatesModel;
  cost: number = 50000000;
  houses: House[];
  housesModified: House[];
  housesByDistance: HouseViewModel[];
  housesByMoreThanN: HouseViewModel[];
  housesByNotAllData: HouseViewModel[];
  status: string = "Nothing selected.";
  areListsVisible: boolean = false;

  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    this.coords = logic.getCoordinates(this.address);

    this.buildingsService.getBuildings().subscribe(
      (result: House[]) => {
        this.houses = result;
        logic.generateIds(this.houses);
        this.loadHousesExcept();
        this.areListsVisible = true;
      },
      error => console.error(error)
    );
  }

  housesByDistanceChanged(event): void {
    //console.log(event.option);

    if (event.option.selected) {
      const id = event.option.value.id;
      const house = this.houses.find(h => h.id === id);
      const distance = logic.calculateDistanceFrom(this.coords, house);

      this.housesModified = this.houses.filter(
        h => logic.calculateDistanceFrom(this.coords, h) >= distance
      );

      this.loadHousesExcept(ListType.Distance);
      this.status = `Selected house distance from ${this.address} is ${event.option.value.displayName}.`;
    } else {
      this.loadHousesExcept();
      this.status = "Nothing selected.";
    }
  }

  housesByMoreThanNChanged(event): void {
    if (event.option.selected) {
    }
  }

  housesByNotAllDataChanged(event): void {
    if (event.option.selected) {
    }
  }

  private loadHousesExcept(listType: ListType = ListType.None): void {
    if (listType == ListType.None) {
      this.housesModified = this.houses;
    }

    if (listType != ListType.Distance) {
      this.housesByDistance = this.housesModified
        .map(house => {
          return {
            id: house.id,
            distance: logic.calculateDistanceFrom(this.coords, house)
          };
        })
        .sort((a, b) => a.distance - b.distance)
        .map(house => {
          return {
            id: house.id,
            displayName: `${house.distance.toFixed(2)} unit`
          };
        });
    }

    if (listType != ListType.MoreThanN) {
      this.housesByMoreThanN = this.housesModified
        .filter(house => logic.hasRoomsMoreThan(5, house))
        .map(house => {
          return { id: house.id, rooms: house.params.rooms };
        })
        .sort((a, b) => a.rooms - b.rooms)
        .map(house => {
          return { id: house.id, displayName: `${house.rooms} rooms` };
        });
    }

    if (listType != ListType.NotAllData) {
      this.housesByNotAllData = this.housesModified
        .filter(house => logic.hasAllData(house))
        .map(house => {
          return { id: house.id, displayName: `${house.street.trim()}` };
        })
        .sort((a, b) => (a.displayName > b.displayName ? 1 : -1));
    }
  }
}
