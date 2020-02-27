import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { House } from "../models/building.model";

@Injectable({
  providedIn: "root"
})
export class BuildingsService {
  proxy = "https://cors-anywhere.herokuapp.com";
  serverApi = `${this.proxy}/https://demo.interfacema.de/programming-assessment-1.0/buildings`;
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}

  getBuildings(): Observable<House[]> {
    return this.http
      .get(`${this.serverApi}`, this.httpOptions)
      .pipe(map(result => result["houses"]));
  }
}
