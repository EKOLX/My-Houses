import { Component, OnInit } from "@angular/core";
import { BuildingsService } from "./services/buildings.service";
import { House } from "./models/building.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  address: string = "Eberswalder Straße 55";
  housesByDistance: string[];
  housesByMoreThan5: string[];
  housesByNoData: string[];

  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    this.buildingsService.getBuildings().subscribe(
      (result: House[]) => {
        this.housesByDistance = result.map(house => {
          const { coords } = house;
          return `${this.calculateDistance(
            coords.latitude ? coords.latitude : 0,
            coords.longitude ? coords.longitude : 0
          )} unit`;
        });
        this.housesByMoreThan5 = result.map(
          house => `${house.params ? house.params.rooms : "none"} rooms`
        );
        this.housesByNoData = result.map(house => `${house.street}`);
      },
      error => console.error(error)
    );
  }

  private calculateDistance(latitude, longitude): number {
    // TODO: Calculate distance by formula
    return latitude - longitude;
  }

  private hasRoomsMoreThan(count: number, value: number): boolean {
    return value >= count;
  }
}
