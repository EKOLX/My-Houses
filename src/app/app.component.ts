import { Component, OnInit } from "@angular/core";
import { BuildingsService } from "./services/buildings.service";
import { House } from "./models/building.model";
import * as logic from "./lib/logic";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  address: string = "Eberswalder Straße 55";
  housesByDistance: string[];
  housesByMoreThan5: string[];
  housesByNotAllData: string[];

  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    this.buildingsService.getBuildings().subscribe(
      (result: House[]) => {
        this.housesByDistance = result
          .map(house => logic.calculateDistance(house))
          .sort((a, b) => a - b)
          .map(distance => `${distance} unit`);

        this.housesByMoreThan5 = result
          .filter(house => logic.hasRoomsMoreThan(5, house))
          .map(house => house.params.rooms)
          .sort((a, b) => a - b)
          .map(rooms => `${rooms} rooms`);

        this.housesByNotAllData = result
          .filter(house => logic.hasAllData(house))
          .map(house => `${house.street.trim()}`)
          .sort();
      },
      error => console.error(error)
    );
  }
}
