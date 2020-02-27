import { Component, OnInit } from "@angular/core";
import { BuildingsService } from "./services/buildings.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    this.buildingsService.getBuildings().subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }
}
