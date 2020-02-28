import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BuildingsService } from "./buildings.service";

describe("BuildingsService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const service: BuildingsService = TestBed.get(BuildingsService);
    expect(service).toBeTruthy();
  });
});
